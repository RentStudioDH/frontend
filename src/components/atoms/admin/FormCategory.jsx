import React, { useState, useEffect } from 'react';
import { fetchData } from '../../../utils/js/apiRequest';
import Buttons from '../Buttons';
import ListImages from '../form/ListImages';
import { useContextGlobal } from '../../../contexts/global.context';

const FormCategory = ({ type, id }) => {
  const initialCategoryState = {
    name: '',
    description: '',
    slug: '',
    attachmentId: null,
    attachments: [] 
  };

  const { state, getCategories } = useContextGlobal();
  const { token, categories } = state;
  const [category, setCategory] = useState(initialCategoryState);
  const [error, setError] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [allImagesUploaded, setAllImagesUploaded] = useState(true);

  useEffect(() => {
    if (type === 'editarCategoria' && id) {
      const categoryToEdit = categories.find((category) => category.id === id);
      if (categoryToEdit) {
        setCategory({
          ...categoryToEdit,
          attachments: categoryToEdit.attachments || (categoryToEdit.attachment ? [categoryToEdit.attachment] : [])
        });
      }
    }
  }, [id, type, categories]);

  const handleNameChange = (e) => {
    const name = e.target.value;
    const slug = generateSlug(name);
    setCategory((prevCategory) => ({ ...prevCategory, name, slug }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCategory((prevCategory) => ({ ...prevCategory, [name]: value }));
  };

  const handleImageChange = (images) => {
    setCategory((prevCategory) => ({
      ...prevCategory,
      attachments: images,
      attachmentId: images.length > 0 ? images[0].id : null
    }));
  };

  const onAllImagesUploaded = (status) => {
    setAllImagesUploaded(status);
  };

  const generateSlug = (name) => {
    let slug = name.trim().toLowerCase();
    slug = slug.replace(/\s+/g, '-');
    slug = slug.replace(/[^\w-]/g, '');
    return `/categoria/${slug}`;
  };

  const validateForm = () => {
    let formErrors = {};
    if (!category.name.trim()) formErrors.name = 'Por favor complete este campo.';
    if (!category.description.trim()) formErrors.description = 'Por favor complete este campo.';
    return formErrors;
  };

  const saveCategory = async (e) => {
    e.preventDefault();

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setError(formErrors);
      return;
    }

    try {
      const categoryData = {
        name: category.name,
        description: category.description,
        slug: category.slug,
        attachmentId: category.attachmentId
      };

      console.log('Datos enviados:', categoryData);

      let response;

      if (type === 'editarCategoria' && id) {
        response = await fetchData({
          method: 'put',
          endpoint: `/categories/${id}`,
          data: categoryData,
          headers: { Authorization: `Bearer ${token}` }
        });
        setSuccessMessage('Categoría actualizada correctamente');
      } else {
        response = await fetchData({
          method: 'post',
          endpoint: '/categories',
          data: categoryData,
          headers: { Authorization: `Bearer ${token}` }
        });
        setSuccessMessage('Categoría registrada correctamente');
        setCategory(initialCategoryState);
      }
      await getCategories();
      setError({});
    } catch (error) {
      console.error('Error posting data to /categories:', error.response?.data || error.message);
      setError({ message: error.response?.data?.message || error.message || 'Ha ocurrido un error al procesar la solicitud.' });
    }
  };

  return (
    <>
      {successMessage && <div className="alert alert-success">{successMessage}</div>}
      <form className="grid grid-cols-1 md:grid-cols-2 modalInfo g-15" onSubmit={saveCategory}>
        <div className="grid col-span-1 md:col-span-2 g-5">
          <label className="txt-accent paragraph"><strong>Nombre:</strong></label>
          <input 
            type="text" 
            name="name" 
            value={category.name} 
            onChange={handleNameChange} 
            className="w-full p-2 border rounded bg-white txt-tertiary" 
          />
          {error.name && <p className="text-red-500 text-xs italic">{error.name}</p>}
        </div>
        <div className="grid col-span-1 md:col-span-2 g-5">
          <label className="txt-accent paragraph"><strong>Descripción:</strong></label>
          <textarea 
            name="description" 
            value={category.description} 
            onChange={handleInputChange} 
            className="w-full p-2 border rounded bg-white txt-tertiary" 
          />
          {error.description && <p className="text-red-500 text-xs italic">{error.description}</p>}
        </div>
        <div className="col-span-1 md:col-span-2 grid g-5">
          <ListImages images={category.attachments} onImageChange={handleImageChange} onAllImagesUploaded={onAllImagesUploaded} message="Subamos la imagen de esta categoría"/>
        </div>
        <span className="bg-base col-span-1 md:col-span-2 grid w-full h-px"></span>
        {allImagesUploaded && (
          <div className="col-span-1 md:col-span-2 flex justify-center">
            <Buttons 
              text={type === 'editarCategoria' ? 'Actualizar' : 'Crear'} 
              type="submit" 
              bColor='#A62639' 
              color='#fff' 
              bgColor='#A62639' 
            />
          </div>
        )}
      </form>
    </>
  );
};

export default FormCategory;
