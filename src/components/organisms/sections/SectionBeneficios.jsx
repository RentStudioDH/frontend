import { Box } from '@mui/material'
import BeneficiosContainer from '../../molecules/BeneficiosContainer'

const SectionBeneficios = () => {
  return (
    <section className='d-grid pi-center'>
      <Box className='d-grid cont-wrap g-15 p-section'>
        <h3 className='txt-accent bb-primary subtitle'>Beneficios</h3>
        <BeneficiosContainer/>
      </Box>
    </section>
  )
}

export default SectionBeneficios