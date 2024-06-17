import React from 'react';
import { Paper, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const AdminCard = ({ number, title, link }) => {
  return (
    <Link to={link} style={{ textDecoration: 'none' }}>
      <Paper 
        elevation={3} 
        style={{
          backgroundColor: '#511C29',
          color: 'white',
          padding: '20px',
          cursor: 'pointer',
          borderRadius: "8px"
        }}
      >
        <Typography 
          variant="h4" 
          fontWeight={700} 
          style={{ borderBottom: '3px solid #DB324D', display: 'inline-block', paddingBottom: '1px' }}
        >
          {number}
        </Typography>
        <Typography 
          variant="h6" 
          fontWeight={500} 
          style={{ marginTop: '15px' }} // Espacio entre el número y el título
        >
          {title}
        </Typography>
      </Paper>
    </Link>
  );
}

export default AdminCard;
