import React, { useState, useEffect } from 'react'
import { Paper, Typography } from '@mui/material'

const CardImgAndInfo = ({ img, title, textInfo, styles }) => {
    const [defaultStyles, setDefaultStyles] = useState({
        bgcolor: "#D9D9D9",
        height: "240px",
        display: "flex",
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: "center"
    })

    useEffect(() => {
        if (styles) {
            setDefaultStyles(styles)
        }
    }, []) // Este array vacío indica que este efecto se ejecutará solo una vez, al montar el componente

    const appliedStyles = styles ? styles : defaultStyles;

    return (
        <Paper elevation={6} sx={appliedStyles}>
            <img src={img} alt="cardImg" />
            <Typography variant='h4'>{title}</Typography>
            <Typography variant='body2'>{textInfo}</Typography>
        </Paper>
    )
}

export default CardImgAndInfo

