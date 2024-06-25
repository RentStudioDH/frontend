import React from 'react'
import ProductCardReservation from './ProductCardReservation'
import ReservationDetailsCard from './ReservationDetailsCard'
import { Grid } from '@mui/material'

const TusSelecciones = () => {
  return (
    <>
        <Grid container>
            <Grid item sx={12} sm={12}  md={6} >
                {/* Card producto */}
                <ProductCardReservation></ProductCardReservation>
            </Grid>
            <Grid item sx={12} sm={12}  md={6}>
                {/* Datos de la reserva */}
                <ReservationDetailsCard></ReservationDetailsCard>
            </Grid>

        </Grid>  
    </>
  )
}

export default TusSelecciones