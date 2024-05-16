import { useParams } from 'react-router-dom'
import ListCategory from '../../components/organisms/categories/ListCategory'
import { Box } from '@mui/material'
import categoryMappings from '../../utils/js/categoriasMapping'

const Category = () => {
  const { category } = useParams()
  console.log(category);

  const getFormattedCategoryName = (category) => {
    return categoryMappings[category.toLowerCase()] || category;
  }

  return (
    <section className='d-grid pi-center'>
      <Box className='d-grid cont-wrap g-15 p-section'>
        <h3 className='txt-accent bb-primary subtitle' style={{ textTransform: 'capitalize' }}>
          {getFormattedCategoryName(category)}
        </h3>
        <ListCategory category={getFormattedCategoryName(category)}/>
      </Box>
    </section>
  )
}

export default Category