import '../../styles/cards.css'

const Card = ({ type, data }) => {

  console.log(type);
  console.log(data);

  const renderCard = () => {
    if (!type || !data) {
      return <div>No hay información para mostrar.</div>
    }

    switch (type) {
      case 'benefit':
        return (
          <>
            <i className={`fa-solid fa-${data.icon} icon`}></i>
            <div className="info">
              <h3 className="txt-center txt-tertiary">{data.title}</h3>
              <p className="txt-center txt-tertiary paragraph">{data.textInfo}</p>
            </div>
          </>
        );
      default:
        return <div>Tipo no soportado.</div>;
    }
  }

  return (
    <div className={`card ${type}`}>{renderCard()}</div>
  )
}

export default Card