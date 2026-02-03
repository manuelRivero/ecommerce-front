import { axiosInstance } from '@/client';
import { AxiosResponse } from 'axios';

export type InvitationCodeStatus = 'unused' | 'used' | 'revoked' | 'expired';

export interface InvitationBatch {
  _id: string;
  planId: string;
  planName?: string;
  quantity: number;
  prefix?: string;
  expiresAt?: string | null;
  createdBy?: string;
  metadata?: Record<string, any> | null;
  createdAt?: string;
  updatedAt?: string;
  counts?: {
    unused: number;
    used: number;
    revoked: number;
    expired?: number;
  };
}

export interface InvitationCode {
  code: string;
  status: InvitationCodeStatus;
  planKey?: string;
  batchId?: string;
  expiresAt?: string | null;
  usedAt?: string | null;
  revokedAt?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface InvitationBatchStats {
  unused: number;
  used: number;
  revoked: number;
  expired: number;
}

export interface InvitationBatchStatsEntry {
  _id: InvitationCodeStatus;
  count: number;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

export interface CreateInvitationBatchRequest {
  planId: string;
  quantity: number;
  prefix?: string;
  expiresAt?: string;
  metadata?: Record<string, any>;
}

export interface CreateInvitationBatchResponse {
  batch: InvitationBatch;
  codes: InvitationCode[];
}

export interface InvitationBatchDetailResponse {
  batch: InvitationBatch;
  stats?: InvitationBatchStats | InvitationBatchStatsEntry[];
}

export interface InvitationBatchCodesResponse {
  codes: InvitationCode[];
  pagination: Pagination;
}

export interface InvitationBatchListPagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface InvitationBatchListResponse {
  ok: boolean;
  batches: InvitationBatch[];
  pagination: InvitationBatchListPagination;
}

export const createInvitationBatch = async (
  payload: CreateInvitationBatchRequest,
): Promise<AxiosResponse<CreateInvitationBatchResponse>> => {
  return axiosInstance.post<CreateInvitationBatchResponse>('/api/invitation-codes/batches', payload);
};

export const getInvitationBatchById = async (
  batchId: string,
): Promise<AxiosResponse<InvitationBatchDetailResponse>> => {
  return axiosInstance.get<InvitationBatchDetailResponse>(`/invitation-codes/batches/${batchId}`);
};

export const getInvitationBatches = async (params?: {
  page?: number;
  limit?: number;
}): Promise<AxiosResponse<InvitationBatchListResponse>> => {
  return axiosInstance.get<InvitationBatchListResponse>('/invitation-codes/batches', { params });
};

export const getInvitationBatchCodes = async (
  batchId: string,
  params: { page?: number; limit?: number; status?: InvitationCodeStatus },
): Promise<AxiosResponse<InvitationBatchCodesResponse>> => {
  return axiosInstance.get<InvitationBatchCodesResponse>(
    `/invitation-codes/batches/${batchId}/codes`,
    { params },
  );
};

export const revokeInvitationCode = async (
  code: string,
): Promise<AxiosResponse<{ code: InvitationCode }>> => {
  return axiosInstance.patch<{ code: InvitationCode }>(
    `/invitation-codes/codes/${code}/revoke`,
  );
};
