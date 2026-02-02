import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  getInvitationBatchById,
  getInvitationBatchCodes,
  InvitationBatch,
  InvitationBatchStats,
  InvitationCode,
  InvitationCodeStatus,
  Pagination,
  revokeInvitationCode,
} from '@/client';

const DEFAULT_PAGINATION: Pagination = {
  page: 0,
  limit: 50,
  total: 0,
  pages: 0,
};

export const useInvitationBatchDetail = (batchId: string) => {
  const [batch, setBatch] = useState<InvitationBatch | null>(null);
  const [stats, setStats] = useState<InvitationBatchStats | null>(null);
  const [codes, setCodes] = useState<InvitationCode[]>([]);
  const [pagination, setPagination] = useState<Pagination>(DEFAULT_PAGINATION);
  const [statusFilter, setStatusFilter] = useState<InvitationCodeStatus | 'all'>('all');
  const [loading, setLoading] = useState(true);
  const [codesLoading, setCodesLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [codesError, setCodesError] = useState<string | null>(null);
  const [pendingRevokeCode, setPendingRevokeCode] = useState<string | null>(null);
  const [isRevoking, setIsRevoking] = useState(false);

  const loadBatch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getInvitationBatchById(batchId);
      setBatch(response.data.batch);
      setStats(response.data.stats);
    } catch (err) {
      console.error('Error cargando lote:', err);
      setError('No se pudo cargar el lote.');
    } finally {
      setLoading(false);
    }
  }, [batchId]);

  const loadCodes = useCallback(async () => {
    setCodesLoading(true);
    setCodesError(null);
    try {
      const response = await getInvitationBatchCodes(batchId, {
        page: pagination.page,
        limit: pagination.limit,
        status: statusFilter === 'all' ? undefined : statusFilter,
      });
      setCodes(response.data.codes);
      setPagination(response.data.pagination);
    } catch (err) {
      console.error('Error cargando códigos:', err);
      setCodesError('No se pudieron cargar los códigos.');
    } finally {
      setCodesLoading(false);
    }
  }, [batchId, pagination.page, pagination.limit, statusFilter]);

  useEffect(() => {
    loadBatch();
  }, [loadBatch]);

  useEffect(() => {
    loadCodes();
  }, [loadCodes]);

  const handlePageChange = useCallback((_event: unknown, page: number) => {
    setPagination((prev) => ({ ...prev, page }));
  }, []);

  const handleRowsPerPageChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const nextLimit = parseInt(event.target.value, 10);
    setPagination((prev) => ({ ...prev, limit: nextLimit, page: 0 }));
  }, []);

  const handleStatusFilterChange = useCallback((value: InvitationCodeStatus | 'all') => {
    setStatusFilter(value);
    setPagination((prev) => ({ ...prev, page: 0 }));
  }, []);

  const openRevokeDialog = useCallback((code: string) => {
    setPendingRevokeCode(code);
  }, []);

  const closeRevokeDialog = useCallback(() => {
    setPendingRevokeCode(null);
  }, []);

  const confirmRevoke = useCallback(async () => {
    if (!pendingRevokeCode) {
      return;
    }

    setIsRevoking(true);
    try {
      await revokeInvitationCode(pendingRevokeCode);
      setCodes((prev) =>
        prev.map((item) =>
          item.code === pendingRevokeCode ? { ...item, status: 'revoked' } : item,
        ),
      );
      setStats((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          unused: Math.max(prev.unused - 1, 0),
          revoked: prev.revoked + 1,
        };
      });
      setPendingRevokeCode(null);
    } catch (err) {
      console.error('Error revocando código:', err);
      setCodesError('No se pudo revocar el código seleccionado.');
    } finally {
      setIsRevoking(false);
    }
  }, [pendingRevokeCode]);

  const hasCodes = useMemo(() => codes.length > 0, [codes.length]);

  return {
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
    hasCodes,
    loadBatch,
    loadCodes,
    handlePageChange,
    handleRowsPerPageChange,
    handleStatusFilterChange,
    openRevokeDialog,
    closeRevokeDialog,
    confirmRevoke,
  };
};
