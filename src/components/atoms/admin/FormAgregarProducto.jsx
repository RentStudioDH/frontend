import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { createProduct, getProduct } from '../../../utils/js/ProductoService';

const ProductForm = () => {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [trademark, setTrademark] = useState('');
    const [model, setModel] = useState('');
    const [productSize, setProductSize] = useState('');
    const [megapixeles, setMegapixeles] = useState('');
    const [images, setImages] = useState([]);
    const [price, setPrice] = useState('');
    const [priceType, setPriceType] = useState('BY_HOUR');
    const [category, setCategory] = useState('');
    const [stock, setStock] = useState('');


    const [error, SetError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const {id} = useParams();

    useEffect(()=>{
      if(id){
        getProduct(id).then((response) => {
          const {name, description, price, priceType, trademark, model, category, stock, productSize, megapixeles, route} = response.data;
          setName(name);
          setDescription(description);
          setPrice(price);
          setPriceType(priceType);
          setTrademark(trademark);
          setModel(model);
          setCategory(category);
          setStock(stock);
          setProductSize(productSize);
          setMegapixeles(megapixeles);
          setImages([{route}])
        
        }).catch(error => {
          console.error(error);
        })
      }
    }, [id])

    const handleImageChange = (index, event) => {
      const file = event.target.files[0];
      if(file){
        const newImages = [...images];
        newImages[index].route = URL.createObjectURL(file);
        newImages[index].name = file.name
        setImages(newImages);
      }
    };

    const addImageField = () => {
        setImages([...images, { id:0, route: '' }]);
    };

    const saveProduct = (e) => {
      e.preventDefault();

      let formErrors = {};
      if (!name) formErrors.name = 'Por favor complete este campo.';
      if (!description) formErrors.description = 'Por favor complete este campo.';
      if (!price) formErrors.price = 'Por favor complete este campo.';
      if (isNaN(parseFloat(price))) formErrors.price = 'Precio debe ser numérico.';
      if (!stock) formErrors.stock = 'Por favor complete este campo.';
      if (isNaN(parseInt(stock))) formErrors.stock = 'Stock debe ser numérico entero.';

      if (Object.keys(formErrors).length > 0) {
        SetError(formErrors);
        return;
      }

      const product = {
        name, 
        description, 
        images: images.map(image => ({route: image.route})),
        price, 
        priceType, 
        trademark, 
        model, 
        category, 
        stock, 
        productDetails: {productSize, megapixeles}
      };
  
      console.log(product);

      createProduct(product).then((response) => {
        console.log(response.data)
        setSuccessMessage('Producto registrado correctamente');
        SetError({});

        // Reinicio del formulario
        setName('');
        setDescription('');
        setImages([]);
        setPrice('');
        setPriceType('');
        setTrademark('');
        setModel('');
        setCategory('');
        setStock('');
        setProductSize('');
        setMegapixeles('');
        
        alert("Producto registrado correctamente")
  
      }).catch(error => {
        console.error(error);
      })
    }

    return (
        <div className="bg-gray-100 p-8 rounded-lg max-w-4xl mx-auto">
            <h2 className="text-xl font-semibold mb-4 text-red-800">Formulario de ingreso nuevo producto</h2>
            {successMessage && <div className="alert alert-success">{successMessage}</div>}
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-1 md:col-span-2">
                    <label className="block text-gray-700">Nombre del producto:</label>
                    <input 
                        type="text" 
                        id='name' 
                        name='name' 
                        value={name} 
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-2 border rounded bg-white text-black" 
                    />
                    {error.name && <p className="text-red-500 text-xs italic">{error.name}</p>}
                </div>
                <div className="col-span-1 md:col-span-2">
                    <label className="block text-gray-700">Descripción del producto:</label>
                    <input 
                        type="text" 
                        id="description" 
                        name="description" 
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full p-2 border rounded bg-white text-black" 
                    />
                    {error.description && <p className="text-red-500 text-xs italic">{error.description}</p>}

                </div>
                <div>
                    <label className="block text-gray-700">Precio del producto:</label>
                    <input 
                        type="text" 
                        id='price'
                        value={price} 
                        onChange={(e) => setPrice(e.target.value)} 
                        className="w-full p-2 border rounded bg-white text-black" 
                    />
                    {error.price && <p className="text-red-500 text-xs italic">{error.price}</p>}

                </div>
                <div>
                    <label className="block text-gray-700">Categoría del producto:</label>
                    <input 
                        type="text" 
                        id='category'
                        value={category} 
                        onChange={(e) => setCategory(e.target.value)} 
                        className="w-full p-2 border rounded bg-white text-black" 
                    />
                    {error.category && <p className="text-red-500 text-xs italic">{error.category}</p>}

                </div>
                <div>
                    <label className="block text-gray-700">Stock del producto:</label>
                    <input 
                        id='stock'
                        type="text" 
                        value={stock} 
                        onChange={(e) => setStock(e.target.value)} 
                        className="w-full p-2 border rounded bg-white text-black" 
                    />
                    {error.stock && <p className="text-red-500 text-xs italic">{error.stock}</p>}

                </div>
                <div>
                  <label className='block text-gray-700'>Tipo de Precio: </label>
                    <select 
                        className='w-full p-2 border rounded bg-white text-black'
                        id='priceType'
                        name='priceType' 
                        value={priceType} 
                        onChange={(e) => setPriceType(e.target.value)}>
                        <option value="BY_HOUR">Por hora</option>
                        <option value="BY_DAY">Por día</option>
                        <option value="BY_WEEK">Por semana</option>
                        <option value="BY_MONTH">Por mes</option>
                  </select>
                </div>
                <div>
                    <label className="block text-gray-700 mb-2">Imagen del producto:</label>
                    {images.map((image, index) => (
                        <div key={index} className="flex items-center mb-2 mr-2">
                            <input 
                                type="file"                            
                                onChange={(e) => handleImageChange(index, e)}
                                className="block w-full text-lg text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none bg-white dark:border-gray-600 dark:placeholder-gray-400"
                            />
                            {image.name && <span className='ml-2'>{image.name}</span>}
                        </div>
                    ))}
                    <button 
                        type='button'
                        onClick={addImageField}    
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        Añadir Imagen
                    </button>
                </div>
                
                <div className="col-span-1 md:col-span-2">
                    <h3 className="text-lg font-semibold mb-2 text-red-800">Información adicional</h3>
                </div>
                <div>
                    <label className="block text-gray-700">Marca:</label>
                    <input 
                        type="text"
                        id="trademark" 
                        name="trademark" 
                        value={trademark} 
                        className="w-full p-2 border rounded bg-white text-black" 
                        onChange={(e) => setTrademark(e.target.value)}
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Modelo:</label>
                    <input 
                        type="text"
                        id="model" 
                        name="model" 
                        value={model} 
                        onChange={(e) => setModel(e.target.value)}
                        className="w-full p-2 border rounded bg-white text-black" 
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Tamaño:</label>
                    <input 
                        type="text" 
                        id="productSize" 
                        name="productSize" 
                        value={productSize} 
                        onChange={(e) => setProductSize(e.target.value)}
                        className="w-full p-2 border rounded bg-white text-black" 
                    />
                </div>
                
                <div>
                    <label className="block text-gray-700">Megapixeles:</label>
                    <input 
                        type="text" 
                        id="megapixeles" 
                        name="megapixeles" 
                        value={megapixeles} 
                        onChange={(e) => setMegapixeles(e.target.value)}
                        className="w-full p-2 border rounded bg-white text-black" 
                    />
                </div>
                
                <div className="col-span-1 md:col-span-2 flex justify-center mt-4">
                    <button 
                        type="submit" 
                        onClick={saveProduct}
                        className="bg-red-800 text-white px-4 py-2 rounded"
                    >
                        Ingresar
                    </button>
                </div>
            </form>
            <style>
                {
                    `
                    input:focus {
                        outline: none;
                    }
                `
                }
            </style>
        </div>
    );
};

export default ProductForm;
