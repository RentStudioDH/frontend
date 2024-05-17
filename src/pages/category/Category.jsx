import { useParams } from 'react-router-dom'
import ListCategory from '../../components/organisms/categories/ListCategory'
import categoryMappings from '../../utils/js/categoriasMapping'

const Category = () => {
  const { category } = useParams()
  console.log(category);

  const getFormattedCategoryName = (category) => {
    return categoryMappings[category.toLowerCase()] || category;
  }

  return (
    <section className='grid place-items-center'>
      <div className='d-grid w-full max-w-screen-xl g-15 p-section'>
        <h1 className='txt-accent bb-primary title' style={{ textTransform: 'capitalize' }}><strong>{getFormattedCategoryName(category)}</strong></h1>
        <ListCategory category={getFormattedCategoryName(category)}/>
      </div>
    </section>
  )
}

export default Category