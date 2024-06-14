import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Container, Grid, Paper, Typography, Button } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Producto A', stock: 40 },
  { name: 'Producto B', stock: 30 },
  { name: 'Producto C', stock: 20 },
  { name: 'Producto D', stock: 27 },
  { name: 'Producto E', stock: 18 },
];

const theme = createTheme({
  palette: {
    primary: {
      main: '#A62639',
    },
  },
});

const AdminDashboard = ({ title }) => {
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Typography variant="h4" color="black" gutterBottom>
          <strong>{title}</strong>
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Paper elevation={3} style={{ padding: '20px' }}>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Productos en Stock
              </Typography>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="stock" fill="#511C29" />
                </BarChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} style={{ padding: '20px', textAlign: 'center' }}>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Herramientas de Administración
              </Typography>
              <Button variant="contained" color="primary" fullWidth style={{ marginBottom: '10px' }}>
                Ver Usuarios
              </Button>
              <Button variant="contained" color="primary" fullWidth style={{ marginBottom: '10px' }}>
                Ver Productos en Stock
              </Button>
              <Button variant="contained" color="primary" fullWidth>
                Ver Categorías de Productos
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

export default AdminDashboard;
