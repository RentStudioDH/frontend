import { useParams } from 'react-router-dom'
import ListProductsCategory from '../../components/organisms/lists/ListProductsCategory'
import categoriasData from '../../utils/json/categoriasData.json'

const Category = () => {
  const { category } = useParams()
  console.log(category)

  const getFormattedCategoryName = (category) => {
    const foundCategory = categoriasData.find(cat => cat.path.includes(category));
    return foundCategory ? foundCategory.label : category;
  };

  return (
    <main>
      <section className='grid place-items-center'>
        <div className='grid w-full max-w-screen-xl g-15 p-section'>
          <h1 className='txt-accent bb-primary title capitalize'><strong>{getFormattedCategoryName(category)}</strong></h1>
          <ListProductsCategory category={getFormattedCategoryName(category)}/>
        </div>
      </section>
    </main>
  )
}

export default Category