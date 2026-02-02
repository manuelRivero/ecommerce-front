import { useCallback, useEffect, useState } from 'react';

const INVITATION_REQUIRED_ENDPOINT = '/tenant/invitation-required';
const INVITATION_VALIDATE_ENDPOINT = '/tenant/validate-invitation-code';

const buildApiUrl = (path: string) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!baseUrl) {
    throw new Error('NEXT_PUBLIC_API_URL no está configurado');
  }

  return `${baseUrl}${path}`;
};

export const useInvitationGate = () => {
  const [isCheckingAccess, setIsCheckingAccess] = useState(true);
  const [isInvitationRequired, setIsInvitationRequired] = useState(false);
  const [hasInvitationAccess, setHasInvitationAccess] = useState(false);
  const [inviteCode, setInviteCode] = useState('');
  const [checkError, setCheckError] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [isValidating, setIsValidating] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const checkInvitationRequirement = useCallback(async () => {
    try {
      setIsCheckingAccess(true);
      setCheckError(null);
      const response = await fetch(buildApiUrl(INVITATION_REQUIRED_ENDPOINT), {
        method: 'GET',
        cache: 'no-store',
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || 'No se pudo verificar el acceso');
      }

      setIsInvitationRequired(Boolean(data?.required));
    } catch (error: any) {
      console.error('Error checking invitation requirement:', error);
      setCheckError(error?.message || 'No se pudo verificar el acceso');
      setIsInvitationRequired(true);
    } finally {
      setIsCheckingAccess(false);
    }
  }, []);

  useEffect(() => {
    checkInvitationRequirement();
  }, [checkInvitationRequirement]);

  const handleInviteCodeChange = (value: string) => {
    setInviteCode(value);
    if (validationError) {
      setValidationError(null);
    }
  };

  const handleValidateCode = async () => {
    const trimmedCode = inviteCode.trim();
    if (!trimmedCode) {
      setValidationError('Ingresa tu código de invitación');
      return;
    }

    try {
      setIsValidating(true);
      setValidationError(null);

      const response = await fetch(buildApiUrl(INVITATION_VALIDATE_ENDPOINT), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code: trimmedCode }),
      });
      const data = await response.json();

      if (!response.ok || !data?.valid) {
        throw new Error(data?.message || 'El código ingresado no es válido');
      }

      setShowSuccessModal(true);
    } catch (error: any) {
      console.error('Error validating invitation code:', error);
      setValidationError(error?.message || 'No se pudo validar el código');
    } finally {
      setIsValidating(false);
    }
  };

  const handleProceedToForm = () => {
    setShowSuccessModal(false);
    setHasInvitationAccess(true);
  };

  const shouldShowGate = !isCheckingAccess && isInvitationRequired && !hasInvitationAccess;

  return {
    isCheckingAccess,
    shouldShowGate,
    inviteCode,
    checkError,
    validationError,
    isValidating,
    showSuccessModal,
    handleInviteCodeChange,
    handleValidateCode,
    handleProceedToForm,
    handleRetryCheck: checkInvitationRequirement,
  };
};
