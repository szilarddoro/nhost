import ControlledSwitch from '@/components/common/ControlledSwitch';
import type { ButtonProps } from '@/ui/v2/Button';
import Button from '@/ui/v2/Button';
import ArrowSquareOutIcon from '@/ui/v2/icons/ArrowSquareOutIcon';
import Link from '@/ui/v2/Link';
import type { SwitchProps } from '@/ui/v2/Switch';
import Switch from '@/ui/v2/Switch';
import Text from '@/ui/v2/Text';
import Image from 'next/image';
import type { DetailedHTMLProps, HTMLProps, ReactNode } from 'react';

import { twMerge } from 'tailwind-merge';

export interface SettingsContainerProps
  extends Omit<
    DetailedHTMLProps<HTMLProps<HTMLDivElement>, HTMLDivElement>,
    'title'
  > {
  /**
   * Icon for the section.
   */
  icon?: ReactNode | string;
  /**
   * The title for the section.
   */
  title: ReactNode | string;
  /**
   * Custom title for the documentation link.
   */
  docsTitle?: ReactNode | string;
  /**
   * The description for the section.
   */
  description: string | ReactNode;
  /**
   * Link to the documentation.
   *
   * @default 'https://docs.nhost.io/'
   */
  docsLink?: string;
  /**
   * Props for the primary action.
   */
  primaryActionButtonProps?: ButtonProps;
  /**
   * Submit button text.
   *
   * @default 'Save'
   */
  submitButtonText?: string;
  /**
   * If passed, the switch will be rendered as a controlled component.
   * The value of the switchId will be the name of the field in the form.
   */
  switchId?: string;
  /**
   * Function to be called when the switch is toggled.
   */
  onEnabledChange?: (enabled: boolean) => void;
  /**
   * Determines whether or not the the switch is in a toggled state and children are visible.
   */
  enabled?: boolean;
  /**
   * Determines whether or to render the switch.
   * @default false
   */
  showSwitch?: boolean;
  /**
   * Custom class names passed to the root element.
   */
  rootClassName?: string;
  /**
   * Custom class names passed to the children wrapper element.
   */
  className?: string;
  /**
   * Props to be passed to the Switch component.
   */
  switchProps?: SwitchProps;
}

export default function SettingsContainer({
  children,
  docsLink,
  title,
  description,
  icon,
  primaryActionButtonProps,
  submitButtonText = 'Save',
  className,
  onEnabledChange,
  enabled,
  switchId,
  showSwitch = false,
  rootClassName,
  switchProps,
  docsTitle,
}: SettingsContainerProps) {
  return (
    <div
      className={twMerge(
        'grid grid-flow-row gap-4 rounded-lg border-1 border-gray-200 bg-white py-4',
        rootClassName,
      )}
    >
      <div className="grid grid-flow-col place-content-between gap-3 px-4">
        <div className="grid grid-flow-col gap-4">
          {(typeof icon === 'string' && (
            <div className="flex items-center self-center justify-self-center align-middle">
              <Image
                src={icon}
                alt={`icon of ${title}`}
                width={32}
                height={32}
              />
            </div>
          )) ||
            icon}

          <div className="grid grid-flow-row gap-1">
            <Text className="text-lg font-semibold">{title}</Text>

            {description && (
              <Text className="text-greyscaleMedium">{description}</Text>
            )}
          </div>
        </div>
        {!switchId && showSwitch && (
          <Switch
            checked={enabled}
            onChange={(e) => onEnabledChange(e.target.checked)}
            className="self-center"
            {...switchProps}
          />
        )}
        {switchId && showSwitch && (
          <ControlledSwitch
            className="self-center"
            name={switchId}
            {...switchProps}
          />
        )}
      </div>

      <div className={twMerge('grid grid-flow-row gap-4 px-4', className)}>
        {children}
      </div>

      <div
        className={twMerge(
          'grid grid-flow-col items-center gap-x-2 border-t border-gray-200 px-4 pt-3.5',
          docsLink ? 'place-content-between' : 'justify-end',
        )}
      >
        {docsLink && (
          <div className="grid w-full grid-flow-col justify-start gap-x-1 self-center align-middle">
            <Text>
              Learn more about{' '}
              <Link
                href={docsLink || 'https://docs.nhost.io/'}
                target="_blank"
                rel="noopener noreferrer"
                underline="hover"
                className="font-medium"
              >
                {docsTitle || title}
                <ArrowSquareOutIcon className="ml-1 h-4 w-4" />
              </Link>
            </Text>
          </div>
        )}

        <Button
          variant={
            primaryActionButtonProps?.disabled ? 'outlined' : 'contained'
          }
          color={primaryActionButtonProps?.disabled ? 'secondary' : 'primary'}
          type="submit"
          {...primaryActionButtonProps}
        >
          {submitButtonText}
        </Button>
      </div>
    </div>
  );
}
