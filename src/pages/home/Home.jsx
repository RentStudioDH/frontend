import SectionHome from '../../components/organisms/sections/SectionHome'
import HomeSearch from '../../components/molecules/home/HomeSearch'
import HomeBenefits from '../../components/molecules/home/HomeBenefits'
import HomeRecommended from '../../components/molecules/home/HomeRecommended'
import HomeCategories from '../../components/molecules/home/HomeCategories'

const Home = () => {
  return (
    <>
      <SectionHome title='¡Hola! ¿Qué estás buscando hoy?' ContainerComponent={HomeSearch} background='bg-white' containerClass='grid place-items-center' />
      <SectionHome title='Beneficios' ContainerComponent={HomeBenefits} containerClass='grid' />
      <SectionHome title='Productos recomendados' ContainerComponent={HomeRecommended} background='bg-white' containerClass='grid' />
      <SectionHome ContainerComponent={HomeCategories} containerClass='flex cont-category' />
    </>
  )
}

export default Home