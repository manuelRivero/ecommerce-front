'use client';

import React from 'react';
import {
  Box,
  Typography,
  IconButton,
  Paper,
  Chip,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  ArrowBack,
} from '@mui/icons-material';

interface MobileStepperProps {
  steps: string[];
  activeStep: number;
  onStepClick?: (step: number) => void;
  onBack?: () => void;
  isStepComplete?: (step: number) => boolean;
  showBackButton?: boolean;
}

const MobileStepper: React.FC<MobileStepperProps> = ({
  steps,
  activeStep,
  onStepClick,
  onBack,
  isStepComplete,
  showBackButton = true,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  if (!isMobile) {
    return null; // No mostrar en desktop
  }

  const currentStep = steps[activeStep];
  const canGoBack = activeStep > 0;
  const totalSteps = steps.length;



     return (
     <Box
       sx={{
         mb: 3,
         p: 2,
         borderRadius: 2,
         backgroundColor: 'grey.50',
         border: `1px solid ${theme.palette.divider}`,
       }}
     >
             <Box
         sx={{
           display: 'flex',
           alignItems: 'center',
           justifyContent: 'center',
           px: 2,
           py: 1.5,
           minHeight: 64,
           position: 'relative',
         }}
       >
         {/* Botón de retroceso */}
         {showBackButton && canGoBack && (
           <IconButton
             onClick={onBack}
             sx={{
               position: 'absolute',
               left: 8,
               color: 'primary.main',
               '&:hover': {
                 backgroundColor: 'primary.light',
                 color: 'primary.contrastText',
               },
             }}
           >
             <ArrowBack />
           </IconButton>
         )}

         {/* Información del step actual */}
         <Box
           sx={{
             display: 'flex',
             flexDirection: 'column',
             alignItems: 'center',
             textAlign: 'center',
           }}
         >
                     <Box
             sx={{
               display: 'flex',
               alignItems: 'center',
               justifyContent: 'center',
               mb: 0.5,
             }}
           >
             <Box
               sx={{
                 width: 32,
                 height: 32,
                 borderRadius: '50%',
                 backgroundColor: 'primary.main',
                 display: 'flex',
                 alignItems: 'center',
                 justifyContent: 'center',
                 color: 'white',
                 fontWeight: 600,
                 fontSize: '0.875rem',
               }}
             >
               {activeStep + 1}
             </Box>
           </Box>
          
          <Typography
            variant="body2"
            sx={{
              fontWeight: 500,
              textAlign: 'center',
              color: 'text.primary',
              fontSize: '0.875rem',
              lineHeight: 1.2,
            }}
          >
            {currentStep}
          </Typography>
        </Box>

        
      </Box>

      {/* Barra de progreso */}
      <Box
        sx={{
          width: '100%',
          height: 3,
          backgroundColor: 'grey.200',
          position: 'relative',
        }}
      >
        <Box
          sx={{
            height: '100%',
            backgroundColor: 'primary.main',
            transition: 'width 0.3s ease',
            width: `${((activeStep + 1) / totalSteps) * 100}%`,
          }}
                 />
       </Box>
     </Box>
   );
 };

export default MobileStepper;
