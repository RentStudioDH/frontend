import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { createProduct, getProduct } from "../../../utils/js/ProductoService";

const FormProduct = () => {
  const initialProductState = {
    name: "",
    description: "",
    trademark: "",
    model: "",
    productSize: "",
    megapixeles: "",
    images: [],
    price: "",
    priceType: "BY_HOUR",
    category: "",
    stock: "",
  };

  const [product, setProduct] = useState(initialProductState);
  const [error, setError] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getProduct(id)
        .then((response) => {
          setProduct({
            ...response.data,
            images: [{ route: response.data.route }],
          });
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
  };

  const handleImageChange = (index, event) => {
    const file = event.target.files[0];
    if (file) {
      const newImages = [...product.images];
      newImages[index] = { route: URL.createObjectURL(file), name: file.name };
      setProduct((prevProduct) => ({ ...prevProduct, images: newImages }));
    }
  };

  const addImageField = () => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      images: [...prevProduct.images, { id: 0, route: "" }],
    }));
  };

  const validateForm = () => {
    let formErrors = {};
    if (!product.name) formErrors.name = "Por favor complete este campo.";
    if (!product.description) formErrors.description = "Por favor complete este campo.";
    if (!product.price) formErrors.price = "Por favor complete este campo.";
    if (isNaN(parseFloat(product.price))) formErrors.price = "Precio debe ser numérico.";
    if (!product.stock) formErrors.stock = "Por favor complete este campo.";
    if (isNaN(parseInt(product.stock))) formErrors.stock = "Stock debe ser numérico entero.";

    return formErrors;
  };

  const saveProduct = (e) => {
    e.preventDefault();

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setError(formErrors);
      return;
    }

    const productData = {
      ...product,
      images: product.images.map((image) => ({ route: image.route })),
      productDetails: {
        productSize: product.productSize,
        megapixeles: product.megapixeles,
      },
    };

    createProduct(productData)
      .then((response) => {
        console.log(response.data);
        setSuccessMessage("Producto registrado correctamente");
        setError({});
        setProduct(initialProductState);
        alert("Producto registrado correctamente");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="bg-gray-100 p-8 rounded-lg max-w-4xl mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-red-800">Formulario de ingreso nuevo producto</h2>
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
          <label className="block text-gray-700">Categoría del producto:</label>
          <input type="text" name="category" value={product.category} onChange={handleInputChange} className="w-full p-2 border rounded bg-white text-black" />
          {error.category && <p className="text-red-500 text-xs italic">{error.category}</p>}
        </div>
        <div>
          <label className="block text-gray-700">Stock del producto:</label>
          <input type="text" name="stock" value={product.stock} onChange={handleInputChange} className="w-full p-2 border rounded bg-white text-black" />
          {error.stock && <p className="text-red-500 text-xs italic">{error.stock}</p>}
        </div>
        <div>
          <label className="block text-gray-700">Tipo de Precio:</label>
          <select name="priceType" value={product.priceType} onChange={handleInputChange} className="w-full p-2 border rounded bg-white text-black">
            <option value="BY_HOUR">Por hora</option>
            <option value="BY_DAY">Por día</option>
            <option value="BY_WEEK">Por semana</option>
            <option value="BY_MONTH">Por mes</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Imagen del producto:</label>
          {product.images.map((image, index) => (
            <div key={index} className="flex items-center mb-2 mr-2">
              <input type="file" onChange={(e) => handleImageChange(index, e)} className="block w-full text-lg text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none bg-white dark:border-gray-600 dark:placeholder-gray-400" />
              {image.name && <span className="ml-2">{image.name}</span>}
            </div>
          ))}
          <button type="button" onClick={addImageField} className="bg-blue-500 text-white px-4 py-2 rounded">
            Añadir Imagen
          </button>
        </div>
        <div className="col-span-1 md:col-span-2">
          <h3 className="text-lg font-semibold mb-2 text-red-800">Información adicional</h3>
        </div>
        <div>
          <label className="block text-gray-700">Marca:</label>
          <input type="text" name="trademark" value={product.trademark} onChange={handleInputChange} className="w-full p-2 border rounded bg-white text-black" />
        </div>
        <div>
          <label className="block text-gray-700">Modelo:</label>
          <input type="text" name="model" value={product.model} onChange={handleInputChange} className="w-full p-2 border rounded bg-white text-black" />
        </div>
        <div>
          <label className="block text-gray-700">Tamaño:</label>
          <input type="text" name="productSize" value={product.productSize} onChange={handleInputChange} className="w-full p-2 border rounded bg-white text-black" />
        </div>
        <div>
          <label className="block text-gray-700">Megapixeles:</label>
          <input type="text" name="megapixeles" value={product.megapixeles} onChange={handleInputChange} className="w-full p-2 border rounded bg-white text-black" />
        </div>
        <div className="col-span-1 md:col-span-2 flex justify-center mt-4">
          <button type="submit" className="bg-red-800 text-white px-4 py-2 rounded">
            Ingresar
          </button>
        </div>
      </form>
      <style>
        {`
          input:focus {
            outline: none;
          }
        `}
      </style>
    </div>
  );
};

export default FormProduct;
