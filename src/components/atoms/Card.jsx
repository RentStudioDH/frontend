import { Link } from 'react-router-dom'
import '../../styles/cards.css'
import Buttons from './Buttons'

const Card = ({ type, data }) => {
  // console.log(type);
  // console.log(data);
  const renderCard = () => {
    if (!type || !data) {
      return <div>No hay información para mostrar.</div>
    }

    switch (type) {
      case 'benefit':
        return (
          <div className={`d-grid card ${type}`}>
            <i className={`fa-solid fa-${data.icon} icon`}></i>
            <div className="info">
              <h3 className="txt-center txt-tertiary">{data.title}</h3>
              <p className="txt-center txt-tertiary paragraph">{data.textInfo}</p>
            </div>
          </div>
        );
      case 'category':
        return (
          <Link className={`d-flex card ${type} br-15`} key={data.id} to={data.path}>
            <img src={`${data.img}`} alt={`${data.title}`} />
            <div className='d-grid pi-center info p-15'>
              <h3 className="txt-white txt-center">{data.title}</h3>
            </div>
          </Link>
        );
      case 'product':
        return (
          <Link className={`d-grid card ${type} br-15`} key={data.id} to={'/producto/' + data.id}>
            <div className='image'>
              <img src={`${data.img}`} alt="" />
            </div>
            <div className='d-flex info p-15'>
              <h3 className="txt-primary">{data.title}</h3>
              <p className="txt-tertiary paragraph">{data.textInfo}</p>
              <p className="txt-primary paragraph" id='price'><strong>{data.price}</strong></p>
              <Buttons text={'Cotizar'} bColor={'#A62639'} color={'#fff'} bgColor={'#A62639'}/>
            </div>
          </Link>
        );
      default:
        return <div>Tipo no soportado.</div>;
    }
  }

  return (
    <>
      { renderCard() }
    </>
  )
}

export default Card