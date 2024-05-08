import React from 'react'
import HomeBodyCategorias from '../../components/organisms/HomeBodyCategorias'
import HomeBodyRecomendados from '../../components/organisms/HomeBodyRecomendados'
import { Box, Container } from '@mui/material'

const Home = () => {
  return (
    <>
      <Container className={'body'} >
        <Box sx={{ marginTop: 2 }}> {/* Agregar margen superior para el espacio */}
          <HomeBodyCategorias/>
        </Box>
        <Box sx={{ marginTop: 4 }}> {/* Agregar margen superior para el espacio */}
          <HomeBodyRecomendados/>
        </Box>
      </Container>
    </>
  )
}

export default Home