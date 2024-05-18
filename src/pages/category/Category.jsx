import { useParams } from 'react-router-dom'
import ListProductCategory from '../../components/organisms/categories/ListProductCategory'
import categoryMappings from '../../utils/js/categoriasMapping'

const Category = () => {
  const { category } = useParams()
  // console.log(category)

  const getFormattedCategoryName = (category) => {
    return categoryMappings[category.toLowerCase()] || category;
  }

  return (
    <section className='grid place-items-center'>
      <div className='grid w-full max-w-screen-xl g-15 p-section'>
        <h1 className='txt-accent bb-primary title' style={{ textTransform: 'capitalize' }}><strong>{getFormattedCategoryName(category)}</strong></h1>
        <ListProductCategory category={getFormattedCategoryName(category)}/>
      </div>
    </section>
  )
}

export default Category