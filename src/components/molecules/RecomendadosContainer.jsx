import CardProductoRecomendado from "./CardProductoRecomendado"
import productosRecomendadosData from "../../utils/productosRecomendadosData.json"
import { useContextGlobal } from "../../contexts/global.context"
import Card from "../atoms/Card"

const RecomendadosContainer = () => {
  const { state } = useContextGlobal()
  const { data } = state
  console.log(data);
  return (
    <div className="d-grid cont-products g-15">
      {productosRecomendadosData.map(card => (
        // <CardProductoRecomendado key={card.id} title={card.title} textInfo={card.textInfo} price={card.price} img={card.img}/>
        <Card key={card.id} type="product" data={card} />
      ))}
    </div>
  )
}

export default RecomendadosContainer