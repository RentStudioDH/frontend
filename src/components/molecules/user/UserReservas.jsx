import React, { useEffect, useState } from 'react';
import { useContextGlobal } from "../../../contexts/global.context";
import { Paper, Typography, Grid, Link } from '@mui/material';
import CameraIcon from '@mui/icons-material/CameraAlt'; 
import ReservaCard from '../../atoms/user/ReservaCard';
import { Link as RouterLink, useNavigate } from 'react-router-dom'; 

const UserReservas = () => {
  const { state, getUserReservations } = useContextGlobal();
  const [reservations, setReservations] = useState([]);
  const navigate = useNavigate(); // Hook para la navegación

  
  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await fetch('/reservations/my');
        if (!response.ok) {
          throw new Error('Error fetching reservations');
        }
        const data = await response.json();
        setReservations(data);
      } catch (error) {
        console.error("Error fetching reservations:", error);
      }
    };
    fetchReservations();
  }, []);

  const handleReservationClick = (reservationId) => {
    // Navegar al detalle de la reserva
    navigate(`/producto/${reservationId}`);
  };

  return (
    <>
      <Typography variant="h4" component="h1" sx={{ color: "#56494E", marginBottom: 2 }}>
        <strong>Reservas</strong>
      </Typography>
      <Paper elevation={4} sx={{ padding: 2, borderRadius: "9px" }}>
        {reservations.length > 0 ? (
          <>
            {/* Card principal */}
            <ReservaCard 
              key={reservations[0].id} 
              reservation={reservations[0]} 
              onClick={handleReservationClick}
            />

            <Typography variant="h5" component="h5" sx={{ color: "#56494E", marginBottom: 2, marginTop: 6 }}>
              <strong>Tus Reservas Anteriores</strong>
            </Typography>

            {/* Dos columnas de reservas anteriores */}
            <Grid container spacing={2}>
              {reservations.slice(1).map((reservation) => (
                <Grid item xs={12} sm={6} key={reservation.id}>
                  <ReservaCard 
                    reservation={reservation} 
                    onClick={() => handleReservationClick(reservation.id)}
                  />
                </Grid>
              ))}
            </Grid>
          </>
        ) : (
          <div style={{ textAlign: 'center', padding: '20px' }}>
            {/* Link a la página de productos */}
            <Link component={RouterLink} to="/productos" underline="none">
              <CameraIcon style={{ fontSize: 100, color: '#ccc', cursor: 'pointer' }} />
            </Link>
            <Typography variant="h6" component="p" sx={{ marginTop: 2 }}>
              No se encontraron reservas.
            </Typography>
            <Typography variant="body1" component="p" sx={{ marginTop: 1 }}>
              ¡Haz tu primera reserva ahora!
            </Typography>
          </div>
        )}
      </Paper>
    </>
  );
};

export default UserReservas;
