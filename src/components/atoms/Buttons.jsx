import { Button } from '@mui/material'

const Buttons = ({ text, bgColor, bColor, color }) => {
  return (
    <Button className='btn paragraph' sx={{ bgcolor: bgColor, color: color, borderRadius: "2rem", padding: "5px 20px", fontSize: '12px', textTransform: 'capitalize', border: `1px solid ${bColor}`, '&:hover': {
      bgcolor: bgColor,
      filter: 'brightness(50%)'
    } }} variant='contained'>{text}</Button>    
  )
}

export default Buttons