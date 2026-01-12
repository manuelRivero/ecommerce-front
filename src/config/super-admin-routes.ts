/**
 * Configuración de rutas del Super Admin
 * Organiza las rutas por grupos funcionales
 */

export interface SidebarRouteItem {
  label: string;
  href: string;
}

export interface SidebarRouteGroup {
  label: string;
  items: SidebarRouteItem[];
}

export interface SidebarRouteConfig {
  label: string;
  href?: string; // Si tiene href, es un enlace simple. Si no, es un grupo con items
  items?: SidebarRouteItem[];
}

/**
 * Configuración de rutas del sidebar
 * - Si un item tiene solo `href`, se renderiza como enlace simple
 * - Si un item tiene `items`, se renderiza como dropdown/accordion
 */
export const sidebarRoutes: SidebarRouteConfig[] = [
  // Inicio (enlace simple)
  {
    label: 'Inicio',
    href: '/super-admin',
  },
  // Tenants (enlace simple - solo una opción)
  {
    label: 'Tenants',
    href: '/super-admin/tenants',
  },
  // Planes (grupo con múltiples opciones)
  {
    label: 'Planes',
    items: [
      { label: 'Listar Planes', href: '/super-admin/plans' },
      { label: 'Crear Plan', href: '/super-admin/create-plan' },
    ],
  },
  // Características/Features (grupo con múltiples opciones)
  {
    label: 'Características',
    items: [
      { label: 'Listar Características', href: '/super-admin/features' },
      { label: 'Crear Característica', href: '/super-admin/create-feature' },
    ],
  },
  // Anuncios (grupo con múltiples opciones)
  {
    label: 'Anuncios',
    items: [
      { label: 'Listar Anuncios', href: '/super-admin/announcements' },
      { label: 'Crear Anuncio', href: '/super-admin/create-announcement' },
    ],
  },
  // Webhook Events (enlace simple - solo una opción)
  {
    label: 'Webhook Events',
    href: '/super-admin/webhook-events',
  },
];

