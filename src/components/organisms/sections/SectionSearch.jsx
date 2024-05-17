import SearchInput from '../../molecules/SeachInput'

const SectionSearch = () => {
  return (
    <section className='grid place-items-center bg-white'>
      <div className='grid place-items-center w-full max-w-screen-xl g-15 p-section'>
        <h1 className='txt-accent bigtitle'><strong>¡Hola! ¿Qué estás buscando hoy?</strong></h1>
        <SearchInput/>
      </div>
    </section>
  )
}

export default SectionSearch
