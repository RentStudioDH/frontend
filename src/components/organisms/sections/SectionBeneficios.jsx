import BeneficiosContainer from '../../molecules/BeneficiosContainer'

const SectionBeneficios = () => {
  return (
    <section className='grid place-items-center'>
      <div className='d-grid w-full max-w-screen-xl g-15 p-section'>
        <h2 className='txt-accent bb-primary title'><strong>Beneficios</strong></h2>
        <BeneficiosContainer/>
      </div>
    </section>
  )
}

export default SectionBeneficios