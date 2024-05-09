import { Box, Container } from '@mui/material'
import React from 'react'
import HomeBodyCategorias from '../../Components/organisms/HomeBodyCategorias'
import HomeBodyRecomendados from "../../Components/organisms/HomeBodyRecomendados";
const Main = () => {
  return (
    <Container className={'body'}>
        <Box>
            <HomeBodyCategorias/>
        </Box>
        <Box>
            <HomeBodyRecomendados/>
        </Box>
    </Container>
  )
}

export default Main