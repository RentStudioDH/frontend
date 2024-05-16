import { Box } from '@mui/material'
import Buttons from '../Buttons'

const BtnLoginRegister = () => {
  return (
    <Box className='d-flex g-15'>
      <Buttons text={'Iniciar sesión'} bColor={'#A62639'} color={'#A62639'} bgColor={'#fff'}/>
      <Buttons text={'Crear cuenta'} bColor={'#A62639'} color={'#fff'} bgColor={'#A62639'}/>
    </Box>
  )
}

export default BtnLoginRegister