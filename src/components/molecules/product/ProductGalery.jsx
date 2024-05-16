import { Box, Grid } from '@mui/material'
import React from 'react'

const ProductGalery = ({images}) => {

  return (
    <Grid container height={"100%"} spacing={2}>
        <Grid item xs={6}  >
            <Box height={{xs: "190", md: "290"}} width={{xs: "100", md: "90"}}> 
                <img src={images} alt="" style={{ width: '100%', height: '100%' }}/>
            </Box>
        </Grid>
        <Grid item xs={6}  >
            <Box height={{xs: "190", md: "290"}} width={{xs: "100", md: "90"}}> 
                <img src={images} alt="" style={{ width: '100%', height: '100%' }}/>
            </Box>
        </Grid>
        <Grid item xs={6}  >
            <Box height={{xs: "190", md: "290"}} width={{xs: "100", md: "90"}}> 
                <img src={images} alt="" style={{ width: '100%', height: '100%' }}/>
            </Box>
        </Grid>
        <Grid item xs={6}  >
            <Box height={{xs: "190", md: "290"}} width={{xs: "100", md: "90"}}> 
                <img src={images} alt="" style={{ width: '100%', height: '100%' }}/>
            </Box>
        </Grid>
    </Grid>
  )
}

export default ProductGalery