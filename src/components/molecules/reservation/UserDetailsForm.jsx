import React, { useEffect, useState } from 'react';
import { Paper, Typography, Grid, TextField, Button, Modal, Box } from '@mui/material';

const UserDetailsForm = ({ data }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // TODO : el boton de guardar deberia cambiar los datos
  useEffect(()=>{
  console.log(data);
  },[data])

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
            value={data.firstName}
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
            value={data.lastName}
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
            value={data.email}
            InputProps={{
              readOnly: true,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Teléfono"
            fullWidth
            variant="outlined"
            value="USER NO TIENE ESTE ATRIBUTO AUN"
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
            value="USER NO TIENE ESTE ATRIBUTO AUN"
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
            value="USER NO TIENE ESTE ATRIBUTO AUN"
            InputProps={{
              readOnly: true,
            }}
          />
        </Grid>
      </Grid>
      <Box mt={2} display="flex" justifyContent="flex-end">
        <Button variant="text" sx={{
          color: "#A62639", 
          fontWeight: "600",
          '&:hover': {
            color: "#8C1C2E", // Mantener el mismo color al pasar el cursor
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
              <TextField label="Nombre" fullWidth variant="outlined" defaultValue={data.firstName} />
            </Grid>
            <Grid item xs={12}>
              <TextField label="Apellido" fullWidth variant="outlined" defaultValue={data.lastName} />
            </Grid>
            <Grid item xs={12}>
              <TextField label="Teléfono" fullWidth variant="outlined" defaultValue={data.phone} />
            </Grid>
            <Grid item xs={12}>
              <TextField label="País" fullWidth variant="outlined" defaultValue={data.country} />
            </Grid>
            <Grid item xs={12}>
              <TextField label="Dirección de Entrega" fullWidth variant="outlined" defaultValue={data.deliveryAddress} />
            </Grid>
          </Grid>
          <Box mt={2} display="flex" justifyContent="flex-end">
            <Button variant="contained"   sx={{
          bgcolor: "#A62639", 
          fontWeight: "600",
          '&:hover': {
            bgcolor: "#8C1C2E", // Mantener el mismo color al pasar el cursor
          },
        }} onClick={handleClose}>
              Guardar
            </Button>
          </Box>
        </Box>
      </Modal>
    </Paper>
  );
}

export default UserDetailsForm;
