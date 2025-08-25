import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import ThemeRegistry from './theme-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Tienda Pro - Transforma tu negocio en una tienda online',
  description: 'Sistema completo de ecommerce que convierte cualquier negocio en una tienda online profesional y rentable. Gestión de productos, promociones, pagos seguros y más.',
  keywords: 'ecommerce, tienda online, plataforma de ventas, gestión de productos, pagos online, marketing digital',
  authors: [{ name: 'Tienda Pro' }],
  openGraph: {
    title: 'Tienda Pro - Transforma tu negocio en una tienda online',
    description: 'Sistema completo de ecommerce que convierte cualquier negocio en una tienda online profesional y rentable.',
    type: 'website',
    locale: 'es_AR',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <ThemeRegistry>
          {children}
        </ThemeRegistry>
      </body>
    </html>
  );
} 