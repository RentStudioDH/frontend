import { useState, useEffect } from "react";
import { fetchData } from "../../../../utils/js/apiRequest";
import Buttons from "../../Buttons";
import FeatureInput from "./FeatureInput";
import PolicyInput from "./PolicyInput";
import ListImages from "../../form/ListImages";
import { useContextGlobal } from "../../../../contexts/global.context";
import Swal from "sweetalert2";
import { ColorRing } from "react-loader-spinner";

const FormCategory = ({ type, id }) => {
  const initialCategoryState = {
    name: "",
    description: "",
    slug: "",
    attachmentId: null,
    attachments: [],
    features: [],
    policies: [],
  };
  const [loading, setLoading] = useState(false);
  const { state, getCategories } = useContextGlobal();
  const { token, categories } = state;
  const [category, setCategory] = useState(initialCategoryState);
  const [error, setError] = useState({});
  const [allImagesUploaded, setAllImagesUploaded] = useState(true);

  useEffect(() => {
    if (type === "editarCategoria" && id) {
      const categoryToEdit = categories.find((category) => category.id === id);
      if (categoryToEdit) {
        setCategory({
          ...categoryToEdit,
          attachments:
            categoryToEdit.attachments ||
            (categoryToEdit.attachment ? [categoryToEdit.attachment] : []),
          features:
            categoryToEdit.features ||
            (categoryToEdit.features ? [categoryToEdit.features] : []),
          policies:
            categoryToEdit.policies ||
            (categoryToEdit.policies ? [categoryToEdit.policies] : []),
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
      attachmentId: images.length > 0 ? images[0].id : null,
    }));
  };

  const onAllImagesUploaded = (status) => {
    setAllImagesUploaded(status);
  };

  const generateSlug = (name) => {
    let slug = name.trim().toLowerCase();
    slug = slug.replace(/\s+/g, "-");
    slug = slug.replace(/[^\w-]/g, "");
    return `/categoria/${slug}`;
  };

  const validateForm = () => {
    let formErrors = {};
    if (!category.name.trim())
      formErrors.name = "Por favor complete este campo.";
    if (!category.description.trim())
      formErrors.description = "Por favor complete este campo.";
    return formErrors;
  };

  const handleAddFeature = (feature) => {
    const updatedFeatures = [...category.features, feature];
    setCategory((prevCategory) => ({
      ...prevCategory,
      features: updatedFeatures,
    }));
  };

  const handleDeleteFeature = (index) => {
    const updatedFeatures = category.features.filter((_, i) => i !== index);
    setCategory((prevCategory) => ({
      ...prevCategory,
      features: updatedFeatures,
    }));
  };

  const handleAddPolicy = (policy) => {
    const updatedPolicies = [...category.policies, policy];
    setCategory((prevCategory) => ({
      ...prevCategory,
      policies: updatedPolicies,
    }));
  };

  const handleDeletePolicy = (index) => {
    const updatedPolicies = category.policies.filter((_, i) => i !== index);
    setCategory((prevCategory) => ({
      ...prevCategory,
      policies: updatedPolicies,
    }));
  };

  const saveCategory = async (e) => {
    e.preventDefault();

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setError(formErrors);
      return;
    }
    setLoading(true);

    try {
      const categoryData = {
        name: category.name,
        description: category.description,
        slug: category.slug,
        attachmentId: category.attachmentId,
        features: category.features,
        policies: category.policies,
      };

      console.log("Datos enviados:", categoryData);

      let response;

      if (type === "editarCategoria" && id) {
        response = await fetchData({
          method: "put",
          endpoint: `/categories/${id}`,
          data: categoryData,
          headers: { Authorization: `Bearer ${token}` },
        });
        Swal.fire({
          title: "¡Éxito!",
          text: "Categoría actualizada correctamente",
          icon: "success",
          showConfirmButton: false,
          timer: 1800,
        });
      } else {
        response = await fetchData({
          method: "post",
          endpoint: "/categories",
          data: categoryData,
          headers: { Authorization: `Bearer ${token}` },
        });
        Swal.fire({
          title: "¡Éxito!",
          text: "Categoría registrada correctamente",
          icon: "success",
          showConfirmButton: false,
          timer: 1800,
        });
        setCategory(initialCategoryState);
      }
      await getCategories();
      setError({});
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Ha ocurrido un error al procesar la solicitud.";

      if (errorMessage.includes("ID de archivo adjunto no válido")) {
        Swal.fire({
          title: "Error",
          text: "Tamaño de imagen muy grande",
          icon: "error",
          confirmButtonText: "Aceptar",
          confirmButtonColor: "#A29C9B",
        });
      } else if (errorMessage.includes("Request failed with status code 403")) {
        Swal.fire({
          title: "Error",
          text: "El servidor ha rechazado su solicitud",
          icon: "error",
          confirmButtonText: "Aceptar",
          confirmButtonColor: "#A29C9B",
        });
      } else {
        Swal.fire({
          title: "Error",
          text: errorMessage,
          icon: "error",
          confirmButtonText: "Aceptar",
          confirmButtonColor: "#A29C9B",
        });
      }

      setError({ message: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form
        className="grid grid-cols-1 md:grid-cols-2 modalInfo g-15"
        onSubmit={saveCategory}
      >
        <div className="grid col-span-1 md:col-span-2 g-5">
          <label className="txt-accent paragraph">
            <strong>Nombre:</strong>
          </label>
          <input
            type="text"
            name="name"
            value={category.name}
            onChange={handleNameChange}
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
          <textarea
            name="description"
            value={category.description}
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
          <FeatureInput
            onAddFeature={handleAddFeature}
            onDeleteFeature={handleDeleteFeature}
          />
          <div className="grid mt-2">
            {category.features.map((feature, index) => (
              <div
                key={index}
                className="grid grid-flow-col grid-cols-[40px_auto_auto] txt-accent p-2 border rounded bg-gray-100 mt-2 gap-4"
              >
                <div className="grid size-10 place-items-center">
                  <i
                    className={`fa solid fa-${feature.icon} txt-quaternary text-2xl`}
                  ></i>
                </div>

                <div className="grid place-items-start w-full">
                  <strong>{feature.name}</strong>
                  <p>{feature.description}</p>
                </div>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleDeleteFeature(index);
                  }}
                  className="justify-self-end self-center ml-4 text-red-500 "
                >
                  <i
                    className={`fa-solid fa-trash txt-primary subtitle hover:brightness-50 focus:outline-none`}
                  ></i>
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="grid col-span-1 md:col-span-2 g-5">
          <label className="txt-accent paragraph">
            <strong>Políticas:</strong>
          </label>
          <PolicyInput
            onAddPolicy={handleAddPolicy}
            onDeletePolicy={handleDeletePolicy}
          />
          <div className="grid mt-2">
            {category.policies.map((policy, index) => (
              <div
                key={index}
                className="grid grid-flow-col place-items-start txt-accent p-2 border rounded bg-gray-100 mt-2"
              >
                <div className="grid">
                  <strong>{policy.title}</strong>
                  <p>{policy.description}</p>
                </div>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleDeletePolicy(index);
                  }}
                  className="justify-self-end self-center ml-4 text-red-500 "
                >
                  <i
                    className={`fa-solid fa-trash txt-primary subtitle hover:brightness-50 focus:outline-none`}
                  ></i>
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="col-span-1 md:col-span-2 grid g-5">
          <ListImages
            images={category.attachments}
            onImageChange={handleImageChange}
            onAllImagesUploaded={onAllImagesUploaded}
            message="Subamos la imagen de esta categoría"
          />
        </div>
        <span className="bg-base col-span-1 md:col-span-2 grid w-full h-px"></span>
        {allImagesUploaded && (
          <div className="col-span-1 md:col-span-2 flex justify-center">
            <Buttons
              text={type === "editarCategoria" ? "Actualizar" : "Crear"}
              type="submit"
              bColor="#A62639"
              color="#fff"
              bgColor="#A62639"
            />
            {loading && (
              <div className="loading-spinner">
                <ColorRing
                  visible={true}
                  height="80"
                  width="80"
                  ariaLabel="color-ring-loading"
                  wrapperStyle={{}}
                  wrapperClass="color-ring-wrapper"
                  colors={[
                    "#A62639",
                    "#DB324D",
                    "#56494E",
                    "#A29C9B",
                    "#511C29",
                  ]}
                />
              </div>
            )}
          </div>
        )}
      </form>
    </>
  );
};

export default FormCategory;
