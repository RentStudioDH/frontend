import { IconButton, InputAdornment, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const InfoUserPassword = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <div>
      <Typography variant='h5' fontWeight={600} paddingBottom={"2px"} paddingTop={"30px"}>Contraseña</Typography>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <input
          type={showPassword ? 'text' : 'password'}
          value="user_password" // Aquí puedes poner la contraseña del usuario
          readOnly // Esto asegura que no se puede editar
          style={{
            border: '1px solid #ced4da',
            borderRadius: '4px',
            padding: '8px',
            marginRight: '8px',
            minWidth: '150px', // Ajusta el ancho mínimo según sea necesario
            background: "white"
          }}
        />
        <IconButton
          aria-label="toggle password visibility"
          onClick={handleClickShowPassword}
          edge="end"
          style={{ alignSelf: 'flex-start' }} // Alinea verticalmente con el input
        >
          {showPassword ? <VisibilityOff /> : <Visibility />}
        </IconButton>
      </div>
    </div>
  );
};

export default InfoUserPassword;
