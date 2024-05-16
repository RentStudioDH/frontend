export const routes = {
  home: '/',
  admin: {
    dashboard: { path: '/admin/dashboard', label: 'Home' },
    listar: { path: '/admin/listar', label: 'Listar productos' },
    crear: { path: '/admin/crear', label: 'Crear producto' },
  },
  categories: {
    cameras: { path: '/camaras', label: 'Cámaras' },
    lents: { path: '/lentes', label: 'Lentes' },
    lights: { path: '/luces', label: 'Luces' },
    audio: { path: '/audio', label: 'Audio' },
    professionals: { path: '/profesionales', label: 'Profesionales' },
  },
  detail: '/producto/:id'
}