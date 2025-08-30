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
import { getPublicBlogs } from '@/client/blogs';
import Breadcrumb from '@/components/shared/Breadcrumb';
import BlogsList from '@/components/blogs/BlogsList';

export const dynamic = "force-dynamic";

const getData = async (subdomain: string, page: number = 0) => {
  try {
    const blogsData = await getPublicBlogs(subdomain, page, 10);
    return {
      blogs: blogsData.data.blogs,
      totalPages: blogsData.data.totalPages,
      currentPage: blogsData.data.currentPage,
      totalBlogs: blogsData.data.totalBlogs,
    };
  } catch (error: any) {
    console.log("error en blogs", error);
    throw "error";
  }
};

export default async function BlogsPage({ 
  params,
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] };
  params: Promise<any>;
}) {
  const { subdomain } = await params;
  const parseParams = await searchParams;
  const page = parseParams["?page"] ? Number(parseParams["?page"]) - 1 : 0;
  const data = await getData(subdomain, page);

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
          >
            Nuestro Blog
          </Typography>
          <Typography
            variant="h6"
            sx={{ maxWidth: 600, mx: 'auto', fontSize: { xs: '1rem', md: '1.25rem' } }}
          >
            Descubre consejos, estrategias y las últimas tendencias
          </Typography>
        </Box>

        {/* Blog List Component */}
        <BlogsList blogs={data.blogs} totalBlogs={data.totalBlogs} />
      </Container>
    </Box>
  );
}
