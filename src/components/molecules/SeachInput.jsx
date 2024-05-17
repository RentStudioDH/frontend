import { IconButton, InputBase, Paper } from '@mui/material'

const SeachInput = ({ searchHandler }) => {
  return (
    <Paper className='flex' elevation={2} sx={{ width: {xs:"100%", md: "40%"}, borderRadius: "28px", alignItems: 'center', justifyContent: 'space-between' }}>
      <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Buscar cámaras..." color='#56494E' inputProps={{ 'aria-label': 'Buscar cámaras...' }} />
      <IconButton type="button" onClick={searchHandler} sx={{ p: '10px' }} aria-label="search"> 
        <i className="fa-solid fa-magnifying-glass txt-primary"></i>
      </IconButton> 
    </Paper>
  )
}

export default SeachInput