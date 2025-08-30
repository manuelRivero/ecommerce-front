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
       <Grid container spacing={{xs: 0, md: 4}}>
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
    </>
  );
};

export default BlogsList;
