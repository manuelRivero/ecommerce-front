import React from 'react';
import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  IconButton,
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
import VisibilityIcon from '@mui/icons-material/Visibility';
import moment from 'moment-timezone';
import { InvitationBatch, InvitationBatchListPagination } from '@/client';

interface InvitationBatchesTableProps {
  batches: InvitationBatch[];
  isLoading: boolean;
  pagination: InvitationBatchListPagination;
  onViewBatch: (batchId: string) => void;
  onPageChange: (event: unknown, page: number) => void;
  onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const formatDate = (value?: string | null) => {
  if (!value) return 'No disponible';
  const date = moment(value);
  return date.isValid() ? date.format('DD-MM-YYYY') : 'No disponible';
};

const InvitationBatchesTable: React.FC<InvitationBatchesTableProps> = ({
  batches,
  isLoading,
  pagination,
  onViewBatch,
  onPageChange,
  onRowsPerPageChange,
}) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
          Lotes disponibles
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Plan</TableCell>
                <TableCell>Cantidad</TableCell>
                <TableCell>Sin usar</TableCell>
                <TableCell>Usados</TableCell>
                <TableCell>Revocados</TableCell>
                <TableCell>Prefijo</TableCell>
                <TableCell>Expira</TableCell>
                <TableCell>Creado</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={9} align="center" sx={{ py: 4 }}>
                    <CircularProgress size={28} />
                  </TableCell>
                </TableRow>
              ) : batches.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} align="center" sx={{ py: 4 }}>
                    <Typography variant="body2" color="text.secondary">
                      No hay lotes cargados todavía.
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                batches.map((batch) => (
                  <TableRow key={batch._id} hover>
                    <TableCell>{batch.planName || '-'}</TableCell>
                    <TableCell>{batch.quantity}</TableCell>
                    <TableCell>{batch.counts?.unused ?? '-'}</TableCell>
                    <TableCell>{batch.counts?.used ?? '-'}</TableCell>
                    <TableCell>{batch.counts?.revoked ?? '-'}</TableCell>
                    <TableCell>{batch.prefix || '-'}</TableCell>
                    <TableCell>{formatDate(batch.expiresAt)}</TableCell>
                    <TableCell>{formatDate(batch.createdAt)}</TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Tooltip title="Ver detalle">
                          <IconButton size="small" onClick={() => onViewBatch(batch._id)}>
                            <VisibilityIcon />
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
        <TablePagination
          component="div"
          count={pagination.total}
          page={pagination.page}
          onPageChange={onPageChange}
          rowsPerPage={pagination.limit}
          onRowsPerPageChange={onRowsPerPageChange}
          rowsPerPageOptions={[10, 20, 50, 100]}
          labelRowsPerPage="Filas por página:"
          labelDisplayedRows={({ from, to, count }) =>
            `${from}-${to} de ${count !== -1 ? count : `más de ${to}`}`
          }
        />
      </CardContent>
    </Card>
  );
};

export default InvitationBatchesTable;
