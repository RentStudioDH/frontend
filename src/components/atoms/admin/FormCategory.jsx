import { useState, useEffect } from 'react'
import ListImages from '../form/ListImages'
import { fetchData } from '../../../utils/js/apiRequest'
import Buttons from '../Buttons'
import { useContextGlobal } from '../../../contexts/global.context'

const FormCategory = ({ type, id }) => {
  const initialCategoryState = {
    name: '',
    description: '',
    slug: '',
    attachment: [],
  }

  const { state, getCategories } = useContextGlobal()
  const { categories, token } = state
  const [category, setCategory] = useState(initialCategoryState)
  const [error, setError] = useState({})
  const [successMessage, setSuccessMessage] = useState('')
  const [allImagesUploaded, setAllImagesUploaded] = useState(true)
  const [initialData, setInitialData] = useState(initialCategoryState)

  useEffect(() => {
    getCategories()
  }, [])

  useEffect(() => {
    if (type === 'editarCategory' && id) {
      const categoryToEdit = categories.find(cat => cat.id === id)
      if (categoryToEdit) {
        setCategory({
          ...categoryToEdit,
          attachment: categoryToEdit.attachment || [],
        })
        setInitialData({
          ...categoryToEdit,
          attachment: categoryToEdit.attachment || [],
        })
        console.log('Imágenes iniciales de la categoría:', categoryToEdit.attachment)
      }
    }
  }, [id, type, categories])

  const generateSlug = (name) => {
    return `/categoria/${name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, '-').toLowerCase()}`
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    if (name === 'name') {
      setCategory((prevCategory) => ({
        ...prevCategory,
        name: value,
        slug: generateSlug(value)
      }))
    } else {
      setCategory((prevCategory) => ({ ...prevCategory, [name]: value }))
    }
  }

  const handleImageChange = (images) => {
    setCategory((prevCategory) => ({ ...prevCategory, attachment: images }))
    console.log('Imágen actualizada de la categoria:', images)
  }

  console.log(category);
  const onAllImagesUploaded = (status) => {
    if (type !== 'editarCategory') {
      setAllImagesUploaded(status)
    }
  }

  const validateForm = () => {
    let formErrors = {}
    if (!category.name) {
      formErrors.name = 'Por favor complete este campo.'
    } else if (categories.some(cat => cat.name.toLowerCase() === category.name.toLowerCase())) {
      formErrors.name = 'Esta categoría ya existe.'
    }
    if (!category.description) formErrors.description = 'Por favor complete este campo.'
    return formErrors
  }

  const getUpdatedFields = (initial, current) => {
    let updatedFields = {}
    for (let key in current) {
      if (current[key] !== initial[key]) {
        updatedFields[key] = current[key]
      }
    }
    return updatedFields
  }

  const saveCategory = async (e) => {
    e.preventDefault()

    const formErrors = validateForm()
    if (Object.keys(formErrors).length > 0) {
      setError(formErrors)
      return
    }

    let categoryData
    if (type === 'editarCategory' && id) {
      const updatedFields = getUpdatedFields(initialData, category)
      categoryData = {
        ...updatedFields,
        attachmentId: category.attachmentId
      }
    } else {
      categoryData = {
        name: category.name,
        description: category.description,
        slug: category.slug,
        attachmentId: category.attachmentId
      }
    }

    // console.log(categoryData)

    try {
      let response
      if (type === 'editarCategory' && id) {
        response = await fetchData({ method: 'put', endpoint: `/categories/${id}`, data: categoryData, headers: { 'Authorization': `Bearer ${token}` } })
        setSuccessMessage('Categoría actualizada correctamente')
      } else {
        response = await fetchData({ method: 'post', endpoint: '/categories', data: categoryData, headers: { 'Authorization': `Bearer ${token}` } })
        setSuccessMessage('Categoría registrada correctamente')
        setCategory(initialCategoryState)
      }
      await getCategories()
      setError({})
    } catch (error) {
      console.error(error)
    }
  }

  console.log(category)

  return (
    <>
      {successMessage && <div className="alert alert-success">{successMessage}</div>}
      <form className="grid grid-cols-1 md:grid-cols-2 modalInfo g-15" onSubmit={saveCategory}>
        {id && <span className="txt-accent paragraph"><strong>ID:</strong> {id}</span>}
        <div className="grid col-span-1 md:col-span-2 g-5">
          <label className="txt-accent paragraph"><strong>Nombre:</strong></label>
          <input type="text" name="name" value={category.name} onChange={handleInputChange} className="w-full p-2 border rounded bg-white txt-tertiary" />
          {error.name && <p className="text-red-500 text-xs italic">{error.name}</p>}
          <p className="text-gray-500 text-xs italic">Slug: {category.slug}</p>
        </div>
        <div className="grid col-span-1 md:grid-cols-2 g-5">
          <label className="txt-accent paragraph"><strong>Descripción:</strong></label>
          <input type="text" name="description" value={category.description} onChange={handleInputChange} className="w-full p-2 border rounded bg-white txt-tertiary" />
          {error.description && <p className="text-red-500 text-xs italic">{error.description}</p>}
        </div>
        <span className="bg-base col-span-1 md:col-span-2 grid w-full h-px"></span>
        <div className="col-span-1 md:col-span-2 grid g-5">
          <ListImages images={category.attachment} onImageChange={handleImageChange} onAllImagesUploaded={onAllImagesUploaded} />
        </div>
        {allImagesUploaded || type === 'editarCategory' ? (
          <div className="col-span-1 md:col-span-2 flex justify-center">
            <Buttons text={type === 'editarCategory' ? 'Actualizar' : 'Crear'} type="submit" bColor='#A62639' color='#fff' bgColor='#A62639' />
          </div>
        ) : null}
      </form>
    </>
  )
}

export default FormCategory