'use client';

import React from "react";
import AdminThemeProvider from "@/components/adminThemeProvider";
import Sidebar from "@/components/adminComponents/sidebar";
import { SuperAdminAuthProvider } from "@/context/super-admin-auth";
import { ProtectedRoute } from "@/components/super-admin/ProtectedRoute";
import { ClientOnly } from "@/components/super-admin/ClientOnly";
import { usePathname } from "next/navigation";
import '../globals.css';

function SuperAdminContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = pathname === '/super-admin/auth';

  if (isAuthPage) {
    return <>{children}</>;
  }

  return (
    <ClientOnly
      fallback={
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh',
          background: "#f5f5f5"
        }}>
          <div>Cargando...</div>
        </div>
      }
    >
      <ProtectedRoute>
        <div style={{ display: 'flex', minHeight: "100vh", background: "#f5f5f5" }}>
          <Sidebar />
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <header style={{ padding: 16, background: "#222", color: "#fff" }}>
              <h1>Super Admin</h1>
            </header>
            <main style={{ padding: 24 }}>{children}</main>
          </div>
        </div>
      </ProtectedRoute>
    </ClientOnly>
  );
}

export default function SuperAdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <SuperAdminAuthProvider>
          <AdminThemeProvider>
            <SuperAdminContent>
              {children}
            </SuperAdminContent>
          </AdminThemeProvider>
        </SuperAdminAuthProvider>
      </body>
    </html>
  );
} 