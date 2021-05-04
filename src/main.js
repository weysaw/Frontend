import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
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