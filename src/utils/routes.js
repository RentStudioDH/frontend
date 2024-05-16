export const routes = {
  home: '/',
  admin: {
    dashboard: { path: '/admin/dashboard', label: 'Home' },
    listar: { path: '/admin/listar', label: 'Listar productos' },
    crear: { path: '/admin/crear', label: 'Crear producto' },
  },
  categories: {
    cameras: { path: '/categoria/camaras', label: 'Cámaras' },
    lents: { path: '/categoria/lentes', label: 'Lentes' },
    lights: { path: '/categoria/luces', label: 'Luces' },
    audio: { path: '/categoria/audio', label: 'Audio' },
    professionals: { path: '/categoria/profesionales', label: 'Profesionales' },
  },
  detail: '/producto/:id'
}