import { Box } from '@mui/material'
import HomeBodyRecomendados from "../../components/organisms/HomeBodyRecomendados"
import MainBodyBeneficios from '../../components/organisms/MainBodyBeneficios'
import BodySearchSection from '../../components/organisms/BodySearchSection'

const Main = () => {
  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <BodySearchSection/>      
      <MainBodyBeneficios/>
      <HomeBodyRecomendados/>
    </Box>
  )
}

export default Main
