import React from 'react'
import { Link } from 'react-router-dom'
import { Container, colors } from '@mui/material'
import { routes } from '../../../utils/routes'
import './header.css'

const Navbar = () => {
  return (
   
    <nav>
     <Link to={routes.camaras}><h4>Camara</h4></Link>
     <Link to={routes.lentes}><h4>Lentes</h4></Link>
     <Link to={routes.luces}><h4>Luces</h4></Link>
     <Link to={routes.audio}><h4>Audio</h4></Link>
     <Link to={routes.profesionales}><h4>Profesionales</h4></Link> 
    </nav>
   
  )
}

export default Navbar
