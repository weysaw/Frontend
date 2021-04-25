<template>
  <div id="app">
    <div id="nav">
      <router-link :to="{ name: 'Home' }">Inicio</router-link> 
      <router-link :to="{ name: 'Habientes' }">Cuenta Habientes</router-link>
      <router-link :to="{ name: 'CuentasBancarias'}">Cuentas Bancarias</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

#nav {
  background-color: #505050;
  text-align: left;
}

#nav a {
  padding: 20px;
  display: inline-block;
  text-decoration: none;
  font-weight: bold;
  color: #b1b1b1;
}

@media (max-width: 600px) {
  #nav a {
    display: block;
  }
}

#nav a.router-link-exact-active {
  color: #00f1a9;
}

#nav a:hover {
  background-color: #bbbbbb;
}

@import 'assets/css/style.css';
</style>
