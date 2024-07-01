import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useContextGlobal } from '../../contexts/global.context'
import { adminMenuItems, userMenuItems } from '../../utils/routes'

const SidebarMenu = () => {
  const { state } = useContextGlobal()
  const { role } = state
  const [isMenuOpen, setOpen] = useState(false)

  const toggleMenu = () => {
    setOpen(!isMenuOpen)
  }

  return (
    <nav className='w-fit h-auto transition-all duration-1000 ease-in-out p-15 adminNav'>
      <div className="bg-quaternary flex flex-col items-end br-15">
        <button className='p-15' onClick={toggleMenu} type="button"><i className={`txt-tertiary subtitle fa-solid ${!isMenuOpen ? "fa-arrow-left" : "fa-arrow-right"}`}></i></button>
        <div className='grid w-full px-[15px] g-5'>
          {!isMenuOpen && <p className="txt-tertiary legal"><strong>Usuario</strong></p>}
          <span className='w-full h-[1px] bg-accent'></span>
        </div>
        <ul className={`grid ${isMenuOpen ? 'w-full place-items-center' : 'w-[150px] place-items-star'}`}>
          {userMenuItems.map( item => {
            return <li key={item.id} className={`flex flex-col items-start px-[15px] py-[10px] ${location.pathname === item.path ? 'active' : ''}`}><Link to={item.path} className='txt-tertiary flex items-center paragraph g-5'><i className={`fa-solid ${item.icon} subtitle`}></i>{!isMenuOpen && item.label}</Link></li>
          })}
        </ul>
        {role === 'ROLE_ADMIN' && (
          <>
            <div className='grid w-full px-[15px] g-5'>
              {!isMenuOpen && <p className="txt-tertiary legal"><strong>Admin</strong></p>}
              <span className='w-full h-[1px] bg-accent'></span>
            </div>
            <ul className={`grid ${isMenuOpen ? 'w-full place-items-center' : 'w-[150px] place-items-star'}`}>
              {adminMenuItems.map( item => {
                return <li key={item.id} className={`flex flex-col items-start px-[15px] py-[10px] ${location.pathname === item.path ? 'active' : ''}`}><Link to={item.path} className='txt-tertiary flex items-center paragraph g-5'><i className={`fa-solid ${item.icon} subtitle`}></i>{!isMenuOpen && item.label}</Link></li>
              })}
            </ul>
          </>
        )}
      </div>
    </nav>
  )
}

export default SidebarMenu