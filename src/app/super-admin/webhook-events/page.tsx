'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Chip,
  IconButton,
  Card,
  CardContent,
  Grid,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Stack,
  Alert,
  CircularProgress,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Search,
  FilterList,
  Refresh,
  Visibility,
  CheckCircle,
  Error,
  Warning,
  Schedule,
  TrendingUp,
  TrendingDown,
  Remove,
} from '@mui/icons-material';

interface WebhookEvent {
  _id: string;
  eventKey: string;
  type: string;
  action: string;
  entityId: string;
  processedAt: string;
  result: 'success' | 'error' | 'skipped';
  errorMessage: string | null;
  webhookData: {
    type: string;
    action: string;
    data: any;
  };
  createdAt: string;
  updatedAt: string;
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

interface Stats {
  total: number;
  success: number;
  error: number;
  skipped: number;
}

interface WebhookEventsResponse {
  ok: boolean;
  data: {
    events: WebhookEvent[];
    pagination: Pagination;
    stats: Stats;
  };
}

const WebhookEventsPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [events, setEvents] = useState<WebhookEvent[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: 50,
    total: 0,
    pages: 0,
  });
  const [stats, setStats] = useState<Stats>({
    total: 0,
    success: 0,
    error: 0,
    skipped: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [resultFilter, setResultFilter] = useState<string>('all');
  const [actionFilter, setActionFilter] = useState<string>('all');

  // Modal
  const [selectedEvent, setSelectedEvent] = useState<WebhookEvent | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchEvents = async () => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
        ...(searchTerm && { search: searchTerm }),
        ...(typeFilter !== 'all' && { type: typeFilter }),
        ...(resultFilter !== 'all' && { result: resultFilter }),
        ...(actionFilter !== 'all' && { action: actionFilter }),
      });

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/sale/webhook-events?${params}`);
      
      if (!response.ok) {
        throw new Error('Error al cargar los eventos');
      }

      const data: WebhookEventsResponse = await response.json();
      
      if (data.ok) {
        setEvents(data.data.events);
        setPagination(data.data.pagination);
        setStats(data.data.stats);
      } else {
        throw new Error('Error en la respuesta del servidor');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [pagination.page, pagination.limit, searchTerm, typeFilter, resultFilter, actionFilter]);

  const handlePageChange = (event: unknown, newPage: number) => {
    setPagination(prev => ({ ...prev, page: newPage + 1 }));
  };

  const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPagination(prev => ({ 
      ...prev, 
      limit: parseInt(event.target.value, 10),
      page: 1 
    }));
  };

  const handleSearch = () => {
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setTypeFilter('all');
    setResultFilter('all');
    setActionFilter('all');
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const handleViewEvent = (event: WebhookEvent) => {
    setSelectedEvent(event);
    setModalOpen(true);
  };

  const getResultIcon = (result: string) => {
    switch (result) {
      case 'success':
        return <CheckCircle sx={{ color: 'success.main' }} />;
      case 'error':
        return <Error sx={{ color: 'error.main' }} />;
      case 'skipped':
        return <Warning sx={{ color: 'warning.main' }} />;
      default:
        return <Remove sx={{ color: 'text.secondary' }} />;
    }
  };

  const getResultColor = (result: string) => {
    switch (result) {
      case 'success':
        return 'success';
      case 'error':
        return 'error';
      case 'skipped':
        return 'warning';
      default:
        return 'default';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('es-AR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  const getUniqueTypes = () => {
    const types = [...new Set(events.map(event => event.type))];
    return types;
  };

  const getUniqueActions = () => {
    const actions = [...new Set(events.map(event => event.action))];
    return actions;
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          Eventos de Webhook - Mercado Pago
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Monitoreo en tiempo real de los eventos de webhook de Mercado Pago
        </Typography>
      </Box>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={2}>
                <TrendingUp sx={{ color: 'primary.main', fontSize: 40 }} />
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    {stats.total}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total de Eventos
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={2}>
                <CheckCircle sx={{ color: 'success.main', fontSize: 40 }} />
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: 'success.main' }}>
                    {stats.success}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Exitosos
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Error sx={{ color: 'error.main', fontSize: 40 }} />
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: 'error.main' }}>
                    {stats.error}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Errores
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Warning sx={{ color: 'warning.main', fontSize: 40 }} />
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: 'warning.main' }}>
                    {stats.skipped}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Omitidos
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Filters */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                label="Buscar por ID o Entity ID"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <FormControl fullWidth>
                <InputLabel>Tipo</InputLabel>
                <Select
                  value={typeFilter}
                  label="Tipo"
                  onChange={(e) => setTypeFilter(e.target.value)}
                >
                  <MenuItem value="all">Todos</MenuItem>
                  {getUniqueTypes().map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <FormControl fullWidth>
                <InputLabel>Resultado</InputLabel>
                <Select
                  value={resultFilter}
                  label="Resultado"
                  onChange={(e) => setResultFilter(e.target.value)}
                >
                  <MenuItem value="all">Todos</MenuItem>
                  <MenuItem value="success">Exitoso</MenuItem>
                  <MenuItem value="error">Error</MenuItem>
                  <MenuItem value="skipped">Omitido</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <FormControl fullWidth>
                <InputLabel>Acción</InputLabel>
                <Select
                  value={actionFilter}
                  label="Acción"
                  onChange={(e) => setActionFilter(e.target.value)}
                >
                  <MenuItem value="all">Todas</MenuItem>
                  {getUniqueActions().map((action) => (
                    <MenuItem key={action} value={action}>
                      {action}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Stack direction="row" spacing={2}>
                <Button
                  variant="outlined"
                  startIcon={<FilterList />}
                  onClick={handleClearFilters}
                  fullWidth
                >
                  Limpiar
                </Button>
                <Button
                  variant="contained"
                  startIcon={<Refresh />}
                  onClick={fetchEvents}
                  disabled={loading}
                >
                  {loading ? <CircularProgress size={20} /> : 'Actualizar'}
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Error Alert */}
      {error && (
        <Alert severity="error" sx={{ mb: 4 }}>
          {error}
        </Alert>
      )}

      {/* Events Table */}
      <Card>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Evento</TableCell>
                <TableCell>Tipo</TableCell>
                <TableCell>Acción</TableCell>
                <TableCell>Entity ID</TableCell>
                <TableCell>Resultado</TableCell>
                <TableCell>Procesado</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              ) : events.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
                    <Typography variant="body1" color="text.secondary">
                      No se encontraron eventos
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                events.map((event) => (
                  <TableRow key={event._id} hover>
                    <TableCell>
                      <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                        {event.eventKey}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip label={event.type} size="small" />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {event.action}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                        {event.entityId}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        {getResultIcon(event.result)}
                        <Chip
                          label={event.result}
                          size="small"
                          color={getResultColor(event.result) as any}
                        />
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {formatDate(event.processedAt)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Tooltip title="Ver detalles">
                        <IconButton
                          size="small"
                          onClick={() => handleViewEvent(event)}
                        >
                          <Visibility />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={pagination.total}
          page={pagination.page - 1}
          onPageChange={handlePageChange}
          rowsPerPage={pagination.limit}
          onRowsPerPageChange={handleRowsPerPageChange}
          rowsPerPageOptions={[10, 25, 50, 100]}
          labelRowsPerPage="Filas por página:"
          labelDisplayedRows={({ from, to, count }) =>
            `${from}-${to} de ${count !== -1 ? count : `más de ${to}`}`
          }
        />
      </Card>

      {/* Event Details Modal */}
      <Dialog
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          Detalles del Evento
          {selectedEvent && (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              {selectedEvent.eventKey}
            </Typography>
          )}
        </DialogTitle>
        <DialogContent>
          {selectedEvent && (
            <Box sx={{ mt: 2 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    ID del Evento
                  </Typography>
                  <Typography variant="body2" sx={{ fontFamily: 'monospace', mb: 2 }}>
                    {selectedEvent._id}
                  </Typography>

                  <Typography variant="subtitle2" color="text.secondary">
                    Tipo
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    {selectedEvent.type}
                  </Typography>

                  <Typography variant="subtitle2" color="text.secondary">
                    Acción
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    {selectedEvent.action}
                  </Typography>

                  <Typography variant="subtitle2" color="text.secondary">
                    Entity ID
                  </Typography>
                  <Typography variant="body2" sx={{ fontFamily: 'monospace', mb: 2 }}>
                    {selectedEvent.entityId}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Resultado
                  </Typography>
                  <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
                    {getResultIcon(selectedEvent.result)}
                    <Chip
                      label={selectedEvent.result}
                      size="small"
                      color={getResultColor(selectedEvent.result) as any}
                    />
                  </Stack>

                  <Typography variant="subtitle2" color="text.secondary">
                    Procesado
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    {formatDate(selectedEvent.processedAt)}
                  </Typography>

                  <Typography variant="subtitle2" color="text.secondary">
                    Creado
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    {formatDate(selectedEvent.createdAt)}
                  </Typography>

                  <Typography variant="subtitle2" color="text.secondary">
                    Actualizado
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    {formatDate(selectedEvent.updatedAt)}
                  </Typography>
                </Grid>
                {selectedEvent.errorMessage && (
                  <Grid item xs={12}>
                    <Typography variant="subtitle2" color="error">
                      Mensaje de Error
                    </Typography>
                    <Alert severity="error" sx={{ mt: 1 }}>
                      {selectedEvent.errorMessage}
                    </Alert>
                  </Grid>
                )}
                <Grid item xs={12}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Datos del Webhook
                  </Typography>
                  <Paper sx={{ p: 2, mt: 1, bgcolor: 'grey.50' }}>
                    <Typography
                      variant="body2"
                      sx={{
                        fontFamily: 'monospace',
                        fontSize: '0.875rem',
                        whiteSpace: 'pre-wrap',
                      }}
                    >
                      {JSON.stringify(selectedEvent.webhookData, null, 2)}
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setModalOpen(false)}>
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default WebhookEventsPage;
