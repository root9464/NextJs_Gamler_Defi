import { cn } from '@/shared/utils/tw.utils';
import { ComponentPropsWithoutRef, ComponentPropsWithRef, ElementType, ReactNode } from 'react';

type PolymorphicRef<E extends ElementType> = ComponentPropsWithRef<E>['ref'];

type IconFlowOwnProps<E extends ElementType = 'div'> = {
  children: ReactNode;
  className?: string;
  as?: E;
  ref?: PolymorphicRef<E>;
};

type PropsWithAs<E extends ElementType> = IconFlowOwnProps<E> & Omit<ComponentPropsWithoutRef<E>, keyof IconFlowOwnProps<E>>;

export const IconFlow = <E extends ElementType = 'div'>(props: PropsWithAs<E>) => {
  const { as, children, className, ref, ...rest } = props as IconFlowOwnProps<E> & Record<string, unknown>;
  const Component = (as || 'div') as ElementType;
  return (
    <Component
      ref={ref}
      className={cn(
        'flex size-[35px] cursor-pointer items-center justify-center rounded-full p-2',
        'max-desktop-xs:size-[45px] max-desktop-xs:p-3',
        className,
      )}
      {...(rest as ComponentPropsWithoutRef<E>)}>
      {children}
    </Component>
  );
};
