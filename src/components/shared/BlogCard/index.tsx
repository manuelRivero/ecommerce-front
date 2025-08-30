'use client';

import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Button,
  Chip,
  Stack,
  IconButton,
  Divider,
  Typography,
  Box,
  Grid,
} from '@mui/material';
import {
  Share,
  CalendarToday,
  Person,
  ArrowForward,
} from '@mui/icons-material';
import { type BlogPost } from '@/client/blogs';

interface BlogCardProps {
  blog: BlogPost;
  onShare?: (title: string, url: string) => void;
  onReadMore?: (blog: BlogPost) => void;
}

const BlogCard: React.FC<BlogCardProps> = ({ 
  blog, 
  onShare, 
  onReadMore 
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleShare = () => {
    if (onShare) {
      onShare(blog.title, window.location.href);
    } else {
      // Fallback default share behavior
      const shareUrl = `https://plus.google.com/share?url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(blog.title)}`;
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  };

  const handleReadMore = () => {
    if (onReadMore) {
      onReadMore(blog);
    }
  };

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 3,
        overflow: 'hidden',
        border: '1px solid #e0e0e0',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
        }
      }}
    >
      <Grid container>
        {/* Imagen del blog */}
        <Grid item xs={12} md={5}>
          <CardMedia
            component="img"
            height="300"
            image={blog.image.url}
            alt={blog.title}
            sx={{
              height: { xs: 200, md: 300 },
              objectFit: 'cover'
            }}
          />
        </Grid>

        {/* Contenido del blog */}
        <Grid item xs={12} md={7}>
          <CardContent sx={{ p: { xs: 2, md: 3 }, height: '100%', display: 'flex', flexDirection: 'column' }}>          
            {/* Título */}
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                mb: 2,
                fontSize: { xs: '1.5rem', md: '2rem' },
                lineHeight: 1.2
              }}
            >
              {blog.title}
            </Typography>


            {/* Descripción */}
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{
                mb: 3,
                lineHeight: 1.6,
                flexGrow: 1
              }}
            >
              {blog.description}
            </Typography>


            <Divider sx={{ my: 2 }} />

            {/* Acciones */}
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2}
              justifyContent="space-between"
              alignItems={{ xs: 'stretch', sm: 'center' }}
            >
              <Button
                variant="contained"
                endIcon={<ArrowForward />}
                onClick={handleReadMore}
                sx={(theme) => ({
                  background: theme.palette.primary.main,
                  px: 3,
                  py: 1.5,
                  fontWeight: 600,
                  textTransform: 'none',
                  '&:hover': {
                    background: theme.palette.primary.dark,
                  }
                })}
              >
                Leer Más
              </Button>

              <Stack direction="row" spacing={1}>
                <IconButton
                  onClick={handleShare}
                >
                  <Share />
                </IconButton>
              </Stack>
            </Stack>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  );
};

export default BlogCard;
