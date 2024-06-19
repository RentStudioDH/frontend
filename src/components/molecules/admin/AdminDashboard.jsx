import { createTheme, ThemeProvider } from '@mui/material/styles'
import { Grid, Paper } from '@mui/material'
import { AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Area } from 'recharts'
import { useContextGlobal } from '../../../contexts/global.context'
import AdminCard from '../../atoms/admin/AdminCard'

const data = [
  { month: 'Enero', totalAlquileres: 165 },
  { month: 'Febrero', totalAlquileres: 120 },
  { month: 'Marzo', totalAlquileres: 150 },
  { month: 'Abril', totalAlquileres: 230 },
  { month: 'Mayo', totalAlquileres: 122 },
  { month: 'Junio', totalAlquileres: 60 },
  { month: 'Julio', totalAlquileres: 43 },
  { month: 'Agosto', totalAlquileres: 56 },
  { month: 'Septiembre', totalAlquileres: 78 },
  // Datos de prueba
]

const theme = createTheme({
  palette: {
    primary: {
      main: '#A62639',
    },
  },
})

const AdminDashboard = ({ title }) => {
  const { state } = useContextGlobal()
  const products = state.data || []
  const categories = state.categories || []

  const totalCategories = categories.length
  const totalProducts = products.length

  return (
    <ThemeProvider theme={theme}>
      <h1 className='txt-accent bigtitle'><strong>{title}</strong></h1>
      <Grid container spacing={4}>
        <Grid item xs={12} md={12}>
          <Paper elevation={3} style={{ padding: '20px' }}>
            <h2 className='txt-accent subtitle'><strong>Total de Productos Alquilados por Mes</strong></h2>
            <ResponsiveContainer width="100%" height={400}>
              <AreaChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="totalAlquileres" fill="#A62639" stroke="#511C29" />
              </AreaChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <AdminCard number={50} title="Usuarios" link="/admin/users" />
        </Grid>
        <Grid item xs={12} md={4}>
          <AdminCard number={totalProducts} title="Productos en Stock" link="/admin/productos" />
        </Grid>
        <Grid item xs={12} md={4}>
          <AdminCard number={totalCategories} title="Categorías" link="/admin/categorias" />
        </Grid>
      </Grid>
    </ThemeProvider>
  )
}

export default AdminDashboard
