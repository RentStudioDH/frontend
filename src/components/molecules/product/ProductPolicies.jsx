import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useContextGlobal } from "../../../contexts/global.context"

const ProductPolicies = ({ data }) => {
  const { id } = useParams()
  const { getProductById } = useContextGlobal()
  const [showPolicies, setShowPolicies] = useState(false)

  useEffect(() => {
    if (data.policies.length !== 0) {
      setShowPolicies(true)
    }
  }, [id, getProductById])

  return (
    <>
      {showPolicies && (
        <div className="bg-white shadow-lg grid br-15 p-15 g-15">
          <h2 className="txt-accent bb-primary subtitle">
            <strong> Reglamentos de producto:</strong>
          </h2>
          <div className="grid grid-flow-row md:grid-flow-col gap-8">
            {data.policies.map((policy) => (
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
  )
}

export default ProductPolicies