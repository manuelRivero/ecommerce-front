'use client';

import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
} from '@mui/material';
import {
  Article,
} from '@mui/icons-material';
import { blogPosts, type BlogPost } from '@/mocks/blog';
import Breadcrumb from '@/components/shared/Breadcrumb';
import BlogCard from '@/components/shared/BlogCard';

const BlogsPage = () => {
  const handleShare = (title: string, url: string) => {
    const shareUrl = `https://plus.google.com/share?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`;
    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  const handleReadMore = (blog: BlogPost) => {
    // Aquí puedes implementar la navegación a la página de detalle del blog
    console.log('Navegar a:', blog.slug);
    // Por ejemplo: router.push(`/blogs/${blog.slug}`);
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f8f9fa' }}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Breadcrumbs */}
        <Breadcrumb 
          items={[
            { label: 'Blog', icon: <Article sx={{ fontSize: 16 }} /> }
          ]} 
        />

        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 700,
              mb: 2,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontSize: { xs: '2rem', md: '3rem' }
            }}
          >
            Nuestro Blog
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ maxWidth: 600, mx: 'auto', fontSize: { xs: '1rem', md: '1.25rem' } }}
          >
            Descubre consejos, estrategias y las últimas tendencias para hacer crecer tu negocio online
          </Typography>
        </Box>

        {/* Blog Cards */}
        <Grid container spacing={4}>
          {blogPosts.map((blog) => (
            <Grid item xs={12} key={blog.id}>
              <BlogCard
                blog={blog}
                onShare={handleShare}
                onReadMore={handleReadMore}
              />
            </Grid>
          ))}
        </Grid>

        {/* Estadísticas */}
        <Box sx={{ textAlign: 'center', mt: 6, py: 4 }}>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
            {blogPosts.length} artículos publicados
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Más contenido se agregará regularmente para ayudarte a crecer tu negocio.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default BlogsPage;
