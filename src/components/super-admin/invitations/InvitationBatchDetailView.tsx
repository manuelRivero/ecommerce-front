import React from 'react';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import BlockIcon from '@mui/icons-material/Block';
import moment from 'moment-timezone';
import { InvitationBatch, InvitationBatchStats, InvitationCode, InvitationCodeStatus, Pagination } from '@/client';

interface InvitationBatchDetailViewProps {
  batch: InvitationBatch | null;
  stats: InvitationBatchStats | null;
  codes: InvitationCode[];
  pagination: Pagination;
  statusFilter: InvitationCodeStatus | 'all';
  loading: boolean;
  codesLoading: boolean;
  error: string | null;
  codesError: string | null;
  pendingRevokeCode: string | null;
  isRevoking: boolean;
  onBack: () => void;
  onRetryBatch: () => void;
  onRetryCodes: () => void;
  onStatusFilterChange: (value: InvitationCodeStatus | 'all') => void;
  onPageChange: (event: unknown, page: number) => void;
  onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onOpenRevoke: (code: string) => void;
  onCloseRevoke: () => void;
  onConfirmRevoke: () => void;
}

const formatDate = (value?: string | null) => {
  if (!value) return 'No disponible';
  const date = moment(value);
  return date.isValid() ? date.format('DD-MM-YYYY') : 'No disponible';
};

const statusColorMap: Record<InvitationCodeStatus, 'default' | 'success' | 'warning' | 'error'> = {
  unused: 'success',
  used: 'default',
  revoked: 'error',
  expired: 'warning',
};

const InvitationBatchDetailView: React.FC<InvitationBatchDetailViewProps> = ({
  batch,
  stats,
  codes,
  pagination,
  statusFilter,
  loading,
  codesLoading,
  error,
  codesError,
  pendingRevokeCode,
  isRevoking,
  onBack,
  onRetryBatch,
  onRetryCodes,
  onStatusFilterChange,
  onPageChange,
  onRowsPerPageChange,
  onOpenRevoke,
  onCloseRevoke,
  onConfirmRevoke,
}) => {
  const summary = stats ?? batch?.counts ?? null;
  return (
    <Box sx={{ maxWidth: 1400, margin: '0 auto' }}>
      <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 3 }}>
        <IconButton onClick={onBack}>
          <ArrowBackIcon />
        </IconButton>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            Detalle de lote
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Gestiona los códigos generados en este lote.
          </Typography>
        </Box>
      </Stack>

      {loading && !batch && (
        <Alert severity="info" sx={{ mb: 3 }}>
          Cargando información del lote...
        </Alert>
      )}

      {error && (
        <Alert
          severity="error"
          action={
            <Button color="inherit" size="small" onClick={onRetryBatch}>
              Reintentar
            </Button>
          }
          sx={{ mb: 3 }}
        >
          {error}
        </Alert>
      )}

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" color="text.secondary">
                ID del lote
              </Typography>
              <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                {batch?._id || 'Cargando...'}
              </Typography>
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography variant="subtitle2" color="text.secondary">
                Plan
              </Typography>
              <Typography variant="body2">{batch?.planName || '-'}</Typography>
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography variant="subtitle2" color="text.secondary">
                ID del plan
              </Typography>
              <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                {batch?.planId || '-'}
              </Typography>
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography variant="subtitle2" color="text.secondary">
                Cantidad
              </Typography>
              <Typography variant="body2">{batch?.quantity ?? '-'}</Typography>
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography variant="subtitle2" color="text.secondary">
                Prefijo
              </Typography>
              <Typography variant="body2">{batch?.prefix || '-'}</Typography>
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography variant="subtitle2" color="text.secondary">
                Expira
              </Typography>
              <Typography variant="body2">{formatDate(batch?.expiresAt)}</Typography>
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography variant="subtitle2" color="text.secondary">
                Creado
              </Typography>
              <Typography variant="body2">{formatDate(batch?.createdAt)}</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="subtitle2" color="text.secondary">
                Sin usar
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 700 }}>
                {summary?.unused ?? 0}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="subtitle2" color="text.secondary">
                Usados
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 700 }}>
                {summary?.used ?? 0}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="subtitle2" color="text.secondary">
                Revocados
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 700 }}>
                {summary?.revoked ?? 0}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="subtitle2" color="text.secondary">
                Expirados
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 700 }}>
                {summary?.expired ?? 0}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Card>
        <CardContent>
          <Stack spacing={2}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center">
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Códigos del lote
              </Typography>
              <FormControl size="small" sx={{ minWidth: 200 }}>
                <InputLabel>Estado</InputLabel>
                <Select
                  label="Estado"
                  value={statusFilter}
                  onChange={(event) =>
                    onStatusFilterChange(event.target.value as InvitationCodeStatus | 'all')
                  }
                >
                  <MenuItem value="all">Todos</MenuItem>
                  <MenuItem value="unused">Sin usar</MenuItem>
                  <MenuItem value="used">Usados</MenuItem>
                  <MenuItem value="revoked">Revocados</MenuItem>
                  <MenuItem value="expired">Expirados</MenuItem>
                </Select>
              </FormControl>
            </Stack>

            {codesError && (
              <Alert
                severity="error"
                action={
                  <Button color="inherit" size="small" onClick={onRetryCodes}>
                    Reintentar
                  </Button>
                }
              >
                {codesError}
              </Alert>
            )}

            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Código</TableCell>
                    <TableCell>Estado</TableCell>
                    <TableCell>Expira</TableCell>
                    <TableCell>Usado</TableCell>
                    <TableCell>Acciones</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {codesLoading ? (
                    <TableRow>
                      <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
                        Cargando códigos...
                      </TableCell>
                    </TableRow>
                  ) : codes.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
                        <Typography variant="body2" color="text.secondary">
                          No hay códigos para mostrar.
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ) : (
                    codes.map((code) => (
                      <TableRow key={code.code} hover>
                        <TableCell>
                          <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                            {code.code}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={code.status}
                            size="small"
                            color={statusColorMap[code.status]}
                          />
                        </TableCell>
                        <TableCell>{formatDate(code.expiresAt)}</TableCell>
                        <TableCell>{formatDate(code.usedAt)}</TableCell>
                        <TableCell>
                          <Tooltip title="Revocar">
                            <span>
                              <IconButton
                                size="small"
                                onClick={() => onOpenRevoke(code.code)}
                                disabled={code.status !== 'unused'}
                              >
                                <BlockIcon />
                              </IconButton>
                            </span>
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
              page={pagination.page}
              onPageChange={onPageChange}
              rowsPerPage={pagination.limit}
              onRowsPerPageChange={onRowsPerPageChange}
              rowsPerPageOptions={[10, 25, 50, 100]}
              labelRowsPerPage="Filas por página:"
              labelDisplayedRows={({ from, to, count }) =>
                `${from}-${to} de ${count !== -1 ? count : `más de ${to}`}`
              }
            />
          </Stack>
        </CardContent>
      </Card>

      <Dialog open={Boolean(pendingRevokeCode)} onClose={onCloseRevoke}>
        <DialogTitle>Revocar código</DialogTitle>
        <DialogContent>
          <Typography>
            ¿Seguro que deseas revocar el código{' '}
            <strong>{pendingRevokeCode}</strong>?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={onCloseRevoke} disabled={isRevoking}>
            Cancelar
          </Button>
          <Button onClick={onConfirmRevoke} color="error" disabled={isRevoking}>
            {isRevoking ? 'Revocando...' : 'Revocar'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default InvitationBatchDetailView;
