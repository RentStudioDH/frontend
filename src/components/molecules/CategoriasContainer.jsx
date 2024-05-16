import categoriasData from '../../utils/categoriasData.json'
import Card from '../atoms/Card'

const CategoriasContainer = () => {
  return (
    <>
      {categoriasData.map(card => {
        console.log(card);
        return (
          <Card key={card.id} type="category" data={card} />
        )
      })}
    </>
  )
}

export default CategoriasContainer