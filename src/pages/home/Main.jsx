import { Box, Container } from '@mui/material'
import HomeBodyRecomendados from "../../components/organisms/HomeBodyRecomendados";
import MainBodyBeneficios from '../../components/organisms/MainBodyBeneficios';
const Main = () => {
  return (
    <Box className={'body'}>
      <Box>
        <MainBodyBeneficios/>
      </Box>

      <Box marginTop={'20px'}>
        <HomeBodyRecomendados/>
      </Box>
    </Box>
  )
}

export default Main