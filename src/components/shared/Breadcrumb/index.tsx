'use client';

import React from 'react';
import {
  Breadcrumbs,
  Link as MuiLink,
  Typography,
  Box,
} from '@mui/material';
import {
  Home,
} from '@mui/icons-material';
import Link from 'next/link';

interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <Box sx={{ mb: 3 }}>
      <Breadcrumbs 
        separator="›"
        sx={{
          '& .MuiBreadcrumbs-separator': {
            color: 'text.secondary',
            fontSize: '1.2rem',
            fontWeight: 600,
          }
        }}
      >
        {/* Home link always present */}
        <Link href="/" passHref>
          <MuiLink
            component="span"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
              color: 'text.secondary',
              textDecoration: 'none',
              fontWeight: 500,
              transition: 'color 0.2s ease',
              '&:hover': { 
                color: 'primary.main',
                textDecoration: 'none'
              }
            }}
          >
            <Home sx={{ fontSize: 16 }} />
            Inicio
          </MuiLink>
        </Link>

        {/* Dynamic breadcrumb items */}
        {items.map((item, index) => (
          <Box key={index}>
            {item.href ? (
              <Link href={item.href} passHref>
                <MuiLink
                  component="span"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,
                    color: 'text.secondary',
                    textDecoration: 'none',
                    fontWeight: 500,
                    transition: 'color 0.2s ease',
                    '&:hover': { 
                      color: 'primary.main',
                      textDecoration: 'none'
                    }
                  }}
                >
                  {item.icon}
                  {item.label}
                </MuiLink>
              </Link>
            ) : (
              <Typography
                color="text.primary"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5,
                  fontWeight: 600,
                }}
              >
                {item.icon}
                {item.label}
              </Typography>
            )}
          </Box>
        ))}
      </Breadcrumbs>
    </Box>
  );
};

export default Breadcrumb;
