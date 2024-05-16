import React from 'react'
import { Box, Typography } from '@mui/material'
import SearchInput from '../molecules/SeachInput'

const BodySearchSection = () => {
  return (
    <Box display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={'center'} marginY={"15px"} gap={"10px"}>
        <Typography variant='h5' color={"#56494E"} fontWeight={700}>¡Hola! ¿Qué estás buscando hoy?</Typography>
        <SearchInput/>
    </Box>
  )
}

export default BodySearchSection