'use client';

import React from 'react';
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
} from '@mui/icons-material';
import { useTheme } from '@mui/material';

interface FilterSectionProps {
  title: string;
  children: React.ReactNode;
  sectionKey: string;
  expanded: boolean;
  onToggle: () => void;
}

export default function FilterSection({ 
  title, 
  children, 
  sectionKey,
  expanded,
  onToggle,
}: FilterSectionProps) {
  const theme = useTheme();

  return (
    <Accordion
      expanded={expanded}
      onChange={onToggle}
      TransitionProps={{ unmountOnExit: false }}
      sx={(theme)=>({
        boxShadow: 'none',
        border: `1px solid ${theme.palette.divider}`,
        '&:before': { display: 'none' },
        '&.Mui-expanded': {
          margin: 0,
        },
      })}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        sx={{
          minHeight: 48,
          '&.Mui-expanded': {
            minHeight: 48,
          },
          '& .MuiAccordionSummary-content': {
            margin: '12px 0',
            '&.Mui-expanded': {
              margin: '12px 0',
            },
          },
        }}
      >
        <Typography variant="subtitle2" fontWeight={600}>
          {title}
        </Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ pt: 0 }}>
        {children}
      </AccordionDetails>
    </Accordion>
  );
}

