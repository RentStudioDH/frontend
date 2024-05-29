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
import FormProduct from './components/atoms/admin/FormProduct'
import Category from './pages/category/Category'
import Footer from './components/organisms/Footer'
import Modals from './components/atoms/Modals'


function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Header/>
        <Routes>
          <Route path={routes.home} element={<Home/>}/>
          <Route path={routes.detail} element={<Product/>}/>
          <Route path={routes.products} element={<Products/>}/>
          <Route path="/admin/:admin" element={<Admin/>}/>
          <Route path="/admin/form" element={<FormProduct/>} />
          <Route path="/categoria/:category" element={<Category/>} />
          <Route path="/eliminar" element={<Modals type={'eliminarProduct'} visible={true}/>} />
        </Routes>
        <Footer/>
      </ThemeProvider>
    </>
  )
}

export default App