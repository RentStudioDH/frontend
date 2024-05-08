import { Paper, Typography } from '@mui/material'
import React from 'react'

const CardCategoria = () => {
  return (
    <Paper elevation={6} sx={{ bgcolor: "#D9D9D9", height: "240px", display: "flex", alignItems: 'center', justifyContent: "center" }}>
        <Typography variant='h6'>CATEGORIA</Typography>
    </Paper>
  )
}

export default CardCategoria
