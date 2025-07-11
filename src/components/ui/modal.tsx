'use client';

import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogCloseIcon,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@ui/dialog';
import type { DialogProps, DialogTriggerProps, ModalOverlayProps } from 'react-aria-components';
import { DialogTrigger as DialogTriggerPrimitive, ModalOverlay, Modal as ModalPrimitive, composeRenderProps } from 'react-aria-components';
import { twMerge } from 'tailwind-merge';

const Modal = (props: DialogTriggerProps) => {
  return <DialogTriggerPrimitive {...props} />;
};

const sizes = {
  xs: 'sm:max-w-xs',
  sm: 'sm:max-w-sm',
  md: 'sm:max-w-md',
  lg: 'sm:max-w-lg',
  xl: 'sm:max-w-xl',
  '2xl': 'sm:max-w-2xl',
  '3xl': 'sm:max-w-3xl',
  '4xl': 'sm:max-w-4xl',
  '5xl': 'sm:max-w-5xl',
  full: 'sm:w-full sm:h-full sm:max-w-none sm:max-h-none',
};

interface ModalContentProps
  extends Omit<ModalOverlayProps, 'className' | 'children'>,
    Pick<DialogProps, 'aria-label' | 'aria-labelledby' | 'role' | 'children'> {
  size?: keyof typeof sizes;
  closeButton?: boolean;
  isBlurred?: boolean;
  className?: ModalOverlayProps['className'];
  overlay?: Omit<ModalOverlayProps, 'children'>;
}

const ModalContent = ({
  className,
  isDismissable: isDismissableInternal,
  isBlurred = false,
  children,
  overlay,
  size = 'lg',
  role = 'dialog',
  closeButton = true,
  ...props
}: ModalContentProps) => {
  const isDismissable = isDismissableInternal ?? role !== 'alertdialog';

  return (
    <ModalOverlay
      isDismissable={isDismissable}
      className={composeRenderProps(overlay?.className, (className, { isEntering, isExiting }) =>
        twMerge([
          'fixed top-0 left-0 isolate z-50 h-(--visual-viewport-height) w-full',
          'bg-fg/15 dark:bg-bg/40 flex items-end justify-end text-center sm:block',
          '[--visual-viewport-vertical-padding:16px] sm:[--visual-viewport-vertical-padding:32px]',
          isBlurred && 'bg-bg supports-backdrop-filter:bg-bg/15 dark:supports-backdrop-filter:bg-bg/40 supports-backdrop-filter:backdrop-blur',
          isEntering && 'fade-in animate-in duration-200 ease-out',
          isExiting && 'fade-out animate-out ease-in',
          className,
        ]),
      )}
      {...overlay}>
      <ModalPrimitive
        isDismissable={isDismissable}
        className={composeRenderProps(className, (className, { isEntering, isExiting }) =>
          twMerge([
            'bg-overlay text-overlay-fg ring-fg/5 max-h-full w-full rounded-t-2xl text-left align-middle shadow-lg ring-1',
            'dark:ring-border overflow-hidden sm:rounded-2xl',
            'sm:fixed sm:top-1/2 sm:left-[50vw] sm:-translate-x-1/2 sm:-translate-y-1/2',
            isEntering && 'fade-in slide-in-from-bottom sm:zoom-in-95 sm:slide-in-from-bottom-0 animate-in duration-200 ease-out',
            isExiting && 'slide-out-to-bottom sm:slide-out-to-bottom-0 sm:zoom-out-95 animate-out duration-150 ease-in',
            sizes[size],
            className,
          ]),
        )}
        {...props}>
        <Dialog role={role}>
          {(values) => (
            <>
              {typeof children === 'function' ? children(values) : children}
              {closeButton && <DialogCloseIcon isDismissable={isDismissable} />}
            </>
          )}
        </Dialog>
      </ModalPrimitive>
    </ModalOverlay>
  );
};

const ModalTrigger = DialogTrigger;
const ModalHeader = DialogHeader;
const ModalTitle = DialogTitle;
const ModalDescription = DialogDescription;
const ModalFooter = DialogFooter;
const ModalBody = DialogBody;
const ModalClose = DialogClose;

Modal.Trigger = ModalTrigger;
Modal.Header = ModalHeader;
Modal.Title = ModalTitle;
Modal.Description = ModalDescription;
Modal.Footer = ModalFooter;
Modal.Body = ModalBody;
Modal.Close = ModalClose;
Modal.Content = ModalContent;

export { Modal };
