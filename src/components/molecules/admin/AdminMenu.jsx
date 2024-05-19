import { useState } from 'react'
import { Link } from 'react-router-dom'
import adminData from '../../../utils/json/adminData.json'

const AdminMenu = () => {
  const [isOpen, setOpen] = useState(false)
  const isOpenMenu = () => {
    setOpen(!isOpen)
  }
  return (
    <nav className='w-fit h-auto transition-all duration-1000 ease-in-out p-15 adminNav'>
      <div className="bg-quaternary flex flex-col items-end br-15">
        <button className='p-15' onClick={isOpenMenu}><i className={`txt-tertiary subtitle fa-solid ${!isOpen ? "fa-arrow-left" : "fa-arrow-right"}`}></i></button>
        
        <ul className={`grid ${isOpen ? 'w-full place-items-center' : 'w-[150px] place-items-star'} g-5`}>
          {adminData.map( item => {
            return <li key={item.id} className={`flex flex-col items-start ${location.pathname === item.path ? 'active' : ''}`}><Link to={item.path} className='txt-tertiary flex items-center paragraph g-5 p-15'><i className={`fa-solid ${item.icon} subtitle`}></i>{!isOpen && item.label}</Link></li>
          })}
          {/* {
            menuItems.map(item=>(
                <div className={`flex cursor-pointer hover:bg-green-200 w-full overflow-hidden whitespace-nowrap ${isOpen ? "hidden" : ""}`}>
                  <a href={item.link} className="flex py-2 px-3 w-full ">
                    <div>
                      {!isOpen && 
                        <span className="text-md font-medium text-text-light">
                          {item.label}
                        </span>
                      }
                    </div>
                  </a>
                </div>
            ))          
          } */}
        </ul>
      </div>
    </nav>
  )
}

export default AdminMenu