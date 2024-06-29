import React, { useEffect, useState } from 'react';
import { Paper, Typography, Grid, TextField, Button, Modal, Box } from '@mui/material';
import { useContextGlobal } from '../../../contexts/global.context'; 

const UserDetailsForm = ({ data }) => {
  const [open, setOpen] = useState(false);
  const { state, updateUserData } = useContextGlobal();

  const [userData, setUserData] = useState({
    firstName: data.firstName || "",
    lastName: data.lastName || "",
    email: data.email || "",
    address: {
      country: data.address?.country || "",
      street: data.address?.street || "",
      city: data.address?.city || "",
      state: data.address?.state || "",
      zip: data.address?.zip || "",
    }
  });

  const [errors, setErrors] = useState({});
  
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setErrors({});
    setOpen(false);
  };

  useEffect(() => {
    setUserData({
      firstName: data.firstName || "",
      lastName: data.lastName || "",
      email: data.email || "",
      address: {
        country: data.address?.country || "",
        street: data.address?.street || "",
        city: data.address?.city || "",
        state: data.address?.state || "",
        zip: data.address?.zip || "",
      }
    });
  }, [data]);

  const validateFields = () => {
    const newErrors = {};
    if (!userData.firstName) newErrors.firstName = "El campo Nombre es obligatorio.";
    if (!userData.lastName) newErrors.lastName = "El campo Apellido es obligatorio.";
    if (!userData.email) newErrors.email = "El campo Email es obligatorio.";
    if (!userData.address.country) newErrors.country = "El campo País es obligatorio.";
    if (!userData.address.street) newErrors.street = "El campo Dirección de Entrega es obligatorio.";
    if (!userData.address.city) newErrors.city = "El campo Ciudad es obligatorio.";
    if (!userData.address.state) newErrors.state = "El campo Provincia/Estado es obligatorio.";
    if (!userData.address.zip) newErrors.zip = "El campo Código Postal es obligatorio.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateFields()) return;

    try {
      const formattedData = {
        ...userData,
        address: {
          street: userData.address.street,
          city: userData.address.city,
          state: userData.address.state,
          zip: userData.address.zip,
          country: userData.address.country,
        },
      };
      await updateUserData(formattedData);
      handleClose();
    } catch (error) {
      console.error('Error al guardar los cambios:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema al guardar los cambios. Por favor, inténtalo nuevamente.',
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name in userData.address) {
      setUserData(prevData => ({
        ...prevData,
        address: {
          ...prevData.address,
          [name]: value
        }
      }));
    } else {
      setUserData(prevData => ({
        ...prevData,
        [name]: value
      }));
    }
  };

  return (
    <Paper elevation={3} sx={{ padding: 3, margin: 2, borderRadius: '1rem' }}>
      <Typography variant="h6" marginBottom={"1rem"} color={"#511C29"} fontWeight={"600"}>
        Datos de contacto
      </Typography>
      <Grid container spacing={5}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Nombre"
            fullWidth
            variant="outlined"
            value={userData.firstName}
            InputProps={{
              readOnly: true,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Apellido"
            fullWidth
            variant="outlined"
            value={userData.lastName}
            InputProps={{
              readOnly: true,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Email"
            fullWidth
            variant="outlined"
            value={userData.email}
            InputProps={{
              readOnly: true,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="País"
            fullWidth
            variant="outlined"
            value={userData.address.country}
            InputProps={{
              readOnly: true,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Dirección de Entrega"
            fullWidth
            variant="outlined"
            value={userData.address.street}
            InputProps={{
              readOnly: true,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Ciudad"
            fullWidth
            variant="outlined"
            name="city"
            value={userData.address.city}
            onChange={handleChange}
            error={!!errors.city}
            helperText={errors.city}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Provincia/Estado"
            fullWidth
            variant="outlined"
            name="state"
            value={userData.address.state}
            onChange={handleChange}
            error={!!errors.state}
            helperText={errors.state}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Código Postal"
            fullWidth
            variant="outlined"
            name="zip"
            value={userData.address.zip}
            onChange={handleChange}
            error={!!errors.zip}
            helperText={errors.zip}
          />
        </Grid>
      </Grid>
      <Box mt={2} display="flex" justifyContent="flex-end">
        <Button variant="text" sx={{
          color: "#A62639",
          fontWeight: "600",
          '&:hover': {
            color: "#8C1C2E", 
          },
        }} onClick={handleOpen}>
          Editar datos
        </Button>
      </Box>

      <Modal open={open} onClose={handleClose}>
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', p: 4, borderRadius: '1rem' }}>
          <Typography variant="h6" component="h2" marginBottom={"1rem"} color={"#511C29"} fontWeight={"600"}>
            Editar Datos del Usuario
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Nombre"
                fullWidth
                variant="outlined"
                name="firstName"
                value={userData.firstName}
                onChange={handleChange}
                error={!!errors.firstName}
                helperText={errors.firstName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Apellido"
                fullWidth
                variant="outlined"
                name="lastName"
                value={userData.lastName}
                onChange={handleChange}
                error={!!errors.lastName}
                helperText={errors.lastName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="País"
                fullWidth
                variant="outlined"
                name="country"
                value={userData.address.country}
                onChange={handleChange}
                error={!!errors.country}
                helperText={errors.country}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Calle"
                fullWidth
                variant="outlined"
                name="street"
                value={userData.address.street}
                onChange={handleChange}
                error={!!errors.street}
                helperText={errors.street}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Ciudad"
                fullWidth
                variant="outlined"
                name="city"
                value={userData.address.city}
                onChange={handleChange}
                error={!!errors.city}
                helperText={errors.city}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Provincia/Estado"
                fullWidth
                variant="outlined"
                name="state"
                value={userData.address.state}
                onChange={handleChange}
                error={!!errors.state}
                helperText={errors.state}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Código Postal"
                fullWidth
                variant="outlined"
                name="zip"
                value={userData.address.zip}
                onChange={handleChange}
                error={!!errors.zip}
                helperText={errors.zip}
              />
            </Grid>
          </Grid>
          {Object.keys(errors).length > 0 && (
            <Typography variant="body2" color="error" marginTop={"1rem"}>
              Por favor completa los campos obligatorios.
            </Typography>
          )}
          <Box mt={2} display="flex" justifyContent="space-between">
            <Button
              variant="outlined"
              sx={{
                color: "#A62639",
                borderColor: "#A62639",
                fontWeight: "600",
                '&:hover': {
                  color: "#8C1C2E",
                  borderColor: "#8C1C2E",
                },
              }}
              onClick={handleClose}
            >
              Cancelar
            </Button>
            <Button
              variant="contained"
              sx={{
                bgcolor: "#A62639",
                fontWeight: "600",
                '&:hover': {
                  bgcolor: "#8C1C2E",
                },
              }}
              onClick={handleSave}
            >
              Guardar
            </Button>
          </Box>
        </Box>
      </Modal>
    </Paper>
  );
}

export default UserDetailsForm;
