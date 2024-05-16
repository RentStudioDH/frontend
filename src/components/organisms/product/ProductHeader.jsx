import { Box, Grid, IconButton, Typography } from '@mui/material'
import React from 'react'
import { ArrowBack } from '@mui/icons-material'
import PrimaryButton from '../../atoms/PrimaryButton'

const ProductHeader = ({title}) => {

    function onClick(params) {
        
    }

    return (
    <Grid container spacing={3} alignItems="center" 
    sx={{padding: "10px"}}>
        <Grid item xs={2} md={2}>
            <IconButton onClick={() => window.history.back()} aria-label="Volver">
                <ArrowBack />
            </IconButton>
        </Grid>
        <Grid item xs={10} md={8}>
            <Box sx={{ borderBottom: '2px solid #DB324D', paddingBottom: '8px'}}>
                <Typography variant="h5" color={"#A62639"} fontWeight={"700"}>{title}</Typography>
            </Box>
        </Grid>
        <Grid item xs={12} md={2} display={"flex"} justifyContent={"center"}>
            <PrimaryButton onClick={onClick}  text={"Rentar"}/>
        </Grid>
    </Grid>
  )
}

export default ProductHeader
