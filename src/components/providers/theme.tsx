import { type ThemeProviderProps } from 'next-themes';
import dynamic from 'next/dynamic';

const NextThemesProvider = dynamic(() => import('next-themes').then((mod) => mod.ThemeProvider), {
  ssr: false,
});

export const ThemeProvider = ({ children, ...props }: ThemeProviderProps) => {
  return (
    <NextThemesProvider enableSystem storageKey='intentui-theme' attribute='class' defaultTheme='light' {...props}>
      {children}
    </NextThemesProvider>
  );
};
