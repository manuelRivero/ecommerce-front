'use client';

import React from 'react';
import {
  Box,
  Typography,
  Stack,
  Button,
} from '@mui/material';
import {
  Share,
} from '@mui/icons-material';
import Link from 'next/link';

interface BlogDetailActionsProps {
  blogTitle: string;
}

const BlogDetailActions: React.FC<BlogDetailActionsProps> = ({ blogTitle }) => {
  const handleShare = () => {
    const shareUrl = `https://plus.google.com/share?url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(blogTitle)}`;
    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  return (
    <Box sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        ¿Te gustó este artículo?
      </Typography>
      <Stack direction="row" spacing={2} justifyContent="center">
        <Button
          variant="contained"
          startIcon={<Share />}
          onClick={handleShare}
          sx={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            '&:hover': {
              background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
            }
          }}
        >
          Compartir
        </Button>
        <Button
          component={Link}
          href="/blogs"
          variant="outlined"
        >
          Ver más artículos
        </Button>
      </Stack>
    </Box>
  );
};

export default BlogDetailActions;
