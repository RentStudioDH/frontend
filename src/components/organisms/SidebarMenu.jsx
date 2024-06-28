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
        <details className="w-full p-15">
          <summary className="flex items-center cursor-pointer g-5">
            <i className="fa-solid fa-user txt-tertiary subtitle"></i>
            {!isMenuOpen && <span className="txt-tertiary">Usuario</span>}
          </summary>
          <ul className={`grid ${isMenuOpen ? 'w-full place-items-center' : 'w-[150px] place-items-star'} g-15`}>
            {userMenuItems.map( item => {
              return <li key={item.id} className={`flex flex-col items-start ${location.pathname === item.path ? 'active' : ''}`}><Link to={item.path} className='txt-tertiary flex items-center paragraph g-5'><i className={`fa-solid ${item.icon} subtitle`}></i>{!isMenuOpen && item.label}</Link></li>
            })}
          </ul>
        </details>
        {role === 'ROLE_ADMIN' && (
          <>
            <details className="w-full p-15">
              <summary className="flex items-center cursor-pointer g-5">
                <i className="fa-solid fa-user-tie txt-tertiary subtitle"></i>
                {!isMenuOpen && <span className="txt-tertiary">Admin</span>}
              </summary>
              <ul className={`grid ${isMenuOpen ? 'w-full place-items-center' : 'w-[150px] place-items-star'} g-15`}>
                {adminMenuItems.map( item => {
                  return <li key={item.id} className={`flex flex-col items-start ${location.pathname === item.path ? 'active' : ''}`}><Link to={item.path} className='txt-tertiary flex items-center paragraph g-5'><i className={`fa-solid ${item.icon} subtitle`}></i>{!isMenuOpen && item.label}</Link></li>
                })}
              </ul>
            </details>
          </>
        )}
      </div>
    </nav>
  )
}

export default SidebarMenu