export interface BlogPost {
  id: number;
  title: string;
  description: string;
  content: string;
  image: string;
  author: string;
  publishDate: string;
  category: string;
  readTime: string;
  tags: string[];
  slug: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Cómo Optimizar tu Tienda Online para Vender Más",
    description: "Descubre las mejores estrategias para aumentar las ventas de tu tienda online. Desde SEO hasta experiencia de usuario, te contamos todo lo que necesitas saber para convertir visitantes en clientes.",
    content: "En el mundo del comercio electrónico, la optimización de tu tienda online es fundamental para el éxito. No se trata solo de tener productos atractivos, sino de crear una experiencia completa que convierta visitantes en clientes leales. En este artículo, exploraremos las estrategias más efectivas para optimizar tu tienda online y aumentar significativamente tus ventas. Desde la optimización técnica hasta las mejores prácticas de UX, cubriremos todos los aspectos esenciales que necesitas conocer para hacer crecer tu negocio digital.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    author: "Equipo de Marketing",
    publishDate: "2024-01-15",
    category: "Marketing Digital",
    readTime: "5 min de lectura",
    tags: ["E-commerce", "Marketing", "Ventas", "Optimización"],
    slug: "como-optimizar-tu-tienda-online"
  },
  {
    id: 2,
    title: "Las 10 Tendencias de E-commerce para 2024",
    description: "Mantente al día con las últimas tendencias que están transformando el comercio electrónico. Desde inteligencia artificial hasta experiencias inmersivas, descubre qué está marcando la diferencia.",
    content: "El e-commerce está en constante evolución, y 2024 no será la excepción. Las nuevas tecnologías y los cambios en el comportamiento del consumidor están redefiniendo cómo compramos y vendemos online. En este artículo, analizaremos las 10 tendencias más importantes que están dando forma al futuro del comercio electrónico, desde la implementación de IA hasta las nuevas formas de pago y las experiencias de compra inmersivas.",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    author: "Ana García",
    publishDate: "2024-01-10",
    category: "Tendencias",
    readTime: "8 min de lectura",
    tags: ["Tendencias", "E-commerce", "Tecnología", "Innovación"],
    slug: "tendencias-ecommerce-2024"
  },
  {
    id: 3,
    title: "Guía Completa para Crear Contenido que Convierte",
    description: "Aprende a crear contenido que no solo atraiga visitantes, sino que también los convierta en clientes. Descubre las técnicas probadas para generar engagement y ventas.",
    content: "El contenido es el rey del marketing digital, pero no cualquier contenido genera resultados. Para que tu contenido realmente convierta, necesita estar estratégicamente diseñado para atraer, educar y persuadir a tu audiencia. En esta guía completa, te enseñaremos cómo crear contenido que no solo atraiga visitantes a tu sitio web, sino que también los convierta en clientes leales y defensores de tu marca.",
    image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80",
    author: "Carlos Rodríguez",
    publishDate: "2024-01-08",
    category: "Contenido",
    readTime: "12 min de lectura",
    tags: ["Contenido", "Marketing", "Conversión", "SEO"],
    slug: "guia-contenido-que-convierte"
  },
  {
    id: 4,
    title: "Estrategias de Email Marketing que Triplican las Ventas",
    description: "Descubre cómo implementar campañas de email marketing efectivas que generen resultados reales. Desde la segmentación hasta la automatización, todo lo que necesitas saber.",
    content: "El email marketing sigue siendo una de las herramientas más efectivas para generar ventas online. Con las estrategias correctas, puedes triplicar tus resultados y crear relaciones duraderas con tus clientes. En este artículo, te revelaremos las técnicas más efectivas de email marketing, desde la construcción de listas de calidad hasta la creación de secuencias de automatización que convierten.",
    image: "https://images.unsplash.com/photo-1557838923-2985c318be48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80",
    author: "María López",
    publishDate: "2024-01-05",
    category: "Email Marketing",
    readTime: "10 min de lectura",
    tags: ["Email Marketing", "Automatización", "Ventas", "Conversión"],
    slug: "email-marketing-triplicar-ventas"
  },
  {
    id: 5,
    title: "Cómo Construir Confianza con tus Clientes Online",
    description: "La confianza es el factor más importante para el éxito de cualquier negocio online. Aprende las estrategias probadas para construir y mantener la confianza de tus clientes.",
    content: "En el mundo digital, la confianza es el activo más valioso que puede tener tu negocio. Sin ella, es prácticamente imposible generar ventas sostenibles. En este artículo, exploraremos las estrategias más efectivas para construir y mantener la confianza con tus clientes online, desde la transparencia en la comunicación hasta la implementación de elementos de seguridad y credibilidad.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    author: "Laura Martínez",
    publishDate: "2024-01-03",
    category: "Confianza",
    readTime: "7 min de lectura",
    tags: ["Confianza", "Relaciones", "Cliente", "Credibilidad"],
    slug: "construir-confianza-clientes"
  }
];

export const getBlogPostBySlug = (slug: string): BlogPost | undefined => {
  return blogPosts.find(post => post.slug === slug);
};

export const getBlogPostsByCategory = (category: string): BlogPost[] => {
  return blogPosts.filter(post => post.category === category);
};

export const getRecentBlogPosts = (limit: number = 3): BlogPost[] => {
  return blogPosts
    .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime())
    .slice(0, limit);
};
