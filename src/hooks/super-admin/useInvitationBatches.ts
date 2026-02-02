import { useCallback, useEffect, useState } from 'react';
import { getInvitationBatches, InvitationBatch, InvitationBatchListPagination } from '@/client';

const DEFAULT_PAGINATION: InvitationBatchListPagination = {
  total: 0,
  page: 0,
  limit: 20,
  totalPages: 0,
};

export const useInvitationBatches = () => {
  const [batches, setBatches] = useState<InvitationBatch[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<InvitationBatchListPagination>(DEFAULT_PAGINATION);

  const loadBatches = useCallback(
    async (page = pagination.page, limit = pagination.limit) => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await getInvitationBatches({ page, limit });
        setBatches(response.data.batches);
        setPagination(response.data.pagination);
      } catch (err) {
        console.error('Error cargando lotes:', err);
        setError('No se pudieron cargar los lotes.');
      } finally {
        setIsLoading(false);
      }
    },
    [pagination.limit, pagination.page],
  );

  useEffect(() => {
    loadBatches(pagination.page, pagination.limit);
  }, [loadBatches, pagination.page, pagination.limit]);

  const setPage = useCallback((page: number) => {
    setPagination((prev) => ({ ...prev, page }));
  }, []);

  const setLimit = useCallback((limit: number) => {
    setPagination((prev) => ({ ...prev, limit, page: 0 }));
  }, []);

  return {
    batches,
    isLoading,
    error,
    pagination,
    loadBatches,
    setPage,
    setLimit,
  };
};
