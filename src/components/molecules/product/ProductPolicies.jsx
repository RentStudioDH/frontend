import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useContextGlobal } from "../../../contexts/global.context";

const ProductPolicies = () => {
  const { id } = useParams();
  const { state } = useContextGlobal();
  const [showPolicies, setShowPolicies] = useState(false);
  const [policies, setPolicies] = useState([]);

  useEffect(() => {
    if (!showPolicies) {
      const loadPolicies = () => {
        const productId = parseInt(id);
        // Encuentra el producto en el estado global
        const product = state.data.find(product => product.id === productId);

        if (product) {
          console.log('Product found:', product);

          // Obtén la categoría del producto
          const productCategoryName = product.category.name;
          console.log('Product category:', productCategoryName);

          // Encuentra la categoría en el estado global
          const category = state.categories.find(category => category.name === productCategoryName);

          if (category && category.policies) {
            console.log('Category found:', category);
            // Actualiza el estado con las políticas de la categoría
            setPolicies(category.policies);
            setShowPolicies(true);
          } else {
            console.log('Category not found or no policies:', category);
            setShowPolicies(false);
          }
        } else {
          console.log('Product not found with id:', productId);
          setShowPolicies(false);
        }
      };

      loadPolicies();
    }
  }, [id, state.data, state.categories, showPolicies]); // Solo se ejecuta una vez al montar el componente y cuando las dependencias cambian

  // console.log('Policies:', policies);
  return (
    <>
      {showPolicies && (
        <div className="bg-white shadow-lg grid br-15 p-15 g-15">
          <h2 className="txt-accent bb-primary subtitle">
            <strong> Reglamentos de producto:</strong>
          </h2>
          <div className="grid grid-flow-row md:grid-flow-col gap-8">
            {policies.map((policy) => (
              <div key={policy.id} className="m-8">
                <p className="flex items-start txt-accent paragraph pb-8">
                  <strong>{policy.title}</strong>
                </p>
                <p className="txt-tertiary paragraph">{policy.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default ProductPolicies;
