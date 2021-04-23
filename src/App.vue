<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <TablaHabiente/>
    <TablaBancaria/>
  </div>
</template>

<script>
import TablaHabiente from './components/TablaHabiente.vue'
import TablaBancaria from './components/TablaBancaria.vue';

export default {
  name: 'App',
  components: {
    TablaHabiente, 
    TablaBancaria
  }
}
</script>

<style>

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 60px;
}

@import './assets/css/style.css'
</style>
