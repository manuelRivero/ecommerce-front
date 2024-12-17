"use client";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

interface IForm {
  name: string;
  lastName: string;
  email: string;
  phone: string;
  dni: string;
  address: string;
}

export default function Form() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const {
    control,
    handleSubmit,
    formState: { isDirty, isValid, errors },
  } = useForm<IForm>({ mode: "onChange" });
  const submit = (values: IForm) => {
    console.log("values", values);
    router.push('/compra-exitosa')
  };
  return (
    <form onSubmit={handleSubmit(submit)}>
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        Datos de facturación
      </Typography>
      <Box sx={{ marginBottom: 3 }}>
        <Controller
          control={control}
          name="name"
          render={({ field, fieldState }) => (
            <TextField
              sx={{ width: "100%" }}
              label="Nombre*"
              value={field.value}
              onChange={field.onChange}
              helperText={fieldState.error?.message}
            />
          )}
          rules={{
            required: "Campo requerido",
          }}
        />
      </Box>
      <Box sx={{ marginBottom: 3 }}>
        <Controller
          control={control}
          name="lastName"
          render={({ field, fieldState }) => (
            <TextField
              sx={{ width: "100%" }}
              label="Apellido*"
              value={field.value}
              onChange={field.onChange}
              helperText={fieldState.error?.message}
            />
          )}
          rules={{
            required: "Campo requerido",
          }}
        />
      </Box>
      <Box sx={{ marginBottom: 3 }}>
        <Controller
          control={control}
          name="phone"
          render={({ field, fieldState }) => (
            <TextField
              sx={{ width: "100%" }}
              label="Télefono*"
              value={field.value}
              onChange={field.onChange}
              helperText={fieldState.error?.message}
            />
          )}
          rules={{
            required: "Campo requerido",
          }}
        />
      </Box>
      <Box sx={{ marginBottom: 3 }}>
        <Controller
          control={control}
          name="dni"
          render={({ field, fieldState }) => (
            <TextField
            type="number"
              sx={{ width: "100%" }}
              label="DNI*"
              value={field.value}
              onChange={field.onChange}
              helperText={fieldState.error?.message}
            />
          )}
          rules={{
            required: "Campo requerido",
          }}
        />
      </Box>
      <Box sx={{ marginBottom: 3 }}>
        <Controller
          control={control}
          name="address"
          render={({ field, fieldState }) => (
            <TextField
              sx={{ width: "100%" }}
              rows={4}
              multiline
              label="Dirección*"
              value={field.value}
              onChange={field.onChange}
              helperText={fieldState.error?.message}
            />
          )}
          rules={{
            required: "Campo requerido",
          }}
        />
      </Box>
      <Typography color="#97a2aa">
      Completa tus datos personales para que podamos enviarte toda la información de tu compra. Asegúrate de ingresar un correo electrónico válido
      </Typography>
      {Object.keys(errors).length > 0 && <Typography color="error" sx={{marginTop: 2}}>Parece que el formulario contiene algunos errores</Typography>}
      <Stack direction="row" sx={{marginTop: 2}} spacing={2} justifyContent="center">
      <Button
          variant="contained"
          color="error"
        >
          Cancelar compra
        </Button>
         <Button
          variant="contained"
          type="submit"
          disabled={!isDirty || !isValid}
        >
          Finalizar compra
        </Button>
      </Stack>
    </form>
  );
}
