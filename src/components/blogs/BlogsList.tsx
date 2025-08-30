'use client';

import React from 'react';
import {
  Box,
  Typography,
  Grid,
} from '@mui/material';
import { type BlogPost } from '@/client/blogs';
import BlogCard from '@/components/shared/BlogCard';
import { useRouter } from 'next/navigation';

interface BlogsListProps {
  blogs: BlogPost[];
  totalBlogs: number;
}

const BlogsList: React.FC<BlogsListProps> = ({ blogs, totalBlogs }) => {
  const router = useRouter();

  const handleShare = (title: string, url: string) => {
    const shareUrl = `https://plus.google.com/share?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`;
    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  const handleReadMore = (blog: BlogPost) => {
    router.push(`/detalle-del-blog/${blog.slug}`);
  };

  return (
    <>
             {/* Blog Cards */}
       <Grid container spacing={4}>
         {blogs.map((blog) => (
           <Grid item xs={12} key={blog._id}>
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
          {totalBlogs} artículos publicados
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Más contenido se agregará regularmente para ayudarte a crecer tu negocio.
        </Typography>
      </Box>
    </>
  );
};

export default BlogsList;
