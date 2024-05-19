import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { createProduct, getProduct } from '../../../utils/js/ProductoService'


const FormAgregarProducto = () => {

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState(0.0)
  const [priceType, setPriceType] = useState('BY_HOUR')
  const [trademark, setTrademark] = useState('')
  const [model, setModel] = useState('')
  const [category, setCategory] = useState('')
  const [stock, setStock] = useState(0)
  const [productSize, setProductSize] = useState('')
  const [megapixeles, setMegapixeles] = useState('')
  const [route, setRoute] = useState('')
  const [images, setImages] = useState([])

  const {id} = useParams();
  const navigator = useNavigate();

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
        setRoute(route);
      }).catch(error => {
        console.error(error);
      })
    }
  }, [id])

  const handleImageChange = (index, value) => {
    const newImages = [...images]
    newImages[index].route = value
    setImages(newImages)
  }

  const addImageField = () => {
    setImages([...images, {id: 0, route: ''}])
  }

  const saveProduct = (e) => {
    e.preventDefault();
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
      navigator('/')

    }).catch(error => {
      console.error(error);
    })
  }


    return (
        <div>
            <form >
                <label >Nombre: </label>
                <input type="text" id='name' name='name' value={name} onChange={(e) => setName(e.target.value)}/>
                <label >Descripción: </label>
                <input 
                    type="text" 
                    id="description" 
                    name="description" 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)} />

                <label >Precio: </label>
                <input 
                    type="number"
                    id='price'
                    name='price'
                    value={price}
                    onChange={(e) => setPrice(e.target.value)} />

                <label >Tipo de Precio: </label>
                <select 
                    id='priceType'
                    name='priceType' 
                    value={priceType} 
                    onChange={(e) => setPriceType(e.target.value)}>
                    <option value="BY_HOUR">Por hora</option>
                    <option value="BY_DAY">Por día</option>
                    <option value="BY_WEEK">Por semana</option>
                    <option value="BY_MONTH">Por mes</option>
                </select>


                <label >Marca: </label>
                <input 
                    type="text" 
                    id="trademark" 
                    name="trademark" 
                    value={trademark} 
                    onChange={(e) => setTrademark(e.target.value)} />

                <label >Modelo: </label>
                <input 
                    type="text" 
                    id="model" 
                    name="model" 
                    value={model} 
                    onChange={(e) => setModel(e.target.value)} />

                <label >Categoría: </label>
                <input 
                    type="text" 
                    id="category" 
                    name="category" 
                    value={category} 
                    onChange={(e) => setCategory(e.target.value)} />

                <label >Stock: </label>
                <input 
                    type="number" 
                    id="stock" 
                    name="stock" 
                    value={stock} 
                    onChange={(e) => setStock(e.target.value)} />

                <label >Tamaño del producto: </label>
                <input 
                    type="text" 
                    id="productSize" 
                    name="productSize" 
                    value={productSize} 
                    onChange={(e) => setProductSize(e.target.value)} />

                <label >Megapíxeles: </label>
                <input 
                    type="text" 
                    id="megapixeles" 
                    name="megapixeles" 
                    value={megapixeles} 
                    onChange={(e) => setMegapixeles(e.target.value)} />
                <div>
                    <label> Imagenes: </label>
                    {images.map((image, index) => (
                        <div key={index}>
                            <input 
                                type="file"
                                value={image.route} 
                                onChange={(e) => handleImageChange(index, e.target.value)}
                            />

                        </div>
                    ))}
                    <button 
                        type='button'
                        onClick={addImageField}    
                    >
                        Añadir Imagen
                    </button>
                </div>

                <button type='submit' onClick={saveProduct}>Guardar</button>
            </form>
        </div>

    )
}

export default FormAgregarProducto