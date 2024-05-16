import { Box } from '@mui/material'
import RecomendadosContainer from '../../molecules/RecomendadosContainer'


const SectionRecomendados = () => {
  return (
    <section className='d-grid pi-center bg-white'>
      <Box className='d-grid cont-wrap g-15 p-section'>
        <h3 className='txt-accent bb-primary subtitle'>Productos recomendados</h3>
        <RecomendadosContainer/>
      </Box>
    </section>
  )
}

export default SectionRecomendados