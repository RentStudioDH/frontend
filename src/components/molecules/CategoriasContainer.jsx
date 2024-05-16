import categoriasData from '../../utils/json/categoriasData.json'
import Card from '../atoms/Card'

const CategoriasContainer = () => {
  return (
    <>
      {categoriasData.map(card => {
        return (
          <Card key={card.id} type="category" data={card} />
        )
      })}
    </>
  )
}

export default CategoriasContainer