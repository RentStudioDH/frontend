import { Box } from '@mui/material'
import SearchInput from '../../molecules/SeachInput'

const SectionSearch = () => {
  return (
    <section className='d-grid pi-center bg-white'>
      <Box className='d-grid pi-center cont-wrap g-15 p-section'>
        <h1 className='txt-accent title'>¡Hola! ¿Qué estás buscando hoy?</h1>
        <SearchInput/>
      </Box>
    </section>
  )
}

export default SectionSearch
