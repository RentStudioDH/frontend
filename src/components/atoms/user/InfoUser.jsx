import { Typography } from '@mui/material'
import React from 'react'

const InfoUser = ({title,subtitle}) => {
  return (
    <div>
        <Typography variant='h5' fontWeight={600} paddingBottom={"2px"} paddingTop={"30px"}>{title}</Typography>
        <Typography variant='h6' fontWeight={400}>{subtitle}</Typography>
    </div> 
  )
}

export default InfoUser