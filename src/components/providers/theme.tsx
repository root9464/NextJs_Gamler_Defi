import { ThemeProvider as NextThemesProvider, type ThemeProviderProps } from 'next-themes';

export const ThemeProvider = ({ children, ...props }: ThemeProviderProps) => {
  return (
    <NextThemesProvider enableSystem storageKey='intentui-theme' {...props}>
      {children}
    </NextThemesProvider>
  );
};
