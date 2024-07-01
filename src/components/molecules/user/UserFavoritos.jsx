import { useEffect, useState } from 'react'
import { useContextGlobal } from "../../../contexts/global.context"
import Cards from '../../atoms/Cards'

const UserFavoritos = ({ title }) => {
  const { state } = useContextGlobal()
  const { favs, data } = state
  const [currentIndex, setCurrentIndex] = useState(0)
  const [favProducts, setFavProducts] = useState([])
  console.log(favs)

  useEffect(() => {
    const favoriteProducts = data.filter(product => favs.includes(product.id))
    setFavProducts(favoriteProducts)
  }, [favs, data])

  const handleNext = () => {
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + 1
      if (nextIndex >= favProducts.length - 1) {
        return 0
      }
      return nextIndex
    })
  }

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex - 1
      if (nextIndex < 0) {
        return favProducts.length - 2
      }
      return nextIndex
    })
  }

  console.log(favProducts)
  return (
    <>
      <h1 className="txt-accent bigtitle"><strong>{title}</strong></h1>
      {favProducts.length > 0 ? (
        <div className="relative px-[30px]">
          <div className="relative flex g-15">
            {favProducts.slice(currentIndex, currentIndex + 2).map((product) => (
              <Cards key={product.id} type="product" data={product} />
            ))}
            {favProducts.length > 2 && (
              <>
                <i className="cursor-pointer absolute right-[-30px] top-[50%] txt-accent title fa-solid fa-chevron-right" onClick={handleNext}></i>
                <i className="cursor-pointer absolute left-[-30px] top-[50%] txt-accent title fa-solid fa-chevron-left" onClick={handlePrev}></i>
              </>
            )}
          </div>
        </div>
      ) : (
        <div className="bg-white grid place-items-center rounded-lg shadow-md p-15 g-5">
          <h2 className="txt-accent subtitle"><strong>Aún no tienes productos favoritos</strong></h2>
          <p className="txt-tertiary">¡Explora nuestros productos y agrega tus favoritos para encontrarlos aquí fácilmente!</p>
        </div>
      )}
    </>
  )
}

export default UserFavoritos