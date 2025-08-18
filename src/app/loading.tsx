import { Box, CircularProgress, Typography } from '@mui/material';

export default function Loading() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
      }}
    >
      <CircularProgress 
        size={60} 
        thickness={4}
        sx={{
          color: 'primary.main',
          mb: 3,
        }}
      />
      <Typography
        variant="h6"
        color="text.secondary"
        sx={{
          fontWeight: 500,
          letterSpacing: '0.5px',
        }}
      >
        Cargando...
      </Typography>
    </Box>
  );
} 