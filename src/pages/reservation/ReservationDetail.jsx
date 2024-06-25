import React from 'react';
import { Box, Grid, Button, Typography, Container, createTheme, ThemeProvider, SvgIcon } from '@mui/material';
import UserDetailsForm from '../../components/molecules/reservation/UserDetailsForm';
import { useContextGlobal } from '../../contexts/global.context';
import ReservaSection from '../../components/molecules/reservation/ReservaSection';
import TusSelecciones from '../../components/molecules/reservation/TusSelecciones';
import PaymentForm from '../../components/molecules/reservation/PaymentForm';
import PaidRoundedIcon from '@mui/icons-material/PaidRounded';
import { Link, useNavigate } from 'react-router-dom';


const ReservationDetail = () => {
    const { state } = useContextGlobal();
    const { data, user } = state;
  const navigate = useNavigate()

    const theme = createTheme({
      palette: {
        primary:{
          main: '#A62639',
        }
        
      },
    });
    
    
    return (
      <Container>
        <div className='flex items-center g-5 mb-6 mt-8'>
        <Link onClick={() => navigate(-1)}><i className="fa-solid fa-arrow-left txt-accent title"></i></Link>
        <h1 className='txt-accent title '><strong>Detalles de la reserva</strong></h1>
        </div>

        <ReservaSection 
          titulo="Tus selecciones" 
          icono="person" 
          cardContent={TusSelecciones} 
          data={data} 
        />
        <ReservaSection 
          titulo="Tus datos" 
          icono="person" 
          cardContent={UserDetailsForm} 
          data={user} 
        />
        <ReservaSection 
          titulo="Medio de pago"
          icono={<PaidRoundedIcon/>}  
          cardContent={PaymentForm} 
          data={data} 
          />

        <Box marginBottom={2} display="flex" justifyContent="center">
          <ThemeProvider theme={theme}>
            <Button sx={{borderRadius:'1rem'}} variant="contained" color='primary'>Completar la reserva</Button>
          </ThemeProvider>
        </Box>
      </Container>
    );
}

export default ReservationDetail;
