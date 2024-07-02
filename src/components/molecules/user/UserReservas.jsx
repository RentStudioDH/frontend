import React, { useEffect, useState } from 'react';
import { useContextGlobal } from "../../../contexts/global.context";
import { Paper, Typography, Grid, Link, Button } from '@mui/material';
import CameraIcon from '@mui/icons-material/CameraAlt'; 
import ReservaCard from '../../atoms/user/ReservaCard';
import { Link as RouterLink, useNavigate } from 'react-router-dom'; 
import { fetchData } from '../../../utils/js/apiRequest';
import { Box } from '@mui/system';

const ITEMS_PER_PAGE = 3; // Número máximo de filas por página

const UserReservas = () => {
  const { state } = useContextGlobal();
  const [reservations, setReservations] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await fetchData({
          method: "GET",
          endpoint: "https://apidh.jackmoon.dev/reservations/my",
          requireAuth: true,
        });
        setReservations(response);
        console.log(response);
      } catch (error) {
        console.error("Error fetching reservations:", error);
      }
    };
    fetchReservations();
  }, [state.token]);

  const handleReservationClick = (reservationId) => {
    navigate(`/producto/${reservationId}`);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const paginatedReservations = reservations.slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE
  );

  return (
    <>
      <Typography variant="h4" component="h1" sx={{ color: "#56494E", marginBottom: 2 }}>
        <strong>Reservas</strong>
      </Typography>
      <Paper elevation={4} sx={{ padding: 2, borderRadius: "9px", minHeight: "25rem" }}>
        {reservations.length > 0 ? (
          <>
            {/* Mostrar las reservas paginadas */}
            <Grid container spacing={2}>
              {paginatedReservations.map((reservation) => (
                <Grid item xs={12} key={reservation.id}>
                  <ReservaCard 
                    reservation={reservation} 
                    onClick={handleReservationClick}
                  />
                </Grid>
              ))}
            </Grid>

            {/* Controles de paginación */}
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
              <Button
                variant="contained" 
                sx={{ 
                  bgcolor: "#A62639", 
                  color: "white",
                  alignSelf: 'flex-end',
                  margin: 2,
                  '&:hover': {
                    bgcolor: "#A62639" // Mantén el mismo color al hacer hover
                  } 
                }} 
                disabled={currentPage === 0}
                onClick={() => handlePageChange(currentPage - 1)}
              >
                Anterior
              </Button>
              <Button
                        variant="contained" 
                        sx={{ 
                          bgcolor: "#A62639", 
                          color: "white",
                          alignSelf: 'flex-end',
                          margin: 2,
                          '&:hover': {
                            bgcolor: "#A62639" // Mantén el mismo color al hacer hover
                          } 
                        }} 
                disabled={(currentPage + 1) * ITEMS_PER_PAGE >= reservations.length}
                onClick={() => handlePageChange(currentPage + 1)}
              >
                Siguiente
              </Button>
            </Box>
          </>
        ) : (
          <div style={{ textAlign: 'center', padding: '20px' }}>
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
