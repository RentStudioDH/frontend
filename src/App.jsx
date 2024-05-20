import './styles/basics.scss'
import { Route, Routes } from "react-router-dom"
import { routes } from './utils/routes'
import { ThemeProvider } from '@mui/material/styles'
import theme from './utils/js/theme'
import Header from './components/organisms/Header'
import Home from './pages/home/Home'
import Product from './pages/product/Product'
import ListProducts from './pages/product/ListProducts'
import Admin from './pages/admin/Admin'
import Footer from './components/organisms/Footer'
import Category from './pages/category/Category'
import FormAgregarProducto from './components/atoms/admin/FormAgregarProducto'

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Header/>
        <Routes>
          <Route path={routes.home} element={<Home/>}/>
          <Route path={routes.detail} element={<Product/>}/>
          <Route path={routes.products} element={<ListProducts/>}/>
          <Route path="/admin/:admin" element={<Admin/>}/>
          <Route path="/admin/form" element={<FormAgregarProducto/>} />
          <Route path="/categoria/:category" element={<Category/>} />
        </Routes>
        <Footer/>
      </ThemeProvider>
    </>
  )
}

export default App