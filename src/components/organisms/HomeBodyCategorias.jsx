import { Box, Grid, Typography } from '@mui/material'
import React from 'react'
import CardCategoria from '../atoms/CardCategoria' 
import BodyCategoriasContainer from '../molecules/BodyCategoriasContainer'

const HomeBodyCategorias = () => {
  return (
    <Box bgcolor={'#FFFFFF'} width={'100%'} >
        <Typography variant='h5' color={'#511C29'} sx={{marginBottom: "10px", paddingLeft: '5%'}}>Titulo de categorías</Typography>

        <BodyCategoriasContainer/>
    </Box>
  )
}

export default HomeBodyCategorias
