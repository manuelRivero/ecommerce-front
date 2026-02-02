import { useCallback, useState } from 'react';
import {
  createInvitationBatch,
  CreateInvitationBatchRequest,
  InvitationBatch,
} from '@/client';

interface UseInvitationBatchCreationOptions {
  onBatchCreated?: (batch: InvitationBatch) => void;
}

export const useInvitationBatchCreation = ({ onBatchCreated }: UseInvitationBatchCreationOptions) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createBatch = useCallback(
    async (payload: CreateInvitationBatchRequest): Promise<InvitationBatch> => {
      setIsSubmitting(true);
      setError(null);
      try {
        const response = await createInvitationBatch(payload);
        onBatchCreated?.(response.data.batch);
        return response.data.batch;
      } catch (err) {
        console.error('Error creando lote:', err);
        setError('No se pudo crear el lote de invitaciones.');
        throw err;
      } finally {
        setIsSubmitting(false);
      }
    },
    [onBatchCreated],
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
