import { axiosInstance } from '@/client';
import { AxiosResponse } from 'axios';

// ============================================
// TIPOS Y ENUMS
// ============================================

/**
 * Tipos de anuncio/comunicado
 */
export type AnnouncementType = 'info' | 'warning' | 'success' | 'error' | 'update';

/**
 * Niveles de prioridad
 */
export type Priority = 'low' | 'medium' | 'high' | 'urgent';

/**
 * Estados del anuncio
 */
export type AnnouncementStatus = 'draft' | 'published' | 'archived';

// ============================================
// INTERFACES DE DATOS
// ============================================

/**
 * Archivo adjunto al anuncio
 */
export interface Attachment {
  url: string;
  name: string;
  type: string;
}

/**
 * Anuncio/Comunicado completo
 */
export interface Announcement {
  _id: string;
  title: string;
  content: string;
  type: AnnouncementType;
  priority: Priority;
  status: AnnouncementStatus;
  publishedAt?: string | null;
  expiresAt?: string | null;
  attachments: Attachment[];
  metadata: Record<string, any>;
  targetAudience?: string[]; // IDs de tenants o 'all'
  createdAt: string;
  updatedAt: string;
}

// ============================================
// INTERFACES DE REQUEST
// ============================================

/**
 * Datos para crear un nuevo anuncio
 * Nota: Si attachments contiene File[], se debe usar FormData
 */
export interface CreateAnnouncementRequest {
  title: string;
  content: string;
  type: AnnouncementType;
  priority: Priority;
  expiresAt?: string | null;
  attachments?: Attachment[] | File[]; // Puede ser array de Attachment (URLs) o File[] (archivos a subir)
  metadata?: Record<string, any>;
  targetAudience?: string[];
  status?: AnnouncementStatus;
  publishedAt?: string; // Requerido por el backend
}

/**
 * Datos para actualizar un anuncio existente
 */
export interface UpdateAnnouncementRequest extends Partial<CreateAnnouncementRequest> {}

/**
 * Parámetros para listar anuncios con filtros y paginación
 */
export interface GetAnnouncementsParams {
  page?: number;
  limit?: number;
  status?: AnnouncementStatus;
  type?: AnnouncementType;
  priority?: Priority;
  search?: string; // Búsqueda por título/contenido
}

// ============================================
// INTERFACES DE RESPONSE
// ============================================

/**
 * Respuesta de la lista de anuncios con paginación
 */
export interface AnnouncementsListResponse {
  ok: boolean;
  announcements: Announcement[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
  message?: string;
}

/**
 * Respuesta de un anuncio individual
 */
export interface AnnouncementResponse {
  ok: boolean;
  announcement: Announcement;
  message?: string;
}

/**
 * Respuesta de operaciones simples (delete, etc.)
 */
export interface SimpleResponse {
  success: boolean;
  message?: string;
}

// ============================================
// FUNCIONES DE SERVICIO
// ============================================

/**
 * Obtiene la lista de anuncios con paginación y filtros opcionales
 * @param params - Parámetros de paginación y filtros
 * @returns Promise con la lista de anuncios y datos de paginación
 */
export const getAllAnnouncements = async (
  params?: GetAnnouncementsParams
): Promise<AxiosResponse<AnnouncementsListResponse>> => {
  const requestParams = {
    page: params?.page ?? 0,
    limit: params?.limit ?? 10,
    ...(params?.status && { status: params.status }),
    ...(params?.type && { type: params.type }),
    ...(params?.priority && { priority: params.priority }),
    ...(params?.search && { search: params.search }),
  };
  
  console.log('[Announcements Service] getAllAnnouncements - Parámetros:', requestParams);
  console.log('[Announcements Service] getAllAnnouncements - Base URL:', process.env.NEXT_PUBLIC_API_URL);
  console.log('[Announcements Service] getAllAnnouncements - Endpoint: /announcements');
  console.log('[Announcements Service] getAllAnnouncements - Token disponible:', typeof window !== 'undefined' ? !!localStorage.getItem('super-admin-token') : 'N/A (SSR)');
  
  try {
    const response = await axiosInstance.get<AnnouncementsListResponse>('/announcements', {
      params: requestParams,
    });
    
    console.log('[Announcements Service] getAllAnnouncements - ✅ Respuesta exitosa:', response);
    console.log('[Announcements Service] getAllAnnouncements - Response status:', response.status);
    console.log('[Announcements Service] getAllAnnouncements - Response data:', response.data);
    
    return response;
  } catch (error: any) {
    console.error('[Announcements Service] getAllAnnouncements - ❌ Error en la petición:', error);
    console.error('[Announcements Service] getAllAnnouncements - Error message:', error?.message);
    console.error('[Announcements Service] getAllAnnouncements - Error response status:', error?.response?.status);
    console.error('[Announcements Service] getAllAnnouncements - Error response data:', error?.response?.data);
    console.error('[Announcements Service] getAllAnnouncements - URL completa intentada:', error?.config?.baseURL + '/announcements');
    throw error;
  }
};

/**
 * Obtiene un anuncio específico por su ID
 * @param id - ID del anuncio (MongoDB ObjectId)
 * @returns Promise con el anuncio solicitado
 */
export const getAnnouncementById = async (
  id: string
): Promise<AxiosResponse<AnnouncementResponse>> => {
  console.log('[Announcements Service] getAnnouncementById - ID:', id);
  console.log('[Announcements Service] getAnnouncementById - Endpoint: /announcements/:id');
  
  try {
    const response = await axiosInstance.get<AnnouncementResponse>(`/announcements/${id}`);
    console.log('[Announcements Service] getAnnouncementById - ✅ Respuesta exitosa:', response);
    return response;
  } catch (error: any) {
    console.error('[Announcements Service] getAnnouncementById - ❌ Error:', error?.response?.status, error?.response?.data);
    throw error;
  }
};

/**
 * Crea un nuevo anuncio
 * @param data - Datos del anuncio a crear
 * @returns Promise con el anuncio creado
 */
export const createAnnouncement = async (
  data: CreateAnnouncementRequest
): Promise<AxiosResponse<AnnouncementResponse>> => {
  console.log('[Announcements Service] createAnnouncement - Endpoint: POST /announcements');
  console.log('[Announcements Service] createAnnouncement - Data:', data);
  
  try {
    // Verificar si hay archivos File en attachments para usar FormData
    const fileAttachments = data.attachments?.filter(att => att instanceof File) as File[] | undefined;
    const hasFileAttachments = fileAttachments && fileAttachments.length > 0;
    
    let response: AxiosResponse<AnnouncementResponse>;
    
    if (hasFileAttachments) {
      // Usar FormData para multipart/form-data (POST: solo enviar archivos nuevos)
      console.log('[Announcements Service] createAnnouncement - Usando FormData (tiene archivos)');
      const formData = new FormData();
      
      formData.append('title', data.title);
      formData.append('content', data.content);
      formData.append('type', data.type);
      formData.append('priority', data.priority);
      formData.append('status', data.status || 'draft');
      formData.append('targetAudience', data.targetAudience?.[0] || 'all');
      formData.append('publishedAt', data.publishedAt || new Date().toISOString());
      
      if (data.expiresAt) {
        formData.append('expiresAt', data.expiresAt);
      }
      
      // Agregar archivos nuevos (POST: solo archivos, no JSON string)
      fileAttachments.forEach((file) => {
        formData.append('attachments', file);
      });
      
      if (data.metadata) {
        formData.append('metadata', JSON.stringify(data.metadata));
      }
      
      // No incluir Content-Type manualmente, el navegador lo hace automáticamente con boundary
      response = await axiosInstance.post<AnnouncementResponse>('/announcements', formData);
    } else {
      // Usar JSON normal
      console.log('[Announcements Service] createAnnouncement - Usando JSON');
      response = await axiosInstance.post<AnnouncementResponse>('/announcements', data);
    }
    
    console.log('[Announcements Service] createAnnouncement - ✅ Respuesta exitosa:', response);
    return response;
  } catch (error: any) {
    console.error('[Announcements Service] createAnnouncement - ❌ Error:', error?.response?.status, error?.response?.data);
    throw error;
  }
};

/**
 * Actualiza un anuncio existente
 * @param id - ID del anuncio a actualizar
 * @param data - Datos actualizados del anuncio
 * @returns Promise con el anuncio actualizado
 */
export const updateAnnouncement = async (
  id: string,
  data: UpdateAnnouncementRequest & { 
    existingAttachmentsToKeep?: Attachment[];
    deletedAttachments?: number[];
  }
): Promise<AxiosResponse<AnnouncementResponse>> => {
  console.log('[Announcements Service] updateAnnouncement - ID:', id);
  console.log('[Announcements Service] updateAnnouncement - Endpoint: PUT /announcements/:id');
  console.log('[Announcements Service] updateAnnouncement - Data:', data);
  
  try {
    // Separar archivos nuevos de attachments existentes
    const fileAttachments = data.attachments?.filter(att => att instanceof File) as File[] | undefined;
    const hasFileAttachments = fileAttachments && fileAttachments.length > 0;
    const existingAttachments = (data as any).existingAttachmentsToKeep || [];
    const hasExistingAttachments = existingAttachments.length > 0;
    const deletedAttachments = (data as any).deletedAttachments || [];
    const hasDeletedAttachments = deletedAttachments.length > 0;
    
    // Determinar si necesitamos FormData
    const needsFormData = hasFileAttachments || hasExistingAttachments || hasDeletedAttachments;
    
    let response: AxiosResponse<AnnouncementResponse>;
    
    if (needsFormData) {
      // Usar FormData para multipart/form-data
      console.log('[Announcements Service] updateAnnouncement - Usando FormData');
      console.log('[Announcements Service] updateAnnouncement - Archivos nuevos:', hasFileAttachments);
      console.log('[Announcements Service] updateAnnouncement - Attachments existentes a mantener:', hasExistingAttachments);
      console.log('[Announcements Service] updateAnnouncement - Attachments a eliminar (índices):', hasDeletedAttachments, deletedAttachments);
      
      const formData = new FormData();
      
      if (data.title) formData.append('title', data.title);
      if (data.content) formData.append('content', data.content);
      if (data.type) formData.append('type', data.type);
      if (data.priority) formData.append('priority', data.priority);
      if (data.status) formData.append('status', data.status);
      if (data.targetAudience && data.targetAudience.length > 0) {
        formData.append('targetAudience', data.targetAudience[0]);
      }
      if (data.publishedAt) {
        formData.append('publishedAt', data.publishedAt);
      }
      if (data.expiresAt) {
        formData.append('expiresAt', data.expiresAt);
      }
      
      // Lógica según la documentación del backend (procesado en orden):
      // 1. deletedAttachments: se procesa primero (tiene prioridad)
      // 2. attachments (JSON): attachments existentes a mantener
      // 3. attachments (File/Blob): archivos nuevos a agregar
      
      if (hasDeletedAttachments) {
        // Enviar índices de attachments a eliminar como JSON string
        formData.append('deletedAttachments', JSON.stringify(deletedAttachments));
        console.log('[Announcements Service] updateAnnouncement - deletedAttachments enviados:', deletedAttachments);
      }
      
      if (hasExistingAttachments) {
        // Enviar attachments existentes a mantener como JSON string
        formData.append('attachments', JSON.stringify(existingAttachments));
        console.log('[Announcements Service] updateAnnouncement - Attachments existentes enviados como JSON:', existingAttachments);
      }
      
      if (hasFileAttachments) {
        // Agregar archivos nuevos
        fileAttachments.forEach((file) => {
          formData.append('attachments', file);
        });
        console.log('[Announcements Service] updateAnnouncement - Archivos nuevos agregados:', fileAttachments.length);
      }
      
      if (data.metadata) {
        formData.append('metadata', JSON.stringify(data.metadata));
      }
      
      // No incluir Content-Type manualmente, el navegador lo hace automáticamente con boundary
      response = await axiosInstance.put<AnnouncementResponse>(`/announcements/${id}`, formData);
    } else {
      // Usar JSON normal (no hay archivos ni attachments ni eliminados)
      console.log('[Announcements Service] updateAnnouncement - Usando JSON');
      response = await axiosInstance.put<AnnouncementResponse>(`/announcements/${id}`, data);
    }
    
    console.log('[Announcements Service] updateAnnouncement - ✅ Respuesta exitosa:', response);
    return response;
  } catch (error: any) {
    console.error('[Announcements Service] updateAnnouncement - ❌ Error:', error?.response?.status, error?.response?.data);
    throw error;
  }
};

/**
 * Elimina un anuncio
 * @param id - ID del anuncio a eliminar
 * @returns Promise con confirmación de eliminación
 */
export const deleteAnnouncement = async (
  id: string
): Promise<AxiosResponse<SimpleResponse>> => {
  console.log('[Announcements Service] deleteAnnouncement - ID:', id);
  console.log('[Announcements Service] deleteAnnouncement - Endpoint: DELETE /announcements/:id');
  
  try {
    const response = await axiosInstance.delete<SimpleResponse>(`/announcements/${id}`);
    console.log('[Announcements Service] deleteAnnouncement - ✅ Respuesta exitosa:', response);
    return response;
  } catch (error: any) {
    console.error('[Announcements Service] deleteAnnouncement - ❌ Error:', error?.response?.status, error?.response?.data);
    throw error;
  }
};

/**
 * Publica un anuncio (cambia su estado a 'published')
 * NOTA: El backend no tiene este endpoint específico. Usar updateAnnouncement con status: 'published'
 * @param id - ID del anuncio a publicar
 * @returns Promise con el anuncio actualizado
 */
export const publishAnnouncement = async (
  id: string
): Promise<AxiosResponse<AnnouncementResponse>> => {
  console.log('[Announcements Service] publishAnnouncement - ID:', id);
  console.warn('[Announcements Service] publishAnnouncement - ⚠️ Endpoint /announcements/:id/publish no existe. Usar updateAnnouncement con status: "published"');
  // Usar updateAnnouncement en lugar del endpoint publish
  return updateAnnouncement(id, { status: 'published' });
};

/**
 * Despublica un anuncio (cambia su estado a 'draft')
 * NOTA: El backend no tiene este endpoint específico. Usar updateAnnouncement con status: 'draft'
 * @param id - ID del anuncio a despublicar
 * @returns Promise con el anuncio actualizado
 */
export const unpublishAnnouncement = async (
  id: string
): Promise<AxiosResponse<AnnouncementResponse>> => {
  console.log('[Announcements Service] unpublishAnnouncement - ID:', id);
  console.warn('[Announcements Service] unpublishAnnouncement - ⚠️ Endpoint /announcements/:id/unpublish no existe. Usar updateAnnouncement con status: "draft"');
  // Usar updateAnnouncement en lugar del endpoint unpublish
  return updateAnnouncement(id, { status: 'draft' });
};


