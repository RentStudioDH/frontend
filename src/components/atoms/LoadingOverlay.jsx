import CircularProgress from '@mui/material/CircularProgress'
import Backdrop from '@mui/material/Backdrop'

const LoadingOverlay = ({ open }) => {
  return (
    <Backdrop className='fixed w-full h-full grid place-items-center top-0 left-0 text-white' open={open}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      }}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  )
}

export default LoadingOverlay