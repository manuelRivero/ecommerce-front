import { useCallback, useState } from 'react';
import { CreateInvitationBatchRequest, InvitationBatch, validatePlanKey } from '@/client';

const PLAN_KEY_REGEX = /^[a-z0-9_-]+$/;

interface PlanKeyValidationState {
  isChecking: boolean;
  available: boolean | null;
  normalized: string | null;
  error: string | null;
}

interface UseInvitationBatchFormStateOptions {
  onCreateBatch: (payload: CreateInvitationBatchRequest) => Promise<InvitationBatch>;
  onClearExternalError?: () => void;
}

export const useInvitationBatchFormState = ({
  onCreateBatch,
  onClearExternalError,
}: UseInvitationBatchFormStateOptions) => {
  const [planKey, setPlanKey] = useState('');
  const [quantity, setQuantity] = useState(100);
  const [prefix, setPrefix] = useState('');
  const [expiresAt, setExpiresAt] = useState('');
  const [metadata, setMetadata] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [createdBatch, setCreatedBatch] = useState<InvitationBatch | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [planKeyValidation, setPlanKeyValidation] = useState<PlanKeyValidationState>({
    isChecking: false,
    available: null,
    normalized: null,
    error: null,
  });

  const resetErrors = useCallback(() => {
    setFormError(null);
    setFieldErrors({});
  }, []);

  const handlePlanKeyChange = useCallback(
    (value: string) => {
      setPlanKey(value.toLowerCase());
      setPlanKeyValidation((prev) => ({ ...prev, error: null, available: null, normalized: null }));
      setFieldErrors((prev) => ({ ...prev, planKey: '' }));
      onClearExternalError?.();
    },
    [onClearExternalError],
  );

  const handleQuantityChange = useCallback(
    (value: string) => {
      const parsed = Number(value);
      setQuantity(Number.isNaN(parsed) ? 0 : parsed);
      setFieldErrors((prev) => ({ ...prev, quantity: '' }));
      onClearExternalError?.();
    },
    [onClearExternalError],
  );

  const handlePrefixChange = useCallback(
    (value: string) => {
      setPrefix(value.toUpperCase());
      onClearExternalError?.();
    },
    [onClearExternalError],
  );

  const handleExpiresAtChange = useCallback(
    (value: string) => {
      setExpiresAt(value);
      onClearExternalError?.();
    },
    [onClearExternalError],
  );

  const handleMetadataChange = useCallback(
    (value: string) => {
      setMetadata(value);
      setFieldErrors((prev) => ({ ...prev, metadata: '' }));
      onClearExternalError?.();
    },
    [onClearExternalError],
  );

  const handleValidatePlanKey = useCallback(async () => {
    const trimmed = planKey.trim().toLowerCase();
    if (!trimmed) {
      setPlanKeyValidation({
        isChecking: false,
        available: null,
        normalized: null,
        error: 'Ingresa un planKey para validar.',
      });
      return;
    }

    if (!PLAN_KEY_REGEX.test(trimmed)) {
      setPlanKeyValidation({
        isChecking: false,
        available: null,
        normalized: null,
        error: 'Formato inválido. Usa [a-z0-9_-].',
      });
      return;
    }

    setPlanKeyValidation((prev) => ({ ...prev, isChecking: true, error: null }));
    try {
      const response = await validatePlanKey(trimmed);
      setPlanKeyValidation({
        isChecking: false,
        available: response.data.available,
        normalized: response.data.planKey,
        error: null,
      });
    } catch (err) {
      console.error('Error validando planKey:', err);
      setPlanKeyValidation({
        isChecking: false,
        available: null,
        normalized: null,
        error: 'No se pudo validar el planKey.',
      });
    }
  }, [planKey]);

  const validateFields = useCallback(() => {
    const nextErrors: Record<string, string> = {};
    const trimmedPlanKey = planKey.trim().toLowerCase();

    if (!trimmedPlanKey) {
      nextErrors.planKey = 'El planKey es obligatorio.';
    } else if (!PLAN_KEY_REGEX.test(trimmedPlanKey)) {
      nextErrors.planKey = 'Formato inválido. Usa [a-z0-9_-].';
    }

    if (!quantity || quantity <= 0) {
      nextErrors.quantity = 'La cantidad debe ser mayor a 0.';
    } else if (quantity > 5000) {
      nextErrors.quantity = 'La cantidad máxima es 5000.';
    }

    if (metadata.trim()) {
      try {
        JSON.parse(metadata);
      } catch (error) {
        nextErrors.metadata = 'El metadata debe ser un JSON válido.';
      }
    }

    setFieldErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }, [metadata, planKey, quantity]);

  const normalizePayload = useCallback((): CreateInvitationBatchRequest | null => {
    const trimmedPlanKey = planKey.trim().toLowerCase();
    if (!trimmedPlanKey) {
      return null;
    }

    const payload: CreateInvitationBatchRequest = {
      planKey: trimmedPlanKey,
      quantity,
    };

    if (prefix.trim()) {
      payload.prefix = prefix.trim().toUpperCase();
    }

    if (expiresAt) {
      const date = new Date(expiresAt);
      if (!Number.isNaN(date.getTime())) {
        payload.expiresAt = date.toISOString();
      }
    }

    if (metadata.trim()) {
      payload.metadata = JSON.parse(metadata);
    }

    return payload;
  }, [expiresAt, metadata, planKey, prefix, quantity]);

  const handleSubmit = useCallback(async () => {
    resetErrors();
    if (!validateFields()) {
      return;
    }

    const payload = normalizePayload();
    if (!payload) {
      setFormError('Completa los campos requeridos.');
      return;
    }

    try {
      const batch = await onCreateBatch(payload);
      setCreatedBatch(batch);
      setShowSuccessModal(true);
    } catch {
      // El error externo ya se gestiona en el hook orquestador
    }
  }, [normalizePayload, onCreateBatch, resetErrors, validateFields]);

  const resetForm = useCallback(() => {
    setPlanKey('');
    setQuantity(100);
    setPrefix('');
    setExpiresAt('');
    setMetadata('');
    resetErrors();
    setPlanKeyValidation({
      isChecking: false,
      available: null,
      normalized: null,
      error: null,
    });
    onClearExternalError?.();
  }, [onClearExternalError, resetErrors]);

  const closeSuccessModal = useCallback(() => {
    setShowSuccessModal(false);
  }, []);

  return {
    planKey,
    quantity,
    prefix,
    expiresAt,
    metadata,
    formError,
    fieldErrors,
    createdBatch,
    showSuccessModal,
    planKeyValidation,
    handlePlanKeyChange,
    handleQuantityChange,
    handlePrefixChange,
    handleExpiresAtChange,
    handleMetadataChange,
    handleValidatePlanKey,
    handleSubmit,
    resetForm,
    closeSuccessModal,
  };
};
