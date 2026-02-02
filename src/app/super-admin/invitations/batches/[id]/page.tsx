'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import InvitationBatchDetailView from '@/components/super-admin/invitations/InvitationBatchDetailView';
import { useInvitationBatchDetail } from '@/hooks/super-admin/useInvitationBatchDetail';

interface InvitationBatchDetailPageProps {
  params: {
    id: string;
  };
}

const InvitationBatchDetailPage: React.FC<InvitationBatchDetailPageProps> = ({ params }) => {
  const router = useRouter();
  const {
    batch,
    stats,
    codes,
    pagination,
    statusFilter,
    loading,
    codesLoading,
    error,
    codesError,
    pendingRevokeCode,
    isRevoking,
    loadBatch,
    loadCodes,
    handlePageChange,
    handleRowsPerPageChange,
    handleStatusFilterChange,
    openRevokeDialog,
    closeRevokeDialog,
    confirmRevoke,
  } = useInvitationBatchDetail(params.id);

  return (
    <InvitationBatchDetailView
      batch={batch}
      stats={stats}
      codes={codes}
      pagination={pagination}
      statusFilter={statusFilter}
      loading={loading}
      codesLoading={codesLoading}
      error={error}
      codesError={codesError}
      pendingRevokeCode={pendingRevokeCode}
      isRevoking={isRevoking}
      onBack={() => router.push('/super-admin/invitations')}
      onRetryBatch={loadBatch}
      onRetryCodes={loadCodes}
      onStatusFilterChange={handleStatusFilterChange}
      onPageChange={handlePageChange}
      onRowsPerPageChange={handleRowsPerPageChange}
      onOpenRevoke={openRevokeDialog}
      onCloseRevoke={closeRevokeDialog}
      onConfirmRevoke={confirmRevoke}
    />
  );
};

export default InvitationBatchDetailPage;
