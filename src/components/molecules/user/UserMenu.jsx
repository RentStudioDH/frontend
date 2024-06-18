import { useState } from 'react'
import { Link } from 'react-router-dom'
import userData from '../../../utils/json/userData.json'

const UserMenu = () => {
  const [isMenuOpen, setOpen] = useState(false)
  const isMenuOpenMenu = () => {
    setOpen(!isMenuOpen)
  }
  return (
    <nav className='w-fit h-auto transition-all duration-1000 ease-in-out p-15 adminNav'>
      <div className="bg-quaternary flex flex-col items-end br-15">
        <button className='p-15' onClick={isMenuOpenMenu} type="button"><i className={`txt-tertiary subtitle fa-solid ${!isMenuOpen ? "fa-arrow-left" : "fa-arrow-right"}`}></i></button>
        
        <ul className={`grid ${isMenuOpen ? 'w-full place-items-center' : 'w-[150px] place-items-star'} g-5`}>
          {userData.map( item => {
            return <li key={item.id} className={`flex flex-col items-start ${location.pathname === item.path ? 'active' : ''}`}><Link to={item.path} className='txt-tertiary flex items-center paragraph g-5 p-15'><i className={`fa-solid ${item.icon} subtitle`}></i>{!isMenuOpen && item.label}</Link></li>
          })}
        </ul>
      </div>
    </nav>
  )
}

export default UserMenu