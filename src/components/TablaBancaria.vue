<template>
	<div class="tablaBan">
		<h1>{{ titulo }}</h1>
		<table>
			<tr>
				<th>Id</th>
				<th>Saldo</th>
				<th>Datos Habientes</th>
			</tr>
			<tr v-for="cuentas in cuentasBancarias" :key="cuentas.id">
				<td>{{ cuentas[0].id }}</td>
				<td>{{ cuentas[0].saldo }}</td>
				<td>{{ cuentas[1] }}</td>
			</tr>
		</table>
	</div>
</template>

<script>
const axios = require("axios");

export default {
	name: "TablaBancaria",
	data() {
		return {
			titulo: "Tabla Cuentas Bancarias",
			cuentasBancarias: {},
		};
	},
	mounted() {
		this.mostrar();
		this.$root.$on("actualizar", () => {
			this.mostrar();
		});
	},
	methods: {
		mostrar() {
			axios.get("https://localhost:4001/cuentas").then((datos) => {
				this.cuentasBancarias = datos.data;
			});
		},
	},
};
</script>

<style>
</style>