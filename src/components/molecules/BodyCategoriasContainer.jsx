import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import CardCategoria from "../atoms/CardCategoria";

const BodyCategoriasContainer = () => {
  // Crear un array con la cantidad de elementos deseados
  const numberOfCards = 4;
  const cards = Array.from({ length: numberOfCards }, (_, index) => index);

  return (
      <Grid container spacing={2} display={'flex'} justifyContent={'center'} paddingX={'5%'}>
        {cards.map((index) => (
          <Grid key={index} item xs={6} md={3}>
            <CardCategoria />
          </Grid>
        ))}
      </Grid>
  );
};

export default BodyCategoriasContainer;
