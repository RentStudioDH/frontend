import categoriasData from '../../../utils/json/categoriasData.json'
import Cards from '../../atoms/Cards'

const HomeCategories = () => {
  return (
    <>
      {categoriasData.map(card => {
        return (
          <Cards key={card.id} type="category" data={card} />
        )
      })}
    </>
  )
}

export default HomeCategories