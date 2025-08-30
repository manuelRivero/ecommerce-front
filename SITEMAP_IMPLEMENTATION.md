# 🗺️ Implementación de Sitemaps Dinámicos

## 📋 Descripción General

Este proyecto implementa sitemaps dinámicos para optimizar el SEO tanto del dominio principal como de cada subdominio (tienda individual).

## 🏗️ Arquitectura

### **Estructura de Archivos**

```
src/
├── app/
│   ├── sitemap.ts                    # Sitemap del dominio principal
│   ├── sitemap-index.ts              # Índice de todos los sitemaps
│   ├── robots.ts                     # Archivo robots.txt
│   └── [subdomain]/
│       └── sitemap.ts                # Sitemap dinámico por subdominio
├── client/
│   ├── sitemap/
│   │   └── index.ts                  # Funciones auxiliares para sitemaps
│   ├── tenants/
│   │   └── active.ts                 # API para obtener tenants activos
│   ├── products/
│   │   └── index.ts                  # API para obtener productos
│   └── blogs/
│       └── index.ts                  # API para obtener blogs
└── config/
    └── environment.ts                # Configuración de variables de entorno
```

## 🎯 Funcionalidades

### **1. Sitemap del Dominio Principal (`/sitemap.xml`)**

**URLs Incluidas:**
- `/` - Página principal
- `/crear-tienda` - Crear nueva tienda
- `/acerca-de-nosotros` - Información de la empresa
- `/contacto` - Página de contacto
- `/politicas-de-privacidad` - Políticas de privacidad
- `/terminos-de-servicio` - Términos de servicio
- `/condiciones-de-uso` - Condiciones de uso

**Prioridades:**
- Página principal: 1.0
- Crear tienda: 0.9
- Páginas informativas: 0.7
- Páginas legales: 0.5

### **2. Sitemap Dinámico por Subdominio (`[subdomain]/sitemap.xml`)**

**URLs Estáticas:**
- `/[subdomain]` - Página principal de la tienda
- `/[subdomain]/productos` - Lista de productos
- `/[subdomain]/ofertas` - Ofertas especiales
- `/[subdomain]/descuentos` - Productos con descuento
- `/[subdomain]/mas-vendidos` - Productos más populares
- `/[subdomain]/blogs` - Blog de la tienda
- `/[subdomain]/politicas` - Políticas de la tienda
- `/[subdomain]/como-funciona-el-envio` - Información de envíos

**URLs Dinámicas:**
- `/[subdomain]/detalle-producto/[id]` - Páginas de productos individuales
- `/[subdomain]/detalle-del-blog/[slug]` - Páginas de blogs individuales

**Prioridades:**
- Página principal: 1.0
- Productos: 0.9
- Ofertas/Descuentos: 0.8
- Detalles de productos: 0.8
- Blogs: 0.7
- Detalles de blogs: 0.7
- Páginas informativas: 0.5-0.6

### **3. Sitemap Index (`/sitemap-index.xml`)**

Lista todos los sitemaps disponibles:
- Sitemap del dominio principal
- Sitemap de cada subdominio activo

## 🔧 Configuración

### **Variables de Entorno**

```env
# URL base de la aplicación
NEXT_PUBLIC_BASE_URL=tu-dominio.com

# URL de la API
NEXT_PUBLIC_API_URL=https://api.tu-dominio.com
```

### **APIs Requeridas**

1. **`GET /tenants/active`** - Obtener tenants activos
2. **`GET /products`** - Obtener productos por subdominio
3. **`GET /blogs/public`** - Obtener blogs públicos por subdominio

## 📊 URLs de Acceso

### **Desarrollo Local**
- **Principal**: `http://localhost:3000/sitemap.xml`
- **Subdominio**: `http://tienda.localhost:3000/sitemap.xml`
- **Índice**: `http://localhost:3000/sitemap-index.xml`
- **Robots**: `http://localhost:3000/robots.txt`

### **Producción**
- **Principal**: `https://tu-dominio.com/sitemap.xml`
- **Subdominio**: `https://tienda.tu-dominio.com/sitemap.xml`
- **Índice**: `https://tu-dominio.com/sitemap-index.xml`
- **Robots**: `https://tu-dominio.com/robots.txt`

## 🚀 Beneficios SEO

### **1. Indexación Rápida**
- Los motores de búsqueda encuentran contenido nuevo rápidamente
- URLs dinámicas se indexan automáticamente

### **2. Priorización de Contenido**
- URLs importantes tienen mayor prioridad
- Contenido comercial (productos) priorizado sobre informativo

### **3. Frecuencia de Actualización**
- Contenido dinámico (productos): semanal
- Contenido estático: mensual/anual
- Blogs: mensual

### **4. Cobertura Completa**
- Todas las páginas públicas incluidas
- Subdominios separados para mejor organización

### **5. Optimización por Tienda**
- Cada tienda tiene su propio sitemap
- Contenido específico por subdominio

## 🛠️ Mantenimiento

### **Actualizaciones Automáticas**
- Los sitemaps se generan dinámicamente en cada request
- No requiere regeneración manual
- Se actualiza automáticamente cuando se agregan productos/blogs

### **Manejo de Errores**
- Fallback a URLs estáticas si fallan las APIs
- Logs de errores para debugging
- No afecta la funcionalidad principal

### **Performance**
- Caché implícito de Next.js
- Generación eficiente de URLs
- Límite de 100 blogs por subdominio para evitar sitemaps muy grandes

## 📈 Monitoreo

### **Verificación de Sitemaps**
1. Acceder a `/sitemap.xml` para verificar el sitemap principal
2. Acceder a `/[subdomain]/sitemap.xml` para verificar sitemaps de subdominios
3. Acceder a `/sitemap-index.xml` para verificar el índice
4. Acceder a `/robots.txt` para verificar las reglas de robots

### **Herramientas de Validación**
- Google Search Console
- Bing Webmaster Tools
- Validadores online de sitemaps

## 🔄 Próximas Mejoras

1. **Paginación de Sitemaps**: Para tiendas con muchos productos
2. **Sitemaps por Categoría**: Sitemaps específicos por categoría de productos
3. **Imágenes en Sitemaps**: Incluir imágenes de productos en sitemaps
4. **Noticias en Sitemaps**: Sitemaps específicos para blogs con formato de noticias
5. **Compresión Gzip**: Comprimir sitemaps grandes para mejor performance
