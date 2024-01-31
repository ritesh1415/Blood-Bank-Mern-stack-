import React from 'react'
import UserMenu from './UserMenu'
import '../../../Styles/Layout.css'
import { Link, useLocation } from 'react-router-dom'
const Sidebar = () => {
    const location=useLocation()
  return (
    <div className='sidebar'>
        <div className='menu'>
            {UserMenu.map((menu)=>{
const isActive=location.pathname===menu.path
return (
    <div className={`menu-item ${isActive && 'active'}`}key={menu.name}>
        <li className={menu.icon}></li>
        <Link to={menu.path}>{menu.name}</Link>
    </div>
)
            })}
        </div>
      
    </div>
  )
}

export default Sidebar
