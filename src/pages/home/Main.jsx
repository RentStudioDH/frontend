import { Box, Container } from '@mui/material'
import HomeBodyRecomendados from "../../components/organisms/HomeBodyRecomendados";
import CategoriasTabs from '../../components/organisms/header/CategoriasTabs';
import Footer from '../../components/organisms/Footer';
import Header from '../../components/organisms/header/Header';
import Navbar from '../../components/organisms/header/Navbar';
const Main = () => {
  return (
    <Box>
      <Header/>
      
      <CategoriasTabs/>

      <Box>
        <MainBodyBeneficios/>
      </Box>

      <Box marginTop={'20px'}>
        <HomeBodyRecomendados/>
      </Box>

      <Footer/>
    </Box>
  )
}

export default Main