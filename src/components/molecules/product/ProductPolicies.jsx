import { useEffect, useState } from "react";
import { fetchData } from "../../../utils/js/apiRequest";
import { useContextGlobal } from "../../../contexts/global.context";
import { useParams } from "react-router-dom";

const ProductPolicies = ({ data }) => {
  const { id } = useParams();
  const { getProductById } = useContextGlobal();
  const [policies, setPolicies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        const policiesData = await fetchData({
          method: "get",
          endpoint: `/public/products/policies`,
          requireAuth: false,
        });
        setPolicies(policiesData);
      } catch (error) {
        setError(new Error("No se pudo obtener las políticas del producto."));
      }
    };
    fetchPolicies();
  }, [id, getProductById]);

  return (
    <div className="bg-white shadow-lg grid br-15 p-15 g-15">
      <h2 className="txt-accent bb-primary subtitle">
        <strong> Reglamentos de producto:</strong>
      </h2>
      <div className="flex">
        {policies.map((policy) => (
          <div key={policy.id} className=" p-15">
            <p className="txt-accent paragraph">
              <strong>{policy.title}</strong>
            </p>
            <p className="txt-tertiary paragraph">{policy.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductPolicies;
