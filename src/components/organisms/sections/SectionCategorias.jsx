import { Box } from '@mui/material'
import CategoriasContainer from '../../molecules/CategoriasContainer'

const SectionCategorias = () => {
  return (
    <section className='d-grid pi-center'>
      <Box className='d-flex cont-wrap cont-category g-15 p-section'>
        <CategoriasContainer/>
      </Box>
    </section>
  )
}

export default SectionCategorias