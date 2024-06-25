import { Avatar, Grid, Paper, Button } from '@mui/material'
import { useState, useEffect } from 'react'
import { useContextGlobal } from '../../../contexts/global.context'
import InfoUserPassword from './InfoUserPassword'
import InfoUser from './InfoUser'
import EditProfileModal from './EditProfileModal'
import AvatarUser from './AvatarUser'

const MiPerfil = () => {
  const { state } = useContextGlobal()
  const { user } = state
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [userData, setUserData] = useState({
    firstName: user.firstName || '',
    lastName: user.lastName || '',
    email: user.email || '',
    telefono: user.telefono || '',
    role: user.role || '',
  })

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const handleSave = (newData) => {
    setUserData(newData)
  }

  return (
    <Paper elevation={4} sx={{ padding: 2, borderRadius: '9px' }}>
      <div className='grid grid-cols-[auto_1fr] place-items-center w-fit g-15 p-15'>
        <AvatarUser size={70} />
        <div className='grid h-fit'>
          <h2 className='txt-accent subtitle'>{userData.firstName} {userData.lastName}</h2>
          <p className='txt-tertiary paragraph'>{userData.email} <br /> <span className='legal'><strong>Role:</strong> {userData.role === 'ROLE_ADMIN' ? 'Admin' : 'User'}</span></p>
        </div>        
      </div>
      <Grid container spacing={2} alignItems='center'>
        <Grid item xs={12} md={6}>
          <InfoUser title='Telefono' subtitle={userData.telefono} />
          <InfoUserPassword />
        </Grid>
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'flex-end' }, marginTop: 2 }}>
          <Button
            variant='contained'
            sx={{
              bgcolor: '#A62639',
              color: 'white',
              '&:hover': {
                bgcolor: '#A62639', // Mantén el mismo color al hacer hover
              },
            }}
            onClick={handleOpenModal}
          >
            Editar Perfil
          </Button>
        </Grid>
      </Grid>
      <EditProfileModal
        open={isModalOpen}
        handleClose={handleCloseModal}
        userData={userData}
        handleSave={handleSave}
      />
    </Paper>
  )
}

export default MiPerfil