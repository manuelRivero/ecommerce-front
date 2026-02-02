'use client';

import React from 'react';
import { Alert, Box, Button, Container, Stack, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useInvitationBatches } from '@/hooks/super-admin/useInvitationBatches';
import InvitationBatchesTable from '@/components/super-admin/invitations/InvitationBatchesTable';

const InvitationsPage = () => {
  const router = useRouter();
  const {
    batches,
    isLoading,
    error,
    pagination,
    setPage,
    setLimit,
  } = useInvitationBatches();

  const handleViewBatch = (batchId: string) => {
    router.push(`/super-admin/invitations/batches/${batchId}`);
  };

  const handlePageChange = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextLimit = parseInt(event.target.value, 10);
    setLimit(nextLimit);
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Stack spacing={3}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            Invitaciones
          </Typography>
          <Button
            variant="contained"
            onClick={() => router.push('/super-admin/invitations/create')}
          >
            Crear lote
          </Button>
        </Box>
        <Typography variant="body1" color="text.secondary">
          Administra lotes y códigos de invitación para nuevos tenants.
        </Typography>

        {error && <Alert severity="warning">{error}</Alert>}

        <InvitationBatchesTable
          batches={batches}
          isLoading={isLoading}
          pagination={pagination}
          onViewBatch={handleViewBatch}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
        />
      </Stack>
    </Container>
  );
};

export default InvitationsPage;
