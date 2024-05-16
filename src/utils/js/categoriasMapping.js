import categorias from '../json/categoriasData.json'

const categoryMappings = categorias.reduce((map, category) => {
  map[category.path.split('/').pop()] = category.title;
  return map;
}, {})

export default categoryMappings