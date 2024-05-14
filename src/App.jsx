import './styles/basics.css'
import { Route, Routes } from "react-router-dom";
import Main from './pages/home/Main';
import { routes } from './utils/routes';
import { ThemeProvider } from '@mui/material/styles';
import theme from './utils/theme';



function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <main>
          <Routes>
            <Route path={routes.home} element={<Main/>}/>
          </Routes>
        </main>
      </ThemeProvider>
    </>
  )
}

export default App