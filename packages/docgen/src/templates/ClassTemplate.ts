import { format } from 'prettier'

import { CommentFragment, DeprecationNoteFragment, FunctionFragment } from '../fragments'
import { ClassSignature, Signature } from '../types'

/**
 * Creates a page template for a class.
 *
 * @param signature - Class signature
 * @param originalDocument - Auto-generated JSON file
 * @param slug - Slug to use for generating documentation links
 * @returns Prettified class page template
 */
export const ClassTemplate = (
  { name, comment, children }: ClassSignature,
  originalDocument?: Array<Signature>,
  slug?: string
) => {
  const alias = comment?.tags?.find(({ tag }) => tag === 'alias')?.text.replace(/\n/g, '')
  const deprecationTag = comment?.tags?.find(({ tag }) => tag === 'deprecated')

  const header = `---
# ⚠️ AUTO-GENERATED CONTENT. DO NOT EDIT THIS FILE DIRECTLY! ⚠️
title: ${name}
sidebar_label: ${alias || name}
description: ${comment?.shortText?.replace(/\n/gi, ' ') || 'No description provided.'}
${deprecationTag ? 'sidebar_class_name: deprecated' : ``}
${slug ? `slug: ${slug}` : ``}
---`.replace(/\n\n/gi, '\n')

  return format(
    `${header}

# \`${name}\`

${comment ? CommentFragment(comment) : ''}

${deprecationTag ? DeprecationNoteFragment(deprecationTag, 'This class is deprecated.') : ``}

${
  children
    ? children
        .filter((child) => child.kindString === 'Constructor')
        .map((signature) =>
          signature.signatures
            ? signature.signatures
                .map((constructorSignature, index) =>
                  FunctionFragment(constructorSignature, originalDocument, {
                    numberOfOverloads: signature.signatures!.length,
                    isConstructor: true,
                    index
                  })
                )
                .join('\n\n')
            : ''
        )
        .join(`\n\n`)
    : ''
}`,
    { parser: 'markdown', semi: false, singleQuote: true, trailingComma: 'none' }
  )
}

export default ClassTemplate
