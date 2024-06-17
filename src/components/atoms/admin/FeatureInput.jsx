import React, { useEffect, useState } from "react";
import { useContextGlobal } from "../../../contexts/global.context";
import Buttons from "../Buttons";

const FeatureInput = ({ id, product }) => {
  const { updateProduct } = useContextGlobal();
  const [error, setError] = useState({});
  const { features } = product;
  const [productModify, setProductModify] = useState({ ...product });
  const [featureCurrent, setFeatureCurrent] = useState({
    name: "",
    description: "",
    icon: "",
  });

  useEffect(() => {
    // Sincroniza productModify con product cuando product cambia

    setProductModify({ ...product });
  }, [product]);

  //   console.log(productModify);

  const handleFeatureChange = (e) => {
    const { name, value } = e.target;
    setFeatureCurrent((prevFeature) => ({ ...prevFeature, [name]: value }));
  };

  const handleAddFeature = async (e) => {
    e.preventDefault();

    const newFeature = {
      name: featureCurrent.name,
      description: featureCurrent.description,
      icon: featureCurrent.icon,
    };
    const updatedFeatures = [...productModify.features, newFeature];

    setProductModify((prevProductModify) => ({
      ...prevProductModify,
      features: updatedFeatures,
    }));

    // Limpia el estado de featureCurrent para la próxima entrada
    setFeatureCurrent({ name: "", description: "", icon: "" });

    try {
      await updateProduct({ ...productModify, features: updatedFeatures, id });
      setError({});
    } catch (error) {
      console.error(error);
      setError({ message: "Ocurrió un error al procesar la solicitud." });
    }
  };

  return (
    <div className="feature-input">
      <input
        type="text"
        name="name"
        placeholder="Nombre"
        value={featureCurrent.name}
        onChange={handleFeatureChange}
        className="w-full p-2 border rounded bg-white txt-tertiary"
      />
      <input
        type="text"
        name="description"
        placeholder="Descripción"
        value={featureCurrent.description}
        onChange={handleFeatureChange}
        className="w-full p-2 border rounded bg-white txt-tertiary"
      />
      <input
        type="text"
        name="icon"
        placeholder="Ícono"
        onChange={handleFeatureChange}
        value={featureCurrent.icon}
        className="w-full p-2 border rounded bg-white txt-tertiary"
      />

      <div className="col-span-1 md:col-span-2 flex justify-start btn btn-primary mt-2">
        <Buttons
          onClick={handleAddFeature}
          text="+ Agregar Característica"
          type="button"
          bColor="#000"
          color="#000"
        />
      </div>
    </div>
  );
};

export default FeatureInput;
