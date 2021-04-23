<template>
  <div class="tablaBan">
    <h1>{{ titulo }}</h1>
    <table>
      <tr>
        <th>Id</th>
        <th>Saldo</th>
        <th>Datos Habientes</th>
      </tr>
      <tr v-bind:key="cuentas" v-for="cuentas in cuentasBancarias">
        <td>{{ cuentas[0].id }}</td>
        <td>{{ cuentas[0].saldo }}</td>
        <td>{{ cuentas[1] }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: "TablaBancaria",
  data() {
    return {
      titulo: "Tabla Cuentas Bancarias",
      cuentasBancarias: {},
    };
  },
  beforeMount() {
    this.obtenerDatos();
  },
  methods: {
    async obtenerDatos() {
      const respuesta = await fetch("https://localhost:4001/cuentas");
      const datos = await respuesta.json();
      this.cuentasBancarias = datos;
    },
  },
};
</script>

<style>
</style>