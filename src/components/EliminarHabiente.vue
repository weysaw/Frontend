<template>
	<div class="eliminar-hab">
		<h2>Eliminar habiente</h2>
		<form @submit="eliminarDato" method="post">
			Id<input
				v-model="id"
				name="id"
				type="number"
				min="1"
				placeholder="Ingrese id"
				required
			/>
			<button type="submit">Enviar</button>
		</form>
		<p v-if="id == ``">Favor de rellenar todos los campos</p>
	</div>
</template>

<script>
import Control from '../main';
const axios = require(`axios`);

export default {
	name: "EliminarHabiente",
	data() {
		return {
			id: 1,
		};
	},
	methods: {
		async eliminarDato(e) {
			try {
				//Previene que no cambie de página
				e.preventDefault();
				//Manda la solicitud y recibe la respuesta del servidor
				const respuesta = await axios.delete(`https://localhost:4001/habientes/${this.id}`);
				alert(respuesta?.data?.msg);
				//Manda un evento para que se actualize la tabla mostrada 
				this.$root.$emit("actualizar", `Actualizate`);
			} catch (error) {
				Control.validarError(error);
			} 
		},
	},
};
</script>

<style>
</style>