import React from 'react'
import ProductCardReservation from '../../atoms/reservation/ProductCardReservation'
import ReservationDetailsCard from '../../atoms/reservation/ReservationDetailsCard'
import { Grid, Typography } from '@mui/material'

const TusSelecciones = ({data}) => {
  return (
    <>
        <Grid container spacing={4}>
            <Grid item xs={12} sm={12}  md={7} >
                {/* Card producto */}
                <Typography color={"#511C29"} variant='h6' fontWeight={"600"} marginBottom={"5px"}>Producto seleccionado</Typography>
                <ProductCardReservation data={data}/>
            </Grid>
            <Grid item xs={12} sm={12}  md={5}>
                {/* Datos de la reserva */}
                <Typography color={"#511C29"} variant='h6' fontWeight={"600"} marginBottom={"5px"}>Datos de la reserva</Typography>
                <ReservationDetailsCard data={data} />
            </Grid>

        </Grid>  
    </>
  )
}

export default TusSelecciones