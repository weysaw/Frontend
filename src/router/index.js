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
    path: '/cuentahabientes',
    name: 'CuentaHabientes',
    component: Habientes,
    beforeEnter: estaEnSesion
  },
  {
    path: '/cuentas',
    name: 'CuentasBancarias',
    component: CuentasBancarias,
    beforeEnter: estaEnSesion
  },
  {
    path: `*`,
    name: "Pagina no encontrada",
    component: Error404
  }
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
})

function estaEnSesion(to, from, next) {
  if (!localStorage.getItem("token")) next({ name: 'Inicio' });
  else next();
}
export default router
