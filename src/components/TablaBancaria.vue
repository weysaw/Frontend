<template>
	<v-container>
		<v-row>
			<v-col cols="12" sm="12">
				<h1>{{ titulo }}</h1>
				<v-data-table
					:loading="cargando"
					:headers="cabeceras"
					:items="cuentasBancarias"
					:items-per-page="5"
				></v-data-table>
				<!-- 					
					<thead>
						<tr>
							<th class="text-center">Id</th>
							<th class="text-center">Saldo</th>
							<th class="text-center">Datos Habientes</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="cuentas in cuentasBancarias" :key="cuentas.id">
							<td>{{ cuentas[0].id }}</td>
							<td>{{ cuentas[0].saldo }}</td>
							<td>{{ cuentas[1] }}</td>
						</tr>
					</tbody>
				</v-simple-table> -->
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
const axios = require("axios");

export default {
	name: "TablaBancaria",
	data() {
		return {
			cargando: true,
			titulo: "Tabla Cuentas Bancarias",
			cuentasBancarias: [],
			cabeceras: [
				{ text: "Id Cuenta", value: `id` },
				{ text: `Saldo`, value: `saldo` },
				{ text: `Datos Habientes`, value: `datos` },
			],
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
				this.cuentasBancarias = [];
				const cuentas = datos.data;
				for (const cuenta of cuentas) {
					this.cuentasBancarias.push({
						id: cuenta[0].id,
						saldo: cuenta[0].saldo,
						datos: JSON.stringify(cuenta[1]),
					});
				}
				this.cargando = false;
			});
		},
	},
};
</script>

<style>
</style>