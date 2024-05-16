import { Box } from '@mui/material'
import BodyRecomendadosContainer from '../../molecules/BodyRecomendadosContainer'


const SectionRecomendados = () => {
  return (
    <Box className='d-grid pi-center' bgcolor={"#FFFFFF"}>
      <Box className='d-grid cont-wrap g-15 p-15'>
        <h3 className='subtitle bb-primary txt-accent'>Productos recomendados</h3>
        <BodyRecomendadosContainer/>
      </Box>
    </Box>
  )
}

export default SectionRecomendados