import './styles/basics.css'
import { Route, Routes } from "react-router-dom"
import { routes } from './utils/routes'
import { ThemeProvider } from '@mui/material/styles'
import theme from './utils/theme'
import Footer from './components/organisms/Footer'
import Header from './components/organisms/Header'
import Home from './pages/home/Home'
import Product from './pages/product/Product'

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Header/>
        <main>
          <Routes>
            <Route path={routes.home} element={<Home/>}/>
            <Route path={routes.detail} element={<Product/>}/>
            <Route path={routes.categories.cameras.path} element={<div></div>}/>
            <Route path='/lentes'element={<div></div>}/>
            <Route path='/luces' element={<div></div>}/>
            <Route path='/audio' element={<div></div>}/>
            <Route path='/profesionales' element={<div></div>}/>
          </Routes>
        </main>
        <Footer/>
      </ThemeProvider>
    </>
  )
}

export default App