import { Grid } from '@mui/material'
import React from 'react'
import CardProductoRecomendado from '../atoms/CardProductoRecomendado'

const BodyRecomendadosContainer = () => {
      // Crear un array con la cantidad de elementos deseados
  const numberOfCards = 10;
  const cards = Array.from({ length: numberOfCards }, (_, index) => index);

  return (
      <Grid container spacing={2} display={'flex'} justifyContent={'center'} paddingX={'5%'}>
        {cards.map((index) => (
          <Grid key={index} item xs={12} md={6}>
            <CardProductoRecomendado />
          </Grid>
        ))}
      </Grid>
  )
}

export default BodyRecomendadosContainer