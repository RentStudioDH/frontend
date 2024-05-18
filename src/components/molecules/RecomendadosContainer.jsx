import { useEffect, useState } from "react"
import productosRecomendadosData from "../../utils/json/productosRecomendadosData.json"
import { useContextGlobal } from "../../contexts/global.context"
import Card from "../atoms/Card"

const RecomendadosContainer = () => {
  const { state } = useContextGlobal()
  const { data } = state
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
    <div className="d-grid cont-products g-15">
      {shuffledData.slice(0, 6).map(card => (
        <Card key={card.id} type="product" data={card} />
      ))}
    </div>
  )
}

export default RecomendadosContainer