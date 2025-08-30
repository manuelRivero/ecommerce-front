import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Chip,
  Stack,
  Divider,
  Button,
  IconButton,
} from '@mui/material';
import {
  Article,
  CalendarToday,
  Person,
  Share,
  ArrowBack,
} from '@mui/icons-material';
import { getBlogBySlug } from '@/client/blogs';
import Breadcrumb from '@/components/shared/Breadcrumb';
import BlogDetailActions from '@/components/blogs/BlogDetailActions';
import Link from 'next/link';

export const dynamic = "force-dynamic";

const getData = async (subdomain: string, slug: string) => {
  try {
    const blogData = await getBlogBySlug(subdomain, slug);
    return {
      blog: blogData.data.blog,
    };
  } catch (error: any) {
    console.log("error", error);
    throw "error";
  }
};

export default async function BlogDetailPage({ 
  params,
}: {
  params: Promise<any>;
}) {
  const { subdomain, slug } = await params;
  const { blog } = await getData(subdomain, slug);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f8f9fa' }}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Breadcrumbs */}
        <Breadcrumb 
          items={[
            { 
              label: 'Blog', 
              href: '/blogs',
              icon: <Article sx={{ fontSize: 16 }} /> 
            },
            { 
              label: blog.title,
              icon: <Article sx={{ fontSize: 16 }} />
            }
          ]} 
        />

        {/* Back Button */}
        <Box sx={{ mb: 3 }}>
          <Button
            component={Link}
            href="/blogs"
            startIcon={<ArrowBack />}
            sx={{
              color: 'text.secondary',
              '&:hover': {
                color: 'primary.main',
              }
            }}
          >
            Volver al Blog
          </Button>
        </Box>

        {/* Blog Content */}
        <Paper sx={{ p: { xs: 2, md: 4 }, mb: 4 }}>
          {/* Header */}
          <Box sx={{ mb: 4 }}>
                         {/* Date */}
             <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
               <Stack direction="row" spacing={1} alignItems="center">
                 <CalendarToday sx={{ fontSize: 16, color: 'text.secondary' }} />
                 <Typography variant="body2" color="text.secondary">
                   {formatDate(blog.createdAt)}
                 </Typography>
               </Stack>
             </Stack>

            {/* Title */}
            <Typography
              variant="h2"
              sx={{
                fontWeight: 700,
                mb: 2,
                fontSize: { xs: '2rem', md: '3rem' },
                lineHeight: 1.2
              }}
            >
              {blog.title}
            </Typography>

            {/* Description */}
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{
                mb: 3,
                lineHeight: 1.6,
                fontStyle: 'italic'
              }}
            >
              {blog.description}
            </Typography>
          </Box>

                     {/* Featured Image */}
           <Box sx={{ mb: 4 }}>
             <img
               src={blog.image.url}
               alt={blog.image.alt || blog.title}
               style={{
                 width: '100%',
                 height: 'auto',
                 maxHeight: '500px',
                 objectFit: 'cover',
                 borderRadius: '12px'
               }}
             />
           </Box>

          <Divider sx={{ my: 3 }} />

          {/* Content */}
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="body1"
              sx={{
                lineHeight: 1.8,
                fontSize: '1.1rem',
                '& p': {
                  mb: 2
                },
                '& h1, & h2, & h3, & h4, & h5, & h6': {
                  mt: 3,
                  mb: 2,
                  fontWeight: 600
                },
                '& ul, & ol': {
                  pl: 3,
                  mb: 2
                },
                '& li': {
                  mb: 1
                }
              }}
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          </Box>

                     {/* Keywords */}
           <Box sx={{ mb: 4 }}>
             <Typography variant="h6" sx={{ mb: 2 }}>
               Palabras clave:
             </Typography>
             <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
               {blog.keywords.map((keyword: string, index: number) => (
                 <Chip
                   key={index}
                   label={keyword}
                   size="small"
                   variant="outlined"
                   sx={{
                     borderColor: 'primary.main',
                     color: 'primary.main',
                     '&:hover': {
                       bgcolor: 'primary.main',
                       color: 'white'
                     }
                   }}
                 />
               ))}
             </Stack>
           </Box>

          <Divider sx={{ my: 3 }} />

          {/* Share Section */}
          <BlogDetailActions blogTitle={blog.title} />
        </Paper>
      </Container>
    </Box>
  );
}
