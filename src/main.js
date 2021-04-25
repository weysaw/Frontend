import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')


export default class Control {
  static validarError(error) {
    if (error?.response?.data) {
      console.error(error.response.data);
      alert(error.response.data.msg);
    } else {
      console.error(error);
      alert(error);
    }
  }
}