import React from 'react';
import { Alert, Button, Card, CardContent, Stack, TextField, Typography } from '@mui/material';

interface InvitationBatchLookupProps {
  value: string;
  error: string | null;
  isLoading: boolean;
  onChange: (value: string) => void;
  onSearch: () => void;
}

const InvitationBatchLookup: React.FC<InvitationBatchLookupProps> = ({
  value,
  error,
  isLoading,
  onChange,
  onSearch,
}) => {
  return (
    <Card>
      <CardContent>
        <Stack spacing={2}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Buscar lote por ID
          </Typography>
          {error && <Alert severity="error">{error}</Alert>}
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              label="ID del lote"
              value={value}
              onChange={(event) => onChange(event.target.value)}
              fullWidth
            />
            <Button variant="contained" onClick={onSearch} disabled={isLoading}>
              Buscar
            </Button>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default InvitationBatchLookup;
