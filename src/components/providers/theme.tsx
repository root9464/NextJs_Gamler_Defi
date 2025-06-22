import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { ReactNode } from 'react';

export const ThemeProvider = ({ children, ...props }: Readonly<{ children: ReactNode }>) => {
  return (
    <NextThemesProvider enableSystem storageKey='justd-theme' defaultTheme='light' {...props}>
      {children}
    </NextThemesProvider>
  );
};
