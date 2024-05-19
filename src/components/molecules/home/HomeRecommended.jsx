import { useEffect, useState } from "react"
import productosRecomendadosData from "../../../utils/json/productosRecomendadosData.json"
import { useContextGlobal } from "../../../contexts/global.context"
import Cards from "../../atoms/Cards"

const HomeRecommended = ({ title }) => {
  const { state } = useContextGlobal()
  // const { data } = state
  // console.log(data)

  const [shuffledData, setShuffledData] = useState([])
  // console.log(shuffledData)
  useEffect(() => {
    // Función para barajar el array
    const shuffleArray = (array) => { return array.sort(() => Math.random() - 0.5) }
    
    if (productosRecomendadosData && productosRecomendadosData.length > 0) {
      setShuffledData(shuffleArray([...productosRecomendadosData]))
    }
  }, [productosRecomendadosData])
  // console.log(shuffledData)
  return (
    <>
      { title && <h2 className='txt-accent bb-primary title'><strong>{title}</strong></h2> }
      <div className="grid cont-products g-10">
        {shuffledData.slice(0, 6).map(card => (
          <Cards key={card.id} type="product" data={card} />
        ))}
      </div>
    </>
  )
}

export default HomeRecommended