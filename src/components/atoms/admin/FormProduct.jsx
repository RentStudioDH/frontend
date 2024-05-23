import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import ListImages from "../form/ListImages"
import { fetchData } from "../../../utils/js/apiRequest"

const FormProduct = ({ type }) => {
  const initialProductState = {
    name: "",
    description: "",
    stock: 0,
    price: 0,
    rentType: "DAILY",
    categoryId: 0,
    attachments: [] // Cambiado de images a attachments
  }

  const [product, setProduct] = useState(initialProductState)
  const [error, setError] = useState({})
  const [successMessage, setSuccessMessage] = useState("")
  const { id } = useParams()

  useEffect(() => {
    if (type === "update" && id) {
      fetchData({ method: 'get', endpoint: `/products/${id}` })
        .then((response) => {
          setProduct({
            ...response,
            attachments: response.attachments || [] // Cambiado de images a attachments
          })
        })
        .catch((error) => {
          console.error(error)
        })
    }
  }, [id, type])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setProduct((prevProduct) => ({ ...prevProduct, [name]: value }))
  }

  const handleImageChange = (images) => {
    const attachments = images.map(image => ({
      id: image.id, // Asegúrate de mantener el id
      url: image.url, // Utiliza 'url' en lugar de 'route' si ese es el campo correcto
      fileName: image.name || "" // Ajusta según tu lógica
    }))
    setProduct((prevProduct) => ({ ...prevProduct, attachments }))
  }

  const validateForm = () => {
    let formErrors = {}
    if (!product.name) formErrors.name = "Por favor complete este campo."
    if (!product.description) formErrors.description = "Por favor complete este campo."
    if (!product.price) formErrors.price = "Por favor complete este campo."
    if (isNaN(parseFloat(product.price))) formErrors.price = "Precio debe ser numérico."
    if (!product.stock) formErrors.stock = "Por favor complete este campo."
    if (isNaN(parseInt(product.stock))) formErrors.stock = "Stock debe ser numérico entero."
    if (!product.categoryId) formErrors.categoryId = "Por favor complete este campo."
    return formErrors
  }

  const saveProduct = (e) => {
    e.preventDefault()

    const formErrors = validateForm()
    if (Object.keys(formErrors).length > 0) {
      setError(formErrors)
      return
    }

    const productData = {
      name: product.name,
      description: product.description,
      stock: parseInt(product.stock),
      price: parseFloat(product.price),
      rentType: product.rentType,
      categoryId: parseInt(product.categoryId),
      attachments: product.attachments.filter(att => att.url && att.fileName) // Asegúrate de enviar solo attachments válidos
    }

    console.log(productData);
    
    if (type === "update" && id) {
      fetchData({ method: 'put', endpoint: `/products/${id}`, data: productData })
        .then((response) => {
          console.log(response)
          setSuccessMessage("Producto actualizado correctamente")
          setError({})
          alert("Producto actualizado correctamente")
        })
        .catch((error) => {
          console.error(error)
        })
    } else {
      fetchData({ method: 'post', endpoint: '/products', data: productData })
        .then((response) => {
          console.log(response)
          setSuccessMessage("Producto registrado correctamente")
          setError({})
          setProduct(initialProductState)
          alert("Producto registrado correctamente")
        })
        .catch((error) => {
          console.error(error)
        })
    }
  }

  return (
    <div className="bg-back p-8 rounded-lg max-w-4xl mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-red-800">{id ? "Actualizar Producto" : "Formulario de ingreso nuevo producto"}</h2>
      {successMessage && <div className="alert alert-success">{successMessage}</div>}
      <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={saveProduct}>
        <div className="col-span-1 md:col-span-2">
          <label className="block text-gray-700">Nombre del producto:</label>
          <input type="text" name="name" value={product.name} onChange={handleInputChange} className="w-full p-2 border rounded bg-white text-black" />
          {error.name && <p className="text-red-500 text-xs italic">{error.name}</p>}
        </div>
        <div className="col-span-1 md:col-span-2">
          <label className="block text-gray-700">Descripción del producto:</label>
          <input type="text" name="description" value={product.description} onChange={handleInputChange} className="w-full p-2 border rounded bg-white text-black" />
          {error.description && <p className="text-red-500 text-xs italic">{error.description}</p>}
        </div>
        <div>
          <label className="block text-gray-700">Precio del producto:</label>
          <input type="text" name="price" value={product.price} onChange={handleInputChange} className="w-full p-2 border rounded bg-white text-black" />
          {error.price && <p className="text-red-500 text-xs italic">{error.price}</p>}
        </div>
        <div>
          <label className="block text-gray-700">Categoría del producto (ID):</label>
          <input type="text" name="categoryId" value={product.categoryId} onChange={handleInputChange} className="w-full p-2 border rounded bg-white text-black" />
          {error.categoryId && <p className="text-red-500 text-xs italic">{error.categoryId}</p>}
        </div>
        <div>
          <label className="block text-gray-700">Stock del producto:</label>
          <input type="text" name="stock" value={product.stock} onChange={handleInputChange} className="w-full p-2 border rounded bg-white text-black" />
          {error.stock && <p className="text-red-500 text-xs italic">{error.stock}</p>}
        </div>
        <div>
          <label className="block text-gray-700">Tipo de Renta:</label>
          <select name="rentType" value={product.rentType} onChange={handleInputChange} className="w-full p-2 border rounded bg-white text-black">
            <option value="DAILY">Diario</option>
            <option value="WEEKLY">Semanal</option>
            <option value="MONTHLY">Mensual</option>
          </select>
        </div>
        <div className="grid g-15">
          <label className="txt-tertiary">Imágenes del producto:</label>
          <ListImages images={product.attachments.map(att => ({ id: att.id, url: att.url, name: att.fileName }))} onImageChange={handleImageChange} />
        </div>
        <div className="col-span-1 md:col-span-2 flex justify-center mt-4">
          <button type="submit" className="bg-red-800 text-white px-4 py-2 rounded">
            {type === "update" ? "Actualizar" : "Ingresar"}
          </button>
        </div>
      </form>
      <style>
        {`
          input:focus {
            outline: none
          }
        `}
      </style>
    </div>
  )
}

export default FormProduct