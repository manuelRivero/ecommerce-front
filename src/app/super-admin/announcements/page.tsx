'use client';

import React, { useEffect, useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Tooltip,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from 'next/navigation';
import { 
  getAllAnnouncements, 
  deleteAnnouncement,
  Announcement,
  AnnouncementsListResponse 
} from '@/client';

export default function AnnouncementsListPage() {
  const router = useRouter();
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [announcementToDelete, setAnnouncementToDelete] = useState<Announcement | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 0,
    limit: 10,
    totalPages: 0,
    hasNextPage: false,
    hasPrevPage: false,
  });

  useEffect(() => {
    console.log('[Announcements] useEffect - Componente montado, cargando anuncios');
    loadAnnouncements();
  }, []);

  const loadAnnouncements = async (page = 0, limit = 10) => {
    try {
      console.log('[Announcements] loadAnnouncements - Iniciando carga', { page, limit });
      setLoading(true);
      setError(null);
      
      console.log('[Announcements] loadAnnouncements - Llamando a getAllAnnouncements...');
      const response = await getAllAnnouncements({ page, limit });
      console.log('[Announcements] loadAnnouncements - Respuesta recibida:', response);
      console.log('[Announcements] loadAnnouncements - Response status:', response.status);
      console.log('[Announcements] loadAnnouncements - Response data:', response.data);
      
      if (response.data) {
        console.log('[Announcements] loadAnnouncements - Response data.ok:', response.data.ok);
        console.log('[Announcements] loadAnnouncements - Response data.announcements:', response.data.announcements);
        console.log('[Announcements] loadAnnouncements - Response data.pagination:', response.data.pagination);
        
        if (response.data.announcements) {
          setAnnouncements(response.data.announcements);
          console.log('[Announcements] loadAnnouncements - Anuncios establecidos:', response.data.announcements.length);
        } else {
          console.warn('[Announcements] loadAnnouncements - No hay announcements en la respuesta');
          setAnnouncements([]);
        }
        
        if (response.data.pagination) {
          setPagination(response.data.pagination);
          console.log('[Announcements] loadAnnouncements - Paginación establecida:', response.data.pagination);
        } else {
          console.warn('[Announcements] loadAnnouncements - No hay paginación en la respuesta');
          setPagination({
            total: response.data.announcements?.length || 0,
            page,
            limit,
            totalPages: 1,
            hasNextPage: false,
            hasPrevPage: false,
          });
        }
      } else {
        console.error('[Announcements] loadAnnouncements - No hay data en la respuesta');
        setError('Respuesta inválida del servidor');
        setShowErrorModal(true);
      }
    } catch (error: any) {
      console.error('[Announcements] loadAnnouncements - Error capturado:', error);
      console.error('[Announcements] loadAnnouncements - Error message:', error?.message);
      console.error('[Announcements] loadAnnouncements - Error response:', error?.response);
      console.error('[Announcements] loadAnnouncements - Error response data:', error?.response?.data);
      console.error('[Announcements] loadAnnouncements - Error response status:', error?.response?.status);
      console.error('[Announcements] loadAnnouncements - Error stack:', error?.stack);
      
      const errorMessage = error?.response?.data?.message 
        || error?.response?.data?.error 
        || error?.message 
        || 'Error al cargar los anuncios. Por favor, intenta de nuevo.';
      
      console.error('[Announcements] loadAnnouncements - Mensaje de error final:', errorMessage);
      setError(errorMessage);
      setShowErrorModal(true);
    } finally {
      console.log('[Announcements] loadAnnouncements - Finalizando, estableciendo loading en false');
      setLoading(false);
    }
  };

  const handleEdit = (announcementId: string) => {
    router.push(`/super-admin/create-announcement?id=${announcementId}`);
  };

  const handleView = (announcement: Announcement) => {
    router.push(`/super-admin/announcement-detail?id=${announcement._id}`);
  };

  const handleDeleteClick = (announcement: Announcement) => {
    setAnnouncementToDelete(announcement);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!announcementToDelete) {
      console.warn('[Announcements] handleDeleteConfirm - No hay anuncio para eliminar');
      return;
    }

    try {
      console.log('[Announcements] handleDeleteConfirm - Eliminando anuncio:', announcementToDelete._id);
      setDeleting(true);
      const response = await deleteAnnouncement(announcementToDelete._id);
      console.log('[Announcements] handleDeleteConfirm - Respuesta de eliminación:', response);
      setDeleteDialogOpen(false);
      setAnnouncementToDelete(null);
      console.log('[Announcements] handleDeleteConfirm - Recargando anuncios...');
      loadAnnouncements(pagination.page, pagination.limit);
    } catch (error: any) {
      console.error('[Announcements] handleDeleteConfirm - Error capturado:', error);
      console.error('[Announcements] handleDeleteConfirm - Error message:', error?.message);
      console.error('[Announcements] handleDeleteConfirm - Error response:', error?.response);
      console.error('[Announcements] handleDeleteConfirm - Error response data:', error?.response?.data);
      setError('Error al eliminar el anuncio. Por favor, intenta de nuevo.');
      setShowErrorModal(true);
      setDeleteDialogOpen(false);
    } finally {
      setDeleting(false);
    }
  };

  const handleCreateNew = () => {
    router.push('/super-admin/create-announcement');
  };

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return 'No disponible';
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'info':
        return 'info';
      case 'warning':
        return 'warning';
      case 'success':
        return 'success';
      case 'error':
        return 'error';
      case 'update':
        return 'primary';
      default:
        return 'default';
    }
  };

  const getTypeLabel = (type: string) => {
    const typeMap: { [key: string]: string } = {
      'info': 'Información',
      'warning': 'Advertencia',
      'success': 'Éxito',
      'error': 'Error',
      'update': 'Actualización'
    };
    return typeMap[type] || type;
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'error';
      case 'high':
        return 'warning';
      case 'medium':
        return 'info';
      case 'low':
        return 'default';
      default:
        return 'default';
    }
  };

  const getPriorityLabel = (priority: string) => {
    const priorityMap: { [key: string]: string } = {
      'urgent': 'Urgente',
      'high': 'Alta',
      'medium': 'Media',
      'low': 'Baja'
    };
    return priorityMap[priority] || priority;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'success';
      case 'draft':
        return 'warning';
      case 'archived':
        return 'default';
      default:
        return 'default';
    }
  };

  const getStatusLabel = (status: string) => {
    const statusMap: { [key: string]: string } = {
      'published': 'Publicado',
      'draft': 'Borrador',
      'archived': 'Archivado'
    };
    return statusMap[status] || status;
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 1400, margin: '0 auto' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">
          Anuncios
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleCreateNew}
        >
          Crear Nuevo Anuncio
        </Button>
      </Box>

      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Título</TableCell>
                <TableCell>Tipo</TableCell>
                <TableCell>Prioridad</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell>Fecha Publicación</TableCell>
                <TableCell>Fecha Expiración</TableCell>
                <TableCell>Fecha Creación</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {announcements.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} align="center" sx={{ py: 4 }}>
                    <Typography variant="body2" color="text.secondary">
                      No hay anuncios disponibles
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                announcements.map((announcement) => (
                  <TableRow key={announcement._id} hover>
                    <TableCell>
                      <Typography variant="body2" fontWeight="medium">
                        {announcement.title}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={getTypeLabel(announcement.type)}
                        color={getTypeColor(announcement.type) as any}
                        size="small"
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={getPriorityLabel(announcement.priority)}
                        color={getPriorityColor(announcement.priority) as any}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={getStatusLabel(announcement.status)}
                        color={getStatusColor(announcement.status) as any}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">
                        {announcement.publishedAt ? formatDate(announcement.publishedAt) : 'No publicada'}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">
                        {announcement.expiresAt ? formatDate(announcement.expiresAt) : 'Sin expiración'}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">
                        {formatDate(announcement.createdAt)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Tooltip title="Ver">
                          <IconButton
                            size="small"
                            onClick={() => handleView(announcement)}
                            color="info"
                          >
                            <VisibilityIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Editar">
                          <IconButton
                            size="small"
                            onClick={() => handleEdit(announcement._id)}
                            color="primary"
                          >
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Eliminar">
                          <IconButton
                            size="small"
                            onClick={() => handleDeleteClick(announcement)}
                            color="error"
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Modal de Confirmación de Eliminación */}
      <Dialog open={deleteDialogOpen} onClose={() => !deleting && setDeleteDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ color: 'error.main' }}>
          Confirmar Eliminación
        </DialogTitle>
        <DialogContent>
          <Typography>
            ¿Estás seguro de que deseas eliminar el anuncio "{announcementToDelete?.title}"?
            Esta acción no se puede deshacer.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setDeleteDialogOpen(false)}
            variant="outlined"
            color="primary"
            disabled={deleting}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            variant="contained"
            color="error"
            disabled={deleting}
          >
            {deleting ? <CircularProgress size={20} /> : 'Eliminar'}
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
            {error}
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
          <Button
            onClick={() => {
              setShowErrorModal(false);
              loadAnnouncements();
            }}
            variant="contained"
            color="primary"
          >
            Reintentar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}


