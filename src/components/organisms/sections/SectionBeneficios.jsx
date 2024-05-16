import { Box } from '@mui/material'
import BeneficiosContainer from '../../molecules/BeneficiosContainer'

const SectionBeneficios = () => {
  return (
    <section className='d-grid pi-center'>
      <Box className='d-grid cont-wrap g-15 p-15'>
        <h3 className='subtitle bb-primary txt-accent'>Beneficios</h3>
        <BeneficiosContainer/>
      </Box>
    </section>
  )
}

export default SectionBeneficios