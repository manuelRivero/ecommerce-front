'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Divider,
  IconButton,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Chip,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import DeleteIcon from '@mui/icons-material/Delete';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { 
  getAnnouncementById, 
  createAnnouncement, 
  updateAnnouncement,
  Announcement,
  CreateAnnouncementRequest,
  AnnouncementType,
  Priority,
  AnnouncementStatus,
  Attachment
} from '@/client';

interface AnnouncementFormData {
  title: string;
  content: string;
  type: AnnouncementType;
  priority: Priority;
  status: AnnouncementStatus;
  expiresAt: string;
}

const defaultValues: AnnouncementFormData = {
  title: '',
  content: '',
  type: 'info',
  priority: 'medium',
  status: 'draft',
  expiresAt: '',
};

export default function CreateAnnouncementPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const announcementId = searchParams.get('id');
  const isEditing = !!announcementId;

  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(isEditing);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [submitError, setSubmitError] = useState<string>('');
  
  // Estado para manejar attachments
  const [existingAttachments, setExistingAttachments] = useState<Attachment[]>([]);
  const [originalAttachments, setOriginalAttachments] = useState<Attachment[]>([]); // Para rastrear índices originales
  const [deletedAttachmentIndices, setDeletedAttachmentIndices] = useState<number[]>([]); // Índices de attachments eliminados
  const [newFiles, setNewFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<Map<number, string>>(new Map());

  const { control, handleSubmit, reset, formState: { errors } } = useForm<AnnouncementFormData>({
    defaultValues,
  });

  // Cargar datos del anuncio si está editando
  useEffect(() => {
    if (isEditing && announcementId) {
      loadAnnouncementData(announcementId);
    }
  }, [isEditing, announcementId]);

  const loadAnnouncementData = async (id: string) => {
    try {
      console.log('[CreateAnnouncement] loadAnnouncementData - Cargando anuncio con ID:', id);
      setLoading(true);
      const response = await getAnnouncementById(id);
      console.log('[CreateAnnouncement] loadAnnouncementData - Respuesta completa:', response);
      console.log('[CreateAnnouncement] loadAnnouncementData - Response data:', response.data);
      console.log('[CreateAnnouncement] loadAnnouncementData - Response data.ok:', response.data.ok);
      console.log('[CreateAnnouncement] loadAnnouncementData - Response data.announcement:', response.data.announcement);
      
      // El backend devuelve: { ok: true, announcement: {...} }
      const announcement = response.data.announcement;
      console.log('[CreateAnnouncement] loadAnnouncementData - Anuncio extraído:', announcement);
      
      if (!announcement) {
        console.error('[CreateAnnouncement] loadAnnouncementData - No se encontró el anuncio en response.data.announcement');
        console.error('[CreateAnnouncement] loadAnnouncementData - Response.data completo:', response.data);
        setSubmitError('No se pudo cargar el anuncio. Estructura de respuesta inválida.');
        setShowErrorModal(true);
        return;
      }
      
      // Convertir fecha de expiración a formato input datetime-local
      const expiresAtDate = announcement.expiresAt 
        ? new Date(announcement.expiresAt).toISOString().slice(0, 16)
        : '';
      
      console.log('[CreateAnnouncement] loadAnnouncementData - Datos para el formulario:', {
        title: announcement.title,
        content: announcement.content?.substring(0, 50) + '...',
        type: announcement.type,
        priority: announcement.priority,
        status: announcement.status,
        expiresAt: expiresAtDate,
      });
      
      reset({
        title: announcement.title || '',
        content: announcement.content || '',
        type: announcement.type || 'info',
        priority: announcement.priority || 'medium',
        status: announcement.status || 'draft',
        expiresAt: expiresAtDate,
      });
      
      // Cargar attachments existentes
      if (announcement.attachments && announcement.attachments.length > 0) {
        setExistingAttachments(announcement.attachments);
        setOriginalAttachments(announcement.attachments); // Guardar originales para rastrear índices
        console.log('[CreateAnnouncement] loadAnnouncementData - Attachments cargados:', announcement.attachments);
      } else {
        setExistingAttachments([]);
        setOriginalAttachments([]);
      }
      setNewFiles([]);
      setDeletedAttachmentIndices([]); // Limpiar índices eliminados
      
      console.log('[CreateAnnouncement] loadAnnouncementData - ✅ Formulario actualizado correctamente');
    } catch (error: any) {
      console.error('[CreateAnnouncement] loadAnnouncementData - ❌ Error capturado:', error);
      console.error('[CreateAnnouncement] loadAnnouncementData - Error message:', error?.message);
      console.error('[CreateAnnouncement] loadAnnouncementData - Error response:', error?.response);
      console.error('[CreateAnnouncement] loadAnnouncementData - Error response status:', error?.response?.status);
      console.error('[CreateAnnouncement] loadAnnouncementData - Error response data:', error?.response?.data);
      console.error('[CreateAnnouncement] loadAnnouncementData - Error stack:', error?.stack);
      setSubmitError(error?.response?.data?.message || error?.message || 'Error al cargar el anuncio. Por favor, intenta de nuevo.');
      setShowErrorModal(true);
    } finally {
      setLoading(false);
    }
  };

  // Funciones para manejar attachments
  const isImageFile = (file: File | Attachment): boolean => {
    if (file instanceof File) {
      return file.type.startsWith('image/');
    } else {
      // Attachment tiene type (string)
      return file.type?.startsWith('image/') || file.url?.match(/\.(jpg|jpeg|png|gif|webp|bmp|svg)$/i) !== null;
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const fileArray = Array.from(files);
      setNewFiles(prev => {
        const updatedFiles = [...prev, ...fileArray];
        
        // Generar previews para imágenes
        fileArray.forEach((file, index) => {
          if (isImageFile(file)) {
            const fileIndex = prev.length + index;
            const previewUrl = URL.createObjectURL(file);
            setImagePreviews(prevPreviews => {
              const newPreviews = new Map(prevPreviews);
              newPreviews.set(fileIndex, previewUrl);
              return newPreviews;
            });
          }
        });
        
        return updatedFiles;
      });
    }
    // Reset input para permitir seleccionar el mismo archivo otra vez
    event.target.value = '';
  };

  const removeExistingAttachment = (index: number) => {
    // Encontrar el índice original del attachment en el array original
    const attachmentToRemove = existingAttachments[index];
    const originalIndex = originalAttachments.findIndex(
      att => att.url === attachmentToRemove.url && att.name === attachmentToRemove.name
    );
    
    if (originalIndex !== -1) {
      // Agregar el índice original a la lista de eliminados
      setDeletedAttachmentIndices(prev => {
        if (!prev.includes(originalIndex)) {
          return [...prev, originalIndex].sort((a, b) => a - b);
        }
        return prev;
      });
    }
    
    // Remover del array actual
    setExistingAttachments(prev => prev.filter((_, i) => i !== index));
  };

  const removeNewFile = (index: number) => {
    setNewFiles(prev => {
      // Limpiar preview si existe
      const previewUrl = imagePreviews.get(index);
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
        setImagePreviews(prevPreviews => {
          const newPreviews = new Map(prevPreviews);
          newPreviews.delete(index);
          // Reindexar previews después de eliminar
          const reindexedPreviews = new Map<number, string>();
          prev.forEach((file, fileIndex) => {
            if (fileIndex < index) {
              const existingPreview = prevPreviews.get(fileIndex);
              if (existingPreview) {
                reindexedPreviews.set(fileIndex, existingPreview);
              }
            } else if (fileIndex > index) {
              const existingPreview = prevPreviews.get(fileIndex);
              if (existingPreview) {
                reindexedPreviews.set(fileIndex - 1, existingPreview);
              }
            }
          });
          return reindexedPreviews;
        });
      }
      return prev.filter((_, i) => i !== index);
    });
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  // Limpiar previews cuando el componente se desmonte
  useEffect(() => {
    return () => {
      imagePreviews.forEach(previewUrl => {
        URL.revokeObjectURL(previewUrl);
      });
    };
  }, []);

  const onSubmit = async (data: AnnouncementFormData) => {
    try {
      setSubmitting(true);
      setSubmitError('');
      
      // Combinar attachments: si hay nuevos archivos File[], se usará FormData
      // Si solo hay attachments existentes, se mantienen en el objeto
      const attachments = newFiles.length > 0 ? newFiles : 
                         (existingAttachments.length > 0 ? existingAttachments : undefined);
      
      const announcementData: CreateAnnouncementRequest = {
        title: data.title,
        content: data.content,
        type: data.type,
        priority: data.priority,
        status: data.status,
        expiresAt: data.expiresAt ? new Date(data.expiresAt).toISOString() : null,
        attachments: attachments,
      };
      
      console.log('[CreateAnnouncement] onSubmit - Datos a enviar:', {
        ...announcementData,
        attachments: attachments?.length || 0,
        hasNewFiles: newFiles.length > 0,
        existingAttachmentsCount: existingAttachments.length,
      });
      
      if (isEditing && announcementId) {
        // ACTUALIZACIÓN (PUT)
        // Según la documentación:
        // - deletedAttachments: array de índices de attachments a eliminar (tiene prioridad, se procesa primero)
        // - attachments (JSON): array de attachments existentes a mantener (opcional)
        // - attachments (File/Blob): archivos nuevos a agregar
        const updateData = {
          ...announcementData,
          existingAttachmentsToKeep: existingAttachments.length > 0 ? existingAttachments : undefined,
          deletedAttachments: deletedAttachmentIndices.length > 0 ? deletedAttachmentIndices : undefined,
        };
        
        console.log('[CreateAnnouncement] onSubmit - Datos para actualización:', {
          ...updateData,
          newFilesCount: newFiles.length,
          existingAttachmentsToKeepCount: existingAttachments.length,
          deletedAttachmentsCount: deletedAttachmentIndices.length,
          deletedAttachmentIndices: deletedAttachmentIndices,
        });
        
        const response = await updateAnnouncement(announcementId, updateData as any);
        
        if (response.data.ok) {
          setShowSuccessModal(true);
          // Limpiar archivos nuevos después de guardar
          setNewFiles([]);
          setDeletedAttachmentIndices([]); // Limpiar índices eliminados
        } else {
          setSubmitError(response.data.message || 'Error al actualizar el anuncio.');
          setShowErrorModal(true);
        }
      } else {
        // CREACIÓN (POST)
        // Según la documentación: solo enviar archivos nuevos como File/Blob en attachments
        
        const announcementData: CreateAnnouncementRequest = {
          title: data.title,
          content: data.content,
          type: data.type,
          priority: data.priority,
          status: data.status,
          expiresAt: data.expiresAt ? new Date(data.expiresAt).toISOString() : null,
          // Para creación, solo enviar archivos nuevos
          attachments: newFiles.length > 0 ? newFiles : undefined,
        };
        
        console.log('[CreateAnnouncement] onSubmit - Datos para creación:', {
          ...announcementData,
          newFilesCount: newFiles.length,
        });
        
        const response = await createAnnouncement(announcementData);
        
        if (response.data.ok) {
          setShowSuccessModal(true);
          reset(defaultValues);
          // Limpiar previews antes de limpiar archivos
          imagePreviews.forEach(previewUrl => URL.revokeObjectURL(previewUrl));
          setImagePreviews(new Map());
          setExistingAttachments([]);
          setNewFiles([]);
        } else {
          setSubmitError(response.data.message || 'Error al crear el anuncio.');
          setShowErrorModal(true);
        }
      }
    } catch (error: any) {
      console.error('Error saving announcement:', error);
      setSubmitError(`Error al ${isEditing ? 'actualizar' : 'crear'} el anuncio. Por favor, intenta de nuevo.`);
      setShowErrorModal(true);
    } finally {
      setSubmitting(false);
    }
  };

  const handleSuccessClose = () => {
    setShowSuccessModal(false);
    setExistingAttachments([]);
    setOriginalAttachments([]);
    setDeletedAttachmentIndices([]);
    setNewFiles([]);
    if (isEditing) {
      router.push('/super-admin/announcements');
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 1200, margin: '0 auto' }}>
      <Typography variant="h4" gutterBottom>
        {isEditing ? 'Editar Anuncio' : 'Crear Nuevo Anuncio'}
      </Typography>
      
      <Paper sx={{ p: 3, mb: 3 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Información Básica */}
          <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
            Información Básica
          </Typography>
          <Grid container spacing={3} sx={{ mb: 3 }}>
            <Grid item xs={12}>
              <Controller
                name="title"
                control={control}
                rules={{ required: 'El título es requerido' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Título"
                    fullWidth
                    error={!!errors.title}
                    helperText={errors.title?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="content"
                control={control}
                rules={{ required: 'El contenido es requerido' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Contenido"
                    fullWidth
                    multiline
                    rows={6}
                    error={!!errors.content}
                    helperText={errors.content?.message}
                  />
                )}
              />
            </Grid>
          </Grid>

          <Divider sx={{ my: 3 }} />

          {/* Configuración */}
          <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
            Configuración
          </Typography>
          <Grid container spacing={3} sx={{ mb: 3 }}>
            <Grid item xs={12} md={4}>
              <Controller
                name="type"
                control={control}
                rules={{ required: 'El tipo es requerido' }}
                render={({ field }) => (
                  <FormControl fullWidth error={!!errors.type}>
                    <InputLabel>Tipo</InputLabel>
                    <Select {...field} label="Tipo">
                      <MenuItem value="info">Información</MenuItem>
                      <MenuItem value="warning">Advertencia</MenuItem>
                      <MenuItem value="success">Éxito</MenuItem>
                      <MenuItem value="error">Error</MenuItem>
                      <MenuItem value="update">Actualización</MenuItem>
                    </Select>
                    {errors.type && (
                      <Typography variant="caption" color="error" sx={{ mt: 1 }}>
                        {errors.type.message}
                      </Typography>
                    )}
                  </FormControl>
                )}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Controller
                name="priority"
                control={control}
                rules={{ required: 'La prioridad es requerida' }}
                render={({ field }) => (
                  <FormControl fullWidth error={!!errors.priority}>
                    <InputLabel>Prioridad</InputLabel>
                    <Select {...field} label="Prioridad">
                      <MenuItem value="low">Baja</MenuItem>
                      <MenuItem value="medium">Media</MenuItem>
                      <MenuItem value="high">Alta</MenuItem>
                      <MenuItem value="urgent">Urgente</MenuItem>
                    </Select>
                    {errors.priority && (
                      <Typography variant="caption" color="error" sx={{ mt: 1 }}>
                        {errors.priority.message}
                      </Typography>
                    )}
                  </FormControl>
                )}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Controller
                name="status"
                control={control}
                rules={{ required: 'El estado es requerido' }}
                render={({ field }) => (
                  <FormControl fullWidth error={!!errors.status}>
                    <InputLabel>Estado</InputLabel>
                    <Select {...field} label="Estado">
                      <MenuItem value="draft">Borrador</MenuItem>
                      <MenuItem value="published">Publicado</MenuItem>
                      <MenuItem value="archived">Archivado</MenuItem>
                    </Select>
                    {errors.status && (
                      <Typography variant="caption" color="error" sx={{ mt: 1 }}>
                        {errors.status.message}
                      </Typography>
                    )}
                  </FormControl>
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Controller
                name="expiresAt"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Fecha de Expiración (Opcional)"
                    type="datetime-local"
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                    }}
                    helperText="Dejar vacío para que no expire"
                  />
                )}
              />
            </Grid>
          </Grid>

          <Divider sx={{ my: 4 }} />

          {/* Attachments */}
          <Typography variant="h6" gutterBottom>
            Archivos Adjuntos
          </Typography>
          
          {/* Attachments existentes (solo en edición) */}
          {isEditing && existingAttachments.length > 0 && (
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="subtitle2" gutterBottom>
                  Archivos Adjuntos Existentes
                </Typography>
                <Grid container spacing={2}>
                  {existingAttachments.map((attachment, index) => {
                    const isImage = isImageFile(attachment);
                    return (
                      <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card
                          sx={{
                            border: '1px solid',
                            borderColor: 'divider',
                            position: 'relative',
                            height: '100%',
                          }}
                        >
                          {isImage ? (
                            <Box sx={{ position: 'relative' }}>
                              <Box
                                component="img"
                                src={attachment.url}
                                alt={attachment.name}
                                sx={{
                                  width: '100%',
                                  height: 200,
                                  objectFit: 'cover',
                                  display: 'block',
                                }}
                                onError={(e) => {
                                  // Si la imagen falla al cargar, ocultar preview
                                  (e.target as HTMLImageElement).style.display = 'none';
                                }}
                              />
                              <IconButton
                                sx={{
                                  position: 'absolute',
                                  top: 8,
                                  right: 8,
                                  bgcolor: 'rgba(255, 255, 255, 0.9)',
                                  '&:hover': {
                                    bgcolor: 'rgba(255, 255, 255, 1)',
                                  },
                                }}
                                onClick={() => removeExistingAttachment(index)}
                                color="error"
                                size="small"
                              >
                                <DeleteIcon fontSize="small" />
                              </IconButton>
                              <Box
                                sx={{
                                  position: 'absolute',
                                  bottom: 8,
                                  left: 8,
                                  right: 8,
                                  bgcolor: 'rgba(0, 0, 0, 0.7)',
                                  color: 'white',
                                  px: 1,
                                  py: 0.5,
                                  borderRadius: 1,
                                }}
                              >
                                <Typography variant="caption" sx={{ display: 'block' }}>
                                  {attachment.name}
                                </Typography>
                                {attachment.type && (
                                  <Typography variant="caption" sx={{ opacity: 0.8 }}>
                                    {attachment.type}
                                  </Typography>
                                )}
                              </Box>
                            </Box>
                          ) : (
                            <CardContent>
                              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                                <InsertDriveFileIcon sx={{ color: 'primary.main', mt: 0.5 }} />
                                <Box sx={{ flex: 1 }}>
                                  <Typography variant="body2" fontWeight="medium" gutterBottom>
                                    {attachment.name}
                                  </Typography>
                                  {attachment.type && (
                                    <Chip
                                      label={attachment.type}
                                      size="small"
                                      variant="outlined"
                                      sx={{ mb: 1 }}
                                    />
                                  )}
                                  <Button
                                    size="small"
                                    href={attachment.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    startIcon={<AttachFileIcon />}
                                    sx={{ mt: 0.5 }}
                                  >
                                    Ver archivo
                                  </Button>
                                </Box>
                                <IconButton
                                  onClick={() => removeExistingAttachment(index)}
                                  color="error"
                                  size="small"
                                >
                                  <DeleteIcon fontSize="small" />
                                </IconButton>
                              </Box>
                            </CardContent>
                          )}
                        </Card>
                      </Grid>
                    );
                  })}
                </Grid>
              </CardContent>
            </Card>
          )}

          {/* Nuevos archivos */}
          {newFiles.length > 0 && (
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="subtitle2" gutterBottom>
                  Nuevos Archivos a Subir
                </Typography>
                <Grid container spacing={2}>
                  {newFiles.map((file, index) => {
                    const isImage = isImageFile(file);
                    const previewUrl = imagePreviews.get(index);
                    return (
                      <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card
                          sx={{
                            border: '1px solid',
                            borderColor: 'divider',
                            position: 'relative',
                            height: '100%',
                          }}
                        >
                          {isImage && previewUrl ? (
                            <Box sx={{ position: 'relative' }}>
                              <Box
                                component="img"
                                src={previewUrl}
                                alt={file.name}
                                sx={{
                                  width: '100%',
                                  height: 200,
                                  objectFit: 'cover',
                                  display: 'block',
                                }}
                              />
                              <IconButton
                                sx={{
                                  position: 'absolute',
                                  top: 8,
                                  right: 8,
                                  bgcolor: 'rgba(255, 255, 255, 0.9)',
                                  '&:hover': {
                                    bgcolor: 'rgba(255, 255, 255, 1)',
                                  },
                                }}
                                onClick={() => removeNewFile(index)}
                                color="error"
                                size="small"
                              >
                                <DeleteIcon fontSize="small" />
                              </IconButton>
                              <Box
                                sx={{
                                  position: 'absolute',
                                  bottom: 8,
                                  left: 8,
                                  right: 8,
                                  bgcolor: 'rgba(0, 0, 0, 0.7)',
                                  color: 'white',
                                  px: 1,
                                  py: 0.5,
                                  borderRadius: 1,
                                }}
                              >
                                <Typography variant="caption" sx={{ display: 'block' }}>
                                  {file.name}
                                </Typography>
                                <Typography variant="caption" sx={{ opacity: 0.8 }}>
                                  {formatFileSize(file.size)}
                                </Typography>
                              </Box>
                            </Box>
                          ) : (
                            <CardContent>
                              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                                <InsertDriveFileIcon sx={{ color: 'success.main', mt: 0.5 }} />
                                <Box sx={{ flex: 1 }}>
                                  <Typography variant="body2" fontWeight="medium" gutterBottom>
                                    {file.name}
                                  </Typography>
                                  <Chip
                                    label={file.type || 'Sin tipo'}
                                    size="small"
                                    variant="outlined"
                                    sx={{ mb: 1 }}
                                  />
                                  <Typography variant="caption" color="text.secondary" display="block">
                                    {formatFileSize(file.size)}
                                  </Typography>
                                </Box>
                                <IconButton
                                  onClick={() => removeNewFile(index)}
                                  color="error"
                                  size="small"
                                >
                                  <DeleteIcon fontSize="small" />
                                </IconButton>
                              </Box>
                            </CardContent>
                          )}
                        </Card>
                      </Grid>
                    );
                  })}
                </Grid>
              </CardContent>
            </Card>
          )}

          {/* Input para agregar archivos */}
          <Grid container spacing={3} sx={{ mb: 3 }}>
            <Grid item xs={12}>
              <Button
                variant="outlined"
                component="label"
                startIcon={<AttachFileIcon />}
                fullWidth
                sx={{ py: 2 }}
              >
                Agregar Archivos Adjuntos
                <input
                  type="file"
                  hidden
                  multiple
                  onChange={handleFileChange}
                  accept="*/*"
                />
              </Button>
              <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                Puedes seleccionar múltiples archivos. Se permiten todos los tipos de archivo.
              </Typography>
            </Grid>
          </Grid>

          <Divider sx={{ my: 3 }} />

          {/* Botones de Acción */}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => router.push('/super-admin/announcements')}
              disabled={submitting}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={submitting}
            >
              {submitting ? (
                <>
                  <CircularProgress size={20} sx={{ mr: 1 }} />
                  {isEditing ? 'Actualizando...' : 'Creando...'}
                </>
              ) : (
                isEditing ? 'Actualizar Anuncio' : 'Crear Anuncio'
              )}
            </Button>
          </Box>
        </form>
      </Paper>

      {/* Modal de Éxito */}
      <Dialog open={showSuccessModal} onClose={handleSuccessClose} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ color: 'success.main' }}>
          {isEditing ? 'Anuncio Actualizado' : 'Anuncio Creado'}
        </DialogTitle>
        <DialogContent>
          <Typography>
            {isEditing 
              ? 'El anuncio se ha actualizado correctamente.' 
              : 'El anuncio se ha creado correctamente.'}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleSuccessClose}
            variant="contained"
            color="primary"
          >
            {isEditing ? 'Volver a la Lista' : 'Crear Otro'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Modal de Error */}
      <Dialog open={showErrorModal} onClose={() => setShowErrorModal(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ color: 'error.main' }}>
          Error
        </DialogTitle>
        <DialogContent>
          <Typography color="error">
            {submitError}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setShowErrorModal(false)}
            variant="outlined"
            color="primary"
          >
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}



