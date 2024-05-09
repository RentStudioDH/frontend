import { Box, Container, Typography } from '@mui/material'
import React from 'react'
import CardImgAndInfo from "../atoms/CardImgAndInfo";
import BeneficiosSeccion from '../molecules/BeneficiosSeccion';

const MainBodyBeneficios = () => {
  return (
    <Box sx={{padding: '0 5%'}}>
        <Typography variant='h5' fontWeight={'700'} color={'#56494E'} sx={{marginBottom: "10px", borderBottom: '4px solid #A62639', width: '20%'}}>Beneficios</Typography>
        
        <BeneficiosSeccion/>
    </Box>
  )
}

export default MainBodyBeneficios
