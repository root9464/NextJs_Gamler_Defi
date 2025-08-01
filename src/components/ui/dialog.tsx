'use client';

import { useEffect, useRef } from 'react';

import { IconX } from '@intentui/icons';
import type { HeadingProps } from 'react-aria-components';
import { Button as ButtonPrimitive, Dialog as DialogPrimitive, Heading, Text } from 'react-aria-components';

import { useMediaQuery } from '@hooks/useMediaQuery';
import { composeTailwindRenderProps } from '@shared/lib/primitive';
import { Button, type ButtonProps } from '@ui/button';
import { twMerge } from 'tailwind-merge';

const Dialog = ({ role = 'dialog', className, ...props }: React.ComponentProps<typeof DialogPrimitive>) => {
  return (
    <DialogPrimitive
      role={role}
      className={twMerge(
        'peer/dialog group/dialog relative flex max-h-[inherit] flex-col overflow-hidden outline-hidden [--gutter:--spacing(6)] [scrollbar-width:thin] sm:max-h-full sm:[--gutter:--spacing(8)] [&::-webkit-scrollbar]:size-0.5 top-0',
        className,
      )}
      {...props}
    />
  );
};

const DialogTrigger = (props: React.ComponentProps<typeof ButtonPrimitive>) => <ButtonPrimitive {...props} />;

type DialogHeaderProps = React.HTMLAttributes<HTMLDivElement> & {
  title?: string;
  description?: string;
};

const DialogHeader = ({ className, ...props }: DialogHeaderProps) => {
  const headerRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) {
      return;
    }

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        header.parentElement?.style.setProperty('--dialog-header-height', `${entry.target.clientHeight}px`);
      }
    });

    observer.observe(header);
    return () => observer.unobserve(header);
  }, []);

  return (
    <div
      data-slot='dialog-header'
      ref={headerRef}
      className={twMerge('relative space-y-1 p-(--gutter) pb-[calc(var(--gutter)---spacing(3))]', className)}>
      {props.title && <DialogTitle>{props.title}</DialogTitle>}
      {props.description && <DialogDescription>{props.description}</DialogDescription>}
      {!props.title && typeof props.children === 'string' ? <DialogTitle {...props} /> : props.children}
    </div>
  );
};

interface DialogTitleProps extends Omit<HeadingProps, 'level'> {
  level?: 1 | 2 | 3 | 4;
  ref?: React.Ref<HTMLHeadingElement>;
}
const DialogTitle = ({ level = 2, className, ref, ...props }: DialogTitleProps) => (
  <Heading
    slot='title'
    level={level}
    ref={ref}
    className={twMerge('text-fg text-lg/6 font-semibold text-balance sm:text-base/6', className)}
    {...props}
  />
);

type DialogDescriptionProps = React.ComponentProps<'div'>;
const DialogDescription = ({ className, ref, ...props }: DialogDescriptionProps) => (
  <Text
    slot='description'
    className={twMerge('text-muted-fg text-base/6 text-pretty group-disabled:opacity-50 sm:text-sm/6', className)}
    ref={ref}
    {...props}
  />
);

type DialogBodyProps = React.ComponentProps<'div'>;
const DialogBody = ({ className, ref, ...props }: DialogBodyProps) => (
  <div
    data-slot='dialog-body'
    ref={ref}
    className={twMerge(
      'isolate flex max-h-[calc(var(--visual-viewport-height)-var(--visual-viewport-vertical-padding)-var(--dialog-header-height,0px)-var(--dialog-footer-height,0px))] flex-1 flex-col overflow-auto px-(--gutter) py-1',
      className,
    )}
    {...props}
  />
);

type DialogFooterProps = React.ComponentProps<'div'>;
const DialogFooter = ({ className, ...props }: DialogFooterProps) => {
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const footer = footerRef.current;

    if (!footer) {
      return;
    }

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        footer.parentElement?.style.setProperty('--dialog-footer-height', `${entry.target.clientHeight}px`);
      }
    });

    observer.observe(footer);
    return () => {
      observer.unobserve(footer);
    };
  }, []);
  return (
    <div
      ref={footerRef}
      data-slot='dialog-footer'
      className={twMerge(
        'isolate mt-auto flex flex-col-reverse justify-between gap-3 p-(--gutter) pt-[calc(var(--gutter)---spacing(2))] group-not-has-data-[slot=dialog-body]/dialog:pt-0 group-not-has-data-[slot=dialog-body]/popover:pt-0 sm:flex-row',
        className,
      )}
      {...props}
    />
  );
};

const DialogClose = ({ className, intent = 'outline', ref, ...props }: ButtonProps) => {
  return <Button slot='close' className={className} ref={ref} intent={intent} {...props} />;
};

interface CloseButtonIndicatorProps extends Omit<ButtonProps, 'children'> {
  className?: string;
  isDismissable?: boolean | undefined;
}

const DialogCloseIcon = ({ className, ...props }: CloseButtonIndicatorProps) => {
  const isMobile = useMediaQuery('(max-width: 600px)');
  return props.isDismissable ? (
    <ButtonPrimitive
      {...(isMobile ? { autoFocus: true } : {})}
      aria-label='Close'
      slot='close'
      className={composeTailwindRenderProps(
        className,
        'close hover:bg-secondary focus:bg-secondary focus-visible:ring-primary absolute top-1 right-1 z-50 grid size-8 place-content-center rounded-xl focus:outline-hidden focus-visible:ring-1 sm:top-2 sm:right-2 sm:size-7 sm:rounded-md',
      )}>
      <IconX className='size-4' />
    </ButtonPrimitive>
  ) : null;
};

export { Dialog, DialogBody, DialogClose, DialogCloseIcon, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger };
export type { CloseButtonIndicatorProps, DialogBodyProps, DialogDescriptionProps, DialogFooterProps, DialogHeaderProps, DialogTitleProps };
