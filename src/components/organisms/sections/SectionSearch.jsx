import { Box } from '@mui/material'
import SearchInput from '../../molecules/SeachInput'

const SectionSearch = () => {
  return (
    <section className='d-grid pi-center bg-white'>
      <Box className='d-grid pi-center cont-wrap g-15 p-section'>
        <h3 className='txt-accent subtitle'>¡Hola! ¿Qué estás buscando hoy?</h3>
        <SearchInput/>
      </Box>
    </section>
  )
}

export default SectionSearch
