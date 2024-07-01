import React from 'react';
import { Paper, Typography, Box, Button } from '@mui/material';

const ReservaCard = ({ reservation, onClick }) => {
  return (
    <Paper 
      elevation={3} 
      sx={{ display: 'flex', marginBottom: 2, cursor: 'pointer' }}
      onClick={() => onClick(reservation.id)}
    >
      <Box 
        component="img"
        sx={{ width: '40%', height: '100%', maxHeight: "200px" , objectFit: 'cover' }}
        src={reservation.image}
        alt={reservation.name}
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', padding: 2, width: '60%' }}>
        <Typography variant="h4" component="div" color={"#511C29"}>
          {reservation.name}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ marginTop: 1 }}>
          Fecha: {reservation.creationDateTime}
        </Typography>
      </Box>
      <Button 
            variant="contained" 
            sx={{ 
              bgcolor: "#A62639", 
              color: "white",
              '&:hover': {
                bgcolor: "#A62639" // Mantén el mismo color al hacer hover
              } 
            }} 
          >
            Volver a Reservar
          </Button>
    </Paper>
  );
};

export default ReservaCard;
