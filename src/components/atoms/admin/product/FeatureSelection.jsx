const FeatureSelection = ({ features, selectedFeatures, onFeatureSelect }) => {
  const handleFeatureToggle = (featureId) => {
    onFeatureSelect(featureId);
  };

  //Características en el Producto

  return (
    <div className="grid col-span-2 g-5 txt-primary mt-2">
      <label className="txt-accent paragraph">
        <strong>Características:</strong>
      </label>
      <div className="grid grid-flow-raw gap-0.1">
        {features.map((feature) => (
          <div
            key={feature.id}
            className="grid grid-flow-col grid-cols-[40px_auto] p-2 border hover:bg-[#e8d8ff] rounded bg-gray-100 mt-2 gap-6"
          >
            <div className="grid place-items-center">
              <input
                type="checkbox"
                id={`feature-${feature.id}`}
                className="w-4 h-4 txt-primary bg-white border-gray-300 rounded focus:ring-blue-500 focus:ring-2 place-self-center"
                checked={selectedFeatures.includes(feature.id)}
                onChange={() => handleFeatureToggle(feature.id)}
              />
              <label htmlFor={`feature-${feature.id}`} className="sr-only">
                checkbox
              </label>
            </div>

            <div className="grid place-items-start w-full">
              <div>
                <strong>{feature.name}</strong>
              </div>
              <div>{feature.description}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureSelection;
