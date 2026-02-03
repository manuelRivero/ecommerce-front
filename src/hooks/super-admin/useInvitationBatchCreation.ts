import { useCallback, useState } from 'react';
import {
  createInvitationBatch,
  CreateInvitationBatchRequest,
  InvitationBatch,
} from '@/client';

export const useInvitationBatchCreation = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createBatch = useCallback(
    async (payload: CreateInvitationBatchRequest): Promise<InvitationBatch> => {
      setIsSubmitting(true);
      setError(null);
      try {
        const response = await createInvitationBatch(payload);
        return response.data.batch;
      } catch (err) {
        console.error('Error creando lote:', err);
        setError('No se pudo crear el lote de invitaciones.');
        throw err;
      } finally {
        setIsSubmitting(false);
      }
    },
    [],
  );

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    isSubmitting,
    error,
    createBatch,
    clearError,
  };
};
