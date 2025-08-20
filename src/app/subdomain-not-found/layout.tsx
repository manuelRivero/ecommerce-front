import SubdomainNotFoundThemeProvider from './theme-provider';

export default function SubdomainNotFoundLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SubdomainNotFoundThemeProvider>
      {children}
    </SubdomainNotFoundThemeProvider>
  );
}
