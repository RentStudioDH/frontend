import RecomendadosContainer from '../../molecules/RecomendadosContainer'


const SectionRecomendados = () => {
  return (
    <section className='grid place-items-center bg-white'>
      <div className='d-grid w-full max-w-screen-xl g-15 p-section'>
        <h2 className='txt-accent bb-primary title'><strong>Productos recomendados</strong></h2>
        <RecomendadosContainer/>
      </div>
    </section>
  )
}

export default SectionRecomendados