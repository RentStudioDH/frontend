import React, { useState } from 'react';
import { useContextGlobal } from "../../../contexts/global.context";
import { Typography, Grid, Pagination, Paper } from '@mui/material';
import Cards from '../../atoms/Cards';
import CameraIcon from '@mui/icons-material/CameraAlt';

const UserFavoritos = () => {
  const { state } = useContextGlobal();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3; // Número de elementos por página
  const favorites = state.favs;

  // Calcular el número total de páginas
  const totalPages = Math.ceil(favorites.length / itemsPerPage);

  // Obtener los elementos para la página actual
  const currentItems = favorites.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <div>
      <Typography variant="h4" component="h1" sx={{ color: "#56494E", marginBottom: 2 }}>
        <strong>Favoritos</strong>
      </Typography>
      <Paper elevation={4} sx={{ padding: 2, borderRadius: "9px" }}>
        {favorites.length > 0 ? (
          <>
            <Grid container spacing={4} direction="column">
              {currentItems.map((item) => (
                <Grid item key={item.id}>
                  <Cards type="product" data={item} />
                </Grid>
              ))}
            </Grid>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              sx={{ marginTop: 3, justifyContent: 'center', display: 'flex' }}
            />
          </>
        ) : (
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <CameraIcon style={{ fontSize: 100, color: '#ccc' }} />
            <Typography variant="h6" component="p" sx={{ marginTop: 2 }}>
              No se encontraron favoritos.
            </Typography>
            <Typography variant="body1" component="p" sx={{ marginTop: 1 }}>
              ¡Agrega tus productos favoritos para verlos aquí!
            </Typography>
          </div>
        )}
      </Paper>
    </div>
  );
};

export default UserFavoritos;
