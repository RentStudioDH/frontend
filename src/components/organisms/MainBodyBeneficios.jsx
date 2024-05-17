import { Box, Typography } from '@mui/material'

import BeneficiosSeccion from '../molecules/BeneficiosSeccion';

const MainBodyBeneficios = () => {
  return (
    <Box width={"80%"} mx={"10%"} >
        <Typography variant='h5' fontWeight={'700'} color={'#56494E'} sx={{marginBottom: "10px", borderBottom: '4px solid #A62639', width: '20%'}}>Beneficios</Typography>
        <BeneficiosSeccion/>
    </Box>
  )
}

export default MainBodyBeneficios
