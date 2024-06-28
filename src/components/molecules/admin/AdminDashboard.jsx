import { createTheme, ThemeProvider } from '@mui/material/styles'
import { AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Area } from 'recharts'
import { useContextGlobal } from '../../../contexts/global.context'
import { routes } from '../../../utils/routes'
import Cards from '../../atoms/Cards'

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
  const users = state.users || []
  const products = state.data || []
  const categories = state.categories || []

  const totalUsers = users.length
  const totalProducts = products.length
  const totalCategories = categories.length

  const dashData = [
    {
      id: 1,
      number: totalUsers, 
      title: "Usuarios", 
      link: routes.admin.permissions 
    },
    {
      id: 2,
      number: totalProducts,
      title: "Productos en Stock",
      link: routes.admin.products,
    },
    {
      id: 3,
      number: totalCategories, 
      title: "Categorías", 
      link: routes.admin.categories 
    },
  ];

  return (
    <ThemeProvider theme={theme}>
      <h1 className='txt-accent bigtitle'><strong>{title}</strong></h1>
      <div className='bg-white grid shadow-lg br-15 p-15 g-15'>
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
      </div>
      <div className='grid md:grid-cols-3 g-15'>
        {dashData.map(card => (
          <Cards key={card.id} type="adminDash" data={card} />
        ))}
      </div>
    </ThemeProvider>
  )
}

export default AdminDashboard
