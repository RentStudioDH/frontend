// src/components/LoadingOverlay.js
import React, { useEffect } from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import Backdrop from '@mui/material/Backdrop'

const LoadingOverlay = ({ open }) => {

    return (
        <Backdrop
            sx={{
                color: '#fff',
                zIndex: (theme) => theme.zIndex.drawer + 1,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%'
            }}
            open={open}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    )
}

export default LoadingOverlay
