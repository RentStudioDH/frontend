export const routes = {
  home: '/',
  admin: {
    dashboard: '/admin/dashboard',
    listar: '/admin/listar-productos',
    crear: '/admin/crear',
  },
  categories: {
    cameras: '/categoria/camaras',
    lents: '/categoria/lentes',
    lights: '/categoria/luces',
    audio: '/categoria/audio',
    professionals: '/categoria/profesionales',
  },
  detail: '/producto/:id'
}