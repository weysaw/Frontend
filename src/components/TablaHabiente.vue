<template>
	<div class="tablahab">
		<h1>{{ titulo }}</h1>
		<table>
			<tr>
				<th>Id</th>
				<th>Nombre</th>
			</tr>
			<tr v-for="hab in habientes" :key="hab.id">
				<td>{{ hab.id }}</td>
				<td>{{ hab.nombre }}</td>
			</tr>
		</table>
	</div>
</template>

<script>
const axios = require("axios");

export default {
	name: "TablaHabiente",
	data() {
		return {
			titulo: "Tabla Habientes",
			habientes: {},
		};
	},
	mounted() {
		this.mostrar();
		this.$root.$on('actualizar', () => {
			this.mostrar();
		})
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
	margin: 40px 0 0;
}
ul {
	list-style-type: none;
	padding: 0;
}
li {
	display: inline-block;
	margin: 0 10px;
}
a {
	color: #42b983;
}
</style>
