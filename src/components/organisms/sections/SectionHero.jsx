import FormSearch from '../forms/FormSearch'

const SectionHero = () => {
  return (
    <div className="grid place-items-center overflow-hidden w-full h-[300px] md:h-[500px] cont-hero">
      <video className="relative w-full h-full" autoPlay muted loop>
        <source src="/camera.webm" type="video/mp4" />
        Tu navegador no soporta el elemento de video.
      </video>
      <div className="absolute info p-section">
        <FormSearch title='¡Hola! ¿Qué estás buscando hoy?' type='hero' />
      </div>
    </div>
  )
}

export default SectionHero