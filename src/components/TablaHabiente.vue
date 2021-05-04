<template>
	<v-container>
		<v-row>
			<v-col cols="12" sm="12">
				<h1>{{ titulo }}</h1>
				<v-data-table
					:headers="cabeceras"
					:items="habientes"
					:items-per-page="5"
				></v-data-table>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
const axios = require("axios");

export default {
	name: "TablaHabiente",
	data() {
		return {
			titulo: "Tabla Habientes",
			habientes: [],
			cabeceras: [
				{ text: "Id Habiente", value: "id" },
				{ text: "Nombre", value: "nombre" },
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
			axios.get("https://localhost:4001/habientes").then((datos) => {
				this.habientes = datos.data;
			});
		},
	},
};
</script>
