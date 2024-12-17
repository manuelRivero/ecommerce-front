"use client";
import React from "react";
import { Box, Button, ButtonGroup, Stack, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

interface Props {
  value: string;
  setValue: (value: string) => void;
}
export default function QuantitySelector({ value, setValue }: Props) {
  const handleDecrease = () => {
    if (Number(value) > 1) {
      setValue(String(Number(value) - 1));
    }
  };
  const handleIncrease = () => {
    if (Number(value) < 10) {
      setValue(String(Number(value) + 1));
    }
  };
  return (
    <Box>
      <Typography>Cantidad:</Typography>
      <Stack direction="row">
        <ButtonGroup variant="contained" aria-label="Basic button group">
          <Button disabled={Number(value) <= 1} onClick={handleDecrease}>
            <RemoveIcon />
          </Button>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            sx={{ paddingX: 4 }}
          >
            <Typography><strong>{value}</strong></Typography>
          </Stack>
          <Button disabled={Number(value) >= 10} onClick={handleIncrease}>
            <AddIcon />
          </Button>
        </ButtonGroup>
      </Stack>
    </Box>
  );
}
