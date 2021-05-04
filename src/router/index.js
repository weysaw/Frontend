import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Habientes from '../views/Habientes.vue'
import CuentasBancarias from '../views/Bancaria.vue';
import Error404 from '../views/Error404.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Inicio',
    component: Home
  },
  {
    path: '/habientes',
    name: 'Habientes',
    component: Habientes
  },
  {
    path: '/cuentas',
    name: 'CuentasBancarias',
    component: CuentasBancarias
  },
  {
    path: `*`,
    name: "Pagina no encontrada",
    component: Error404
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
