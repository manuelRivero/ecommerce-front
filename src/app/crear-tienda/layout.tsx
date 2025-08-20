import CreateStoreThemeProvider from './theme-provider';

export default function CreateStoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CreateStoreThemeProvider>
      {children}
    </CreateStoreThemeProvider>
  );
}
