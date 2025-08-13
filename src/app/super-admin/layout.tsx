import React from "react";
import AdminThemeProvider from "@/components/adminThemeProvider";
import Sidebar from "@/components/adminComponents/sidebar";

export default function SuperAdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <AdminThemeProvider>
          <div style={{ display: 'flex', minHeight: "100vh", background: "#f5f5f5" }}>
            <Sidebar />
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <header style={{ padding: 16, background: "#222", color: "#fff" }}>
                <h1>Super Admin</h1>
              </header>
              <main style={{ padding: 24 }}>{children}</main>
            </div>
          </div>
        </AdminThemeProvider>
      </body>
    </html>
  );
} 