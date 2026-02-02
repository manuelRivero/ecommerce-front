'use client';

import React from 'react';
import { Box, Button, Container, Stack, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useInvitationBatches } from '@/hooks/super-admin/useInvitationBatches';
import InvitationBatchCreateForm from '@/components/super-admin/invitations/InvitationBatchCreateForm';

const CreateInvitationBatchPage = () => {
  const router = useRouter();
  const { addBatch } = useInvitationBatches();
  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Stack spacing={3}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              Crear lote de invitaciones
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Genera códigos para asignar planes a nuevos tenants.
            </Typography>
          </Box>
          <Button variant="outlined" onClick={() => router.push('/super-admin/invitations')}>
            Volver al listado
          </Button>
        </Box>

        <InvitationBatchCreateForm
          onBatchCreated={addBatch}
        />
      </Stack>
    </Container>
  );
};

export default CreateInvitationBatchPage;
