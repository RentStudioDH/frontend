import { Link } from 'react-router-dom'
import { useContextGlobal } from '../../contexts/global.context'

const Cards = ({ type, data, openModal, isEditor, onRoleChange }) => {
  const { state, toggleFav } = useContextGlobal()
  const { favs, isLoggedIn, isDesktop } = state
  const isFav = favs.includes(data.id)

  const truncateText = (text, wordLimit) => {
    const words = text.split(' ')
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(' ') + ' ...'
    }
    return text
  }

  const renderFeatures = (features) => {
    if (!features || features.length === 0) return null

    const maxVisibleFeatures = 5
    const visibleFeatures = features.slice(0, maxVisibleFeatures)
    const remainingFeaturesCount = features.length - maxVisibleFeatures

    return (
      <div className="inline-flex flex-wrap items-center g-15 group">
        {visibleFeatures.map(feature => (
          <span key={feature.id} className="cursor-pointer">
            <i className={`fa-solid fa-${feature.icon} txt-primary text-center paragraph`}></i>
          </span>
        ))}
        {remainingFeaturesCount > 0 && (
          <span className="cursor-pointer">
            +{remainingFeaturesCount}
          </span>
        )}
      </div>
    )
  }

  const handleRoleChange = (event) => {
    const newRole = event.target.checked ? 'ROLE_EDITOR' : 'ROLE_USER'
    console.log(`Cambiando rol del usuario ${data.id} a ${newRole}`);
    onRoleChange(data.id, newRole)
  }

  const renderCard = () => {
    if (!type) {
      return <div>No hay información para mostrar.</div>
    }

    const firstImage = data.attachments && data.attachments.length > 0 ? data.attachments[0].url : 'https://digitalhouse-e7-pi.s3.amazonaws.com/-Rhd-l2yWTj6iEqg7EhN9Q%3D%3D.png'

    if ((type === 'benefit' || type === 'category' || type === 'product' || type === 'adminListProduct' || type === 'favorite') && !data) {
      return <div>No hay información para mostrar.</div>
    }

    switch (type) {
      case 'benefit':
        return (
          <div className={`grid card ${type} g-5`}>
            <i className={`fa-solid fa-${data.icon} txt-quaternary icon`}></i>
            <div className="info">
              <h3 className="text-center txt-tertiary subtitle"><strong>{data.title}</strong></h3>
              <p className="text-center txt-tertiary paragraph">{data.textInfo}</p>
            </div>
          </div>
        )
      case 'category':
        return (
          <Link className={`flex items-end shadow-lg card ${type} br-15`} key={data.id} to={data.slug}>
            <img src={`${data.attachment.url}`} alt={`${data.name}`} loading='lazy' />
            <div className='grid place-items-center w-full info p-15'>
              <h3 className="text-white text-center subtitle"><strong>{data.name}</strong></h3>
            </div>
          </Link>
        )
      case 'product':
        return (
          <div className="relative flex w-full flex-col md:flex-row rounded-lg bg-white bg-clip-border text-gray-700 shadow-lg br-15">
            <div className="w-auto md:w-[30%] relative overflow-hidden shadow-lg br-15 bg-blue-gray-500 bg-clip-border shadow-blue-gray-500/40 m-[15px]">
              <img src={firstImage} alt={data.name} className="w-full h-[200px] md:h-full object-cover" />
              <div className="absolute inset-0 w-full h-full to-bg-black-10 bg-gradient-to-tr from-transparent via-transparent to-black/60"></div>
            </div>
            <div className="w-full md:w-[70%] flex flex-col justify-between p-15 g-15">
              <div className='grid g-5'>
                <h3 className="flex justify-between txt-primary subtitle g-5"><strong>{truncateText(data.name, 4)}</strong> {isLoggedIn && <i onClick={() => toggleFav(data.id)} className={`${!isDesktop && 'absolute top-[30px] right-[30px]'} fa-${isFav ? 'solid' : 'regular' } fa-heart cursor-pointer txt-primary subtitle`}></i>}</h3>
                <p className="txt-tertiary paragraph">{truncateText(data.description, 15)}</p>
                <p className="flex items-center txt-tertiary paragraph g-5"><i className="text-yellow-500 fa-solid fa-star"></i>5.0</p>
                <p className="txt-primary subtitle" id='price'><strong>${data.price} / {data.rentType}</strong></p>
              </div>
              {renderFeatures(data.features)}
              <Link className='h-fit txt-accent text-right paragraph hover:txt-primary' to={'/producto/' + data.id}><strong>Ver más <i className="fa-solid fa-chevron-right legal"></i></strong></Link>
            </div>
          </div>
        )
      case 'productRecomended':
        return (
          <div className="relative flex w-full flex-col md:flex-row rounded-lg bg-white bg-clip-border text-gray-700 shadow-lg br-15">
            <div className="w-auto md:w-[30%] relative overflow-hidden shadow-lg br-15 bg-blue-gray-500 bg-clip-border shadow-blue-gray-500/40 m-[15px]">
              <img src={firstImage} alt={data.name} className="w-full h-[200px] md:h-full object-cover" />
              <div className="absolute inset-0 w-full h-full to-bg-black-10 bg-gradient-to-tr from-transparent via-transparent to-black/60"></div>
            </div>
            <div className="w-full md:w-[70%] flex flex-col justify-between p-15 g-15">
              <div className='grid g-5'>
                <h3 className="flex justify-between txt-primary subtitle g-5"><strong>{truncateText(data.name, 4)}</strong> {isLoggedIn && <i className={`${!isDesktop && 'absolute top-[30px] right-[30px]'} fa-${isFav ? 'solid' : 'regular' } fa-heart txt-primary subtitle`}></i>}</h3>
                <p className="txt-tertiary paragraph">{truncateText(data.description, 15)}</p>
                <p className="flex items-center txt-tertiary paragraph g-5"><i className="text-yellow-500 fa-solid fa-star"></i>5.0</p>
                <p className="txt-primary subtitle" id='price'><strong>${data.price} / {data.rentType}</strong></p>
              </div>
              {renderFeatures(data.features)}
              <Link className='h-fit txt-accent text-right paragraph hover:txt-primary' to={'/producto/' + data.id}><strong>Ver más <i className="fa-solid fa-chevron-right legal"></i></strong></Link>
            </div>
          </div>
        )
      case 'adminDash':
        return (
          <Link className={`group bg-accent grid h-full hover:shadow-lg card ${type} br-15 p-15 g-15`} to={data.link}>
            <h3 className="text-white bigtitle bb-primary"><strong>{data.number}</strong></h3>
            <p className="text-white subtitle group-hover:font-bold">{data.title}</p>
          </Link>
        )
      case 'adminListProduct':
        return (
          <tr className="bg-white hover:bg-accent txt-quaternary border-b paragraph">
            <td className="w-4 p-15">
              <div className="flex items-center">
                <input id={`checkbox-table-search-${data.id}`} type="checkbox" className="w-4 h-4 txt-primary bg-white border-gray-300 rounded focus:ring-blue-500 focus:ring-2" />
                <label htmlFor={`checkbox-table-search-${data.id}`} className="sr-only">checkbox</label>
              </div>
            </td>
            <th scope="row" className="p-15">#{data.id}</th>
            <td className="p-15">{data.name}</td>
            <td className="p-15">{data.category.name}</td>
            <td className="p-15">{data.stock}</td>
            <td className="flex items-center p-15 g-5">
              <button className="txt-primary subtitle hover:brightness-50 focus:outline-none" onClick={() => openModal('editarProduct', data.id)}><i className="fa-solid fa-pen-to-square"></i></button>
              <Link className='txt-primary subtitle hover:brightness-50 focus:outline-none' key={data.id} to={'/producto/' + data.id}><i className="fa-solid fa-eye"></i></Link>
              <button className="txt-primary subtitle hover:brightness-50 focus:outline-none" onClick={() => openModal('eliminarProduct', data.id)}><i className="fa-solid fa-trash"></i></button>
            </td>
          </tr>
        )
      case 'adminListCategory':
        return (
          <tr className="bg-white hover:bg-accent txt-quaternary border-b paragraph">
            <td className="w-4 p-15">
              <div className="flex items-center">
                <input id={`checkbox-table-search-${data.id}`} type="checkbox" className="w-4 h-4 txt-primary bg-white border-gray-300 rounded focus:ring-blue-500 focus:ring-2" />
                <label htmlFor={`checkbox-table-search-${data.id}`} className="sr-only">checkbox</label>
              </div>
            </td>
            <th scope="row" className="p-15">#{data.id}</th>
            <td className="p-15">{data.name}</td>
            <td className="p-15">{data.productCount}</td>
            <td className="flex items-center p-15 g-5">
              <button className="txt-primary subtitle hover:brightness-50 focus:outline-none" onClick={() => openModal('editarCategoria', data.id)}><i className="fa-solid fa-pen-to-square"></i></button>
              {data.productCount === 0 && (
                <button className="txt-primary subtitle hover:brightness-50 focus:outline-none" onClick={() => openModal('eliminarCategoria', data.id)}><i className="fa-solid fa-trash"></i></button>
              )}
            </td>
          </tr>
        )
      case 'adminListUser':
        return (
          <tr className="bg-white hover:bg-accent txt-quaternary border-b paragraph">
            <td className="w-4 p-15">
              <div className="flex items-center">
                <input id={`checkbox-table-search-${data.id}`} type="checkbox" className="w-4 h-4 txt-primary bg-white border-gray-300 rounded focus:ring-blue-500 focus:ring-2" />
                <label htmlFor={`checkbox-table-search-${data.id}`} className="sr-only">checkbox</label>
              </div>
            </td>
            <th scope="row" className="p-15">#{data.id}</th>
            <td className="p-15">{data.firstName} {data.lastName} <br /> <span className='legal'>{data.email}</span></td>
            <td className="p-15">
              <label className="inline-flex items-center cursor-pointer g-5">
                <input type="checkbox" checked={isEditor} onChange={handleRoleChange} className="sr-only peer" />
                <div className="relative w-9 h-5 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                <span className="txt-tertiary group-checked:font-bold">Editor</span>
              </label>
            </td>
          </tr>
        )
      case 'error-admin':
        return (
          <section className='w-full grid place-items-center p-8'>
            <div className='bg-white grid place-items-center shadow-lg w-fit br-15 p-6 g-15'>
              <img src="/errores/screen-error-mobile.png" alt='Error admin mobile' title='Error admin mobile' width={260} height={209} loading='lazy' />
              <div className="info">
                <h1 className='txt-tertiary text-center title'><strong>Mobile no disponible</strong></h1>
                <p className='txt-quaternary text-center paragraph'>La versión móvil está en desarrollo. ¡Gracias por tu paciencia!</p>
              </div>
            </div>
          </section>
        )
      default:
        return <div>Tipo no soportado.</div>
    }
  }

  return (
    <>
      {renderCard()}
    </>
  )
}

export default Cards