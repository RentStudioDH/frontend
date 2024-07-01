import { useState } from "react"

const ProductDetails = ({ data }) => {
  const [features, setFeatures] = useState(data.features || [])
  const initialFeatureCount = 4
  const firstImage = data.attachments && data.attachments.length > 0 ? data.attachments[0].url : "https://digitalhouse-e7-pi.s3.amazonaws.com/-Rhd-l2yWTj6iEqg7EhN9Q%3D%3D.png"

  return (
    <>
      <div className="grid info g-15">
        <div className="bg-white shadow-lg grid br-15 p-15 g-15">
          <h2 className="txt-accent bb-primary subtitle"><strong>Detalles</strong></h2>
          <p className="txt-tertiary paragraph">{data.description}</p>
          <div className="grid g-5">
            <p className="txt-accent paragraph"><strong>Precio:</strong> ${data.price} / {data.rentType}</p>
            <p className="txt-accent paragraph"><strong>Stock:</strong> {data.stock}</p>
          </div>
        </div>
        <div className="bg-white shadow-lg grid br-15 p-15 g-15">
          <h2 className="txt-accent bb-primary subtitle"><strong>Características</strong></h2>
          <div className="grid grid-flow-row place-items-center md:place-items-start g-5">
            {features.slice(0, initialFeatureCount).map((feature) => (
              <div key={feature.id} className="grid grid-flow-row md:grid-flow-col place-items-center g-5">
                <div className="grid size-16 place-items-center">
                  <i className={`fa-solid fa-${feature.icon} txt-quaternary text-2xl`}></i>
                </div>
                <div className="grid place-items-center md:place-items-start w-full info p-15">
                  <h3 className="txt-accent paragraph mb-2"><strong>{feature.name}</strong></h3>
                  <p className="txt-quaternary paragraph">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="br-15 image shadow-lg relative">
        <img src={firstImage} alt={data.title} width={450} height={450} loading="lazy" className="block" />
      </div>
    </>
  )
}

export default ProductDetails