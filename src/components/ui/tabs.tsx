'use client';

import type { ReactNode } from 'react';

import type {
  TabListProps as TabListPrimitiveProps,
  TabPanelProps as TabPanelPrimitiveProps,
  TabProps as TabPrimitiveProps,
  TabsProps as TabsPrimitiveProps,
} from 'react-aria-components';
import {
  TabList as TabListPrimitive,
  TabPanel as TabPanelPrimitive,
  Tab as TabPrimitive,
  Tabs as TabsPrimitive,
  composeRenderProps,
} from 'react-aria-components';
import { twMerge } from 'tailwind-merge';

import { composeTailwindRenderProps } from '@shared/lib/primitive';

interface TabsProps extends TabsPrimitiveProps {
  ref?: React.RefObject<HTMLDivElement>;
}
const Tabs = ({ className, ref, ...props }: TabsProps) => {
  return (
    <TabsPrimitive
      className={composeTailwindRenderProps(
        className,
        'group/tabs orientation-vertical:w-[800px] orientation-vertical:flex-row orientation-horizontal:flex-col flex gap-4 forced-color-adjust-none',
      )}
      ref={ref}
      {...props}
    />
  );
};

interface TabListProps<T extends object> extends TabListPrimitiveProps<T> {
  ref?: React.RefObject<HTMLDivElement>;
}
const TabList = <T extends object>({ className, ref, ...props }: TabListProps<T>) => {
  return (
    <TabListPrimitive
      ref={ref}
      {...props}
      className={composeRenderProps(className, (className, { orientation }) =>
        twMerge([
          'flex forced-color-adjust-none',
          orientation === 'horizontal' && 'flex-row gap-x-5 border-b border-black/10',
          orientation === 'vertical' && 'flex-col items-start gap-y-4 border-l',
          className,
        ]),
      )}
    />
  );
};

type TabRenderProps = {
  isSelected: boolean;
};

type TabChildren = ReactNode | ((values: TabRenderProps) => ReactNode);

interface TabProps extends TabPrimitiveProps {
  ref?: React.RefObject<HTMLDivElement>;
  children?: TabChildren;
}
const Tab = ({ children, className, ref, ...props }: TabProps) => {
  return (
    <TabPrimitive
      ref={ref}
      {...props}
      className={composeRenderProps(className, (className) =>
        twMerge([
          'text-uiPrimaryText relative flex cursor-default items-center rounded-full text-sm font-medium whitespace-nowrap outline-hidden transition hover:text-[#1890FF] *:data-[slot=icon]:mr-2 *:data-[slot=icon]:size-4',
          'group-orientation-vertical/tabs:w-full group-orientation-vertical/tabs:py-0 group-orientation-vertical/tabs:pr-2 group-orientation-vertical/tabs:pl-4',
          'group-orientation-horizontal/tabs:pb-3',
          'selected:text-[#1890FF] text-muted-fg focus:ring-0',
          'disabled:opacity-50',
          'href' in props && 'cursor-pointer',
          className,
        ]),
      )}>
      {({ isSelected }) => (
        <>
          {typeof children === 'function' ? children({ isSelected }) : children}
          {isSelected && (
            <span
              data-slot='selected-indicator'
              className={twMerge(
                'absolute rounded bg-[#1890FF]',
                'group-orientation-horizontal/tabs:-bottom-px group-orientation-horizontal/tabs:inset-x-0 group-orientation-horizontal/tabs:h-0.5 group-orientation-horizontal/tabs:w-full',
                'group-orientation-vertical/tabs:left-0 group-orientation-vertical/tabs:h-[calc(100%-10%)] group-orientation-vertical/tabs:w-0.5 group-orientation-vertical/tabs:transform',
              )}
            />
          )}
        </>
      )}
    </TabPrimitive>
  );
};

interface TabPanelProps extends TabPanelPrimitiveProps {
  ref?: React.RefObject<HTMLDivElement>;
}
const TabPanel = ({ className, ref, ...props }: TabPanelProps) => {
  return (
    <TabPanelPrimitive
      {...props}
      ref={ref}
      className={composeTailwindRenderProps(className, 'text-fg flex-1 text-sm focus-visible:outline-hidden')}
    />
  );
};

export { Tab, TabList, TabPanel, Tabs };
export type { TabListProps, TabPanelProps, TabProps, TabsProps };
