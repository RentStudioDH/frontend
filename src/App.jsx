import './styles/basics.scss'
import { Route, Routes } from "react-router-dom"
import { routes } from './utils/routes'
import { ThemeProvider } from '@mui/material/styles'
import theme from './utils/js/theme'
import Header from './components/organisms/Header'
import Home from './pages/home/Home'
import Product from './pages/product/Product'
import Products from './pages/product/Products'
import Admin from './pages/admin/Admin'
import Category from './pages/category/Category'
import Footer from './components/organisms/Footer'
import ProtectedRoute from './pages/ProtectedRoute'
import Favs from './pages/admin/Favs'


function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Header/>
        <Routes>
          <Route path={routes.home} element={<Home/>}/>
          <Route path={routes.detail} element={<Product/>}/>
          <Route path={routes.products} element={<Products/>}/>
          <Route path="/admin/:admin" element={<ProtectedRoute element={<Admin />} />} />
          <Route path="/categoria/:category" element={<Category/>} />
          <Route path="/favs" element={<Favs/>} />
        </Routes>
        <Footer/>
      </ThemeProvider>
    </>
  )
}

export default App