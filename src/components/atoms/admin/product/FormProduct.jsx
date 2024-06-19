import { useState, useEffect } from "react";
import { useContextGlobal } from "../../../../contexts/global.context";
import ListImages from "../../form/ListImages";
import Buttons from "../../Buttons";
import FeatureInput from "../FeatureInput";

const FormProduct = ({ type, id }) => {
  const initialProductState = {
    name: "",
    description: "",
    stock: 0,
    price: 0,
    rentType: "DAILY",
    categoryId: 0,
    attachments: [],
    features: [],
  };

  const { state, getProducts, getCategories, addProduct, updateProduct } =
    useContextGlobal();
  const { data, categories } = state;
  const [product, setProduct] = useState(initialProductState);
  const [error, setError] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [allImagesUploaded, setAllImagesUploaded] = useState(true);
  const [initialData, setInitialData] = useState(initialProductState);

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    if (type === "editarProduct" && id) {
      const productToEdit = data.find((product) => product.id === id);
      if (productToEdit) {
        setProduct({
          ...productToEdit,
          attachments: productToEdit.attachments || [],
          features: productToEdit.features || [],
        });
        setInitialData({
          ...productToEdit,
          attachments: productToEdit.attachments || [],
          features: productToEdit.features || [],
        });
        console.log(
          "Imágenes iniciales del producto:",
          productToEdit.attachments
        );
      }
    }
  }, [id, type, data]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
  };

  const handleImageChange = (images) => {
    setProduct((prevProduct) => ({ ...prevProduct, attachments: images }));
    console.log("Imágenes actualizadas del producto:", images);
  };

  const onAllImagesUploaded = (status) => {
    if (type !== "editarProduct") {
      setAllImagesUploaded(status);
    }
  };

  const validateForm = () => {
    let formErrors = {};
    if (!product.name) formErrors.name = "Por favor complete este campo.";
    if (!product.description)
      formErrors.description = "Por favor complete este campo.";
    if (!product.price) formErrors.price = "Por favor complete este campo.";
    if (isNaN(parseFloat(product.price)))
      formErrors.price = "Precio debe ser numérico.";
    if (!product.stock) formErrors.stock = "Por favor complete este campo.";
    if (isNaN(parseInt(product.stock)))
      formErrors.stock = "Stock debe ser numérico entero.";
    if (!product.categoryId)
      formErrors.categoryId = "Por favor complete este campo.";
    return formErrors;
  };

  const getUpdatedFields = (initial, current) => {
    let updatedFields = {};
    for (let key in current) {
      if (current[key] !== initial[key]) {
        updatedFields[key] = current[key];
      }
    }
    return updatedFields;
  };

  const saveProduct = async (e) => {
    e.preventDefault();

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setError(formErrors);
      return;
    }

    let productData;
    if (type === "editarProduct" && id) {
      const updatedFields = getUpdatedFields(initialData, product);
      productData = {
        ...updatedFields,
        attachmentsIds: product.attachments.map((image) => image.id),
        features: product.features,
      };
    } else {
      productData = {
        name: product.name,
        description: product.description,
        stock: parseInt(product.stock),
        price: parseFloat(product.price),
        rentType: product.rentType,
        categoryId: parseInt(product.categoryId),
        attachments: product.attachments.map((image) => image.id),
        features: product.features,
      };
    }

    try {
      if (type === "editarProduct" && id) {
        await updateProduct({ ...productData, id });
        setSuccessMessage("Producto actualizado correctamente");
      } else {
        await addProduct(productData);
        setSuccessMessage("Producto registrado correctamente");
        setProduct(initialProductState);
      }
      await getProducts();
      setError({});
    } catch (error) {
      console.error(error);
      setError({ message: "Ocurrió un error al procesar la solicitud." });
    }
  };

  const handleDeleteFeature = async (index) => {
    const updatedFeatures = product.features.filter((_, i) => i !== index);

    // Actualiza el estado del producto
    setProduct((prevProduct) => ({
      ...prevProduct,
      features: updatedFeatures,
    }));

    try {
      // Actualiza el producto utilizando el contexto global
      await updateProduct({ ...product, features: updatedFeatures, id });
      setError({});
    } catch (error) {
      console.error(error);
      setError({ message: "Ocurrió un error al procesar la solicitud." });
    }
  };

  return (
    <>
      {successMessage && (
        <div className="alert alert-success">{successMessage}</div>
      )}
      <form
        className="grid grid-cols-1 md:grid-cols-2 modalInfo g-15"
        onSubmit={saveProduct}
      >
        {id && (
          <span className="txt-accent paragraph">
            <strong>ID:</strong> {id}
          </span>
        )}
        <div className="grid col-span-1 md:col-span-2 g-5">
          <label className="txt-accent paragraph">
            <strong>Nombre:</strong>
          </label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleInputChange}
            className="w-full p-2 border rounded bg-white txt-tertiary"
          />
          {error.name && (
            <p className="text-red-500 text-xs italic">{error.name}</p>
          )}
        </div>
        <div className="grid col-span-1 md:col-span-2 g-5">
          <label className="txt-accent paragraph">
            <strong>Descripción:</strong>
          </label>
          <input
            type="text"
            name="description"
            value={product.description}
            onChange={handleInputChange}
            className="w-full p-2 border rounded bg-white txt-tertiary"
          />
          {error.description && (
            <p className="text-red-500 text-xs italic">{error.description}</p>
          )}
        </div>

        <div className="grid col-span-1 md:col-span-2 g-5">
          <label className="txt-accent paragraph">
            <strong>Características:</strong>
          </label>
          <FeatureInput id={id} product={product} />
          <div className="grid mt-2">
            {product.features.map((feature, index) => (
              <div
                key={index}
                className="grid grid-flow-col place-items-start txt-accent p-2 border rounded bg-gray-100 mt-2"
              >
                <div className="grid">
                  <strong>{feature.name}</strong>
                  <p>{feature.description}</p>
                </div>
                <button
                  onClick={() => handleDeleteFeature(index)}
                  className="justify-self-end ml-4 text-red-500 "
                >
                  <i
                    className={`fa-solid fa-trash txt-primary subtitle hover:brightness-50 focus:outline-none`}
                  ></i>
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="grid g-5">
          <label className="txt-accent paragraph">
            <strong>Precio:</strong>
          </label>
          <input
            type="text"
            name="price"
            value={product.price}
            onChange={handleInputChange}
            className="w-full p-2 border rounded bg-white txt-tertiary"
          />
          {error.price && (
            <p className="text-red-500 text-xs italic">{error.price}</p>
          )}
        </div>
        <div className="grid g-5">
          <label className="txt-accent paragraph">
            <strong>Tipo de renta:</strong>
          </label>
          <select
            name="rentType"
            value={product.rentType}
            onChange={handleInputChange}
            className="w-full p-2 border rounded bg-white txt-tertiary"
          >
            <option value="DAILY">Diario</option>
            <option value="WEEKLY">Semanal</option>
            <option value="MONTHLY">Mensual</option>
          </select>
        </div>
        <div className="grid g-5">
          <label className="txt-accent paragraph">
            <strong>Stock:</strong>
          </label>
          <input
            type="text"
            name="stock"
            value={product.stock}
            onChange={handleInputChange}
            className="w-full p-2 border rounded bg-white txt-tertiary"
          />
          {error.stock && (
            <p className="text-red-500 text-xs italic">{error.stock}</p>
          )}
        </div>
        <div className="grid g-5">
          <label className="txt-accent paragraph">
            <strong>Categoría:</strong>
          </label>
          <select
            name="categoryId"
            value={product.categoryId}
            onChange={handleInputChange}
            className="w-full p-2 border rounded bg-white txt-tertiary"
          >
            <option value="">Seleccione una categoría</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          {error.categoryId && (
            <p className="text-red-500 text-xs italic">{error.categoryId}</p>
          )}
        </div>
        <span className="bg-base col-span-1 md:col-span-2 grid w-full h-px"></span>
        <div className="col-span-1 md:col-span-2 grid g-5">
          <ListImages
            images={product.attachments}
            onImageChange={handleImageChange}
            onAllImagesUploaded={onAllImagesUploaded}
            multiple
          />
        </div>
        {allImagesUploaded || type === "editarProduct" ? (
          <div className="col-span-1 md:col-span-2 flex justify-center">
            <Buttons
              text={type === "editarProduct" ? "Actualizar" : "Crear"}
              type="submit"
              bColor="#A62639"
              color="#fff"
              bgColor="#A62639"
            />
          </div>
        ) : null}
      </form>
    </>
  );
};

export default FormProduct;
