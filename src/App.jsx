import './styles/basics.css'
import { Route, Routes } from "react-router-dom"
import Main from './pages/home/Main'
import { routes } from './utils/routes'
import { ThemeProvider } from '@mui/material/styles'
import theme from './utils/theme'
import Footer from './components/organisms/Footer'
import Header from './components/organisms/Header'

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Header/>
        <main>
          <Routes>
            <Route path={routes.home} element={<Main/>}/>
          </Routes>
        </main>
        <Footer/>
      </ThemeProvider>
    </>
  )
}

export default App