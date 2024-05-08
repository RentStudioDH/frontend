import React from 'react'
import HomeBodyCategorias from '../../components/organisms/HomeBodyCategorias'
import HomeBodyRecomendados from '../../components/organisms/HomeBodyRecomendados'

const Home = () => {
  return (
    <>
      <div className=''>
        <HomeBodyCategorias/>
        <HomeBodyRecomendados/>
      </div>
    </>
  )
}

export default Home