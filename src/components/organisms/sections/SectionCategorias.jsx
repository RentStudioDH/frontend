import { Box, Typography } from '@mui/material'
import BodyCategoriasContainer from '../../molecules/BodyCategoriasContainer'

const SectionCategorias = () => {
  return (
    <Box bgcolor={'#FFFFFF'} width={'100%'} >
      <Typography variant='h5' color={'#511C29'} sx={{marginBottom: "10px", paddingLeft: '5%'}}>Titulo de categorías</Typography>
      <BodyCategoriasContainer/>
    </Box>
  )
}

export default SectionCategorias