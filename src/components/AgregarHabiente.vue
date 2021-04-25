<template>
	<div class="agregar-hab">
		<h2>Agregar habiente</h2>
		<form @submit="enviarDato" method="post">
			Nombre<input
				v-model="nombre"
				name="nombre"
				placeholder="Ingrese el nombre"
				required
			/>
			<button type="submit">Enviar</button>
		</form>
		<p v-if="nombre == ``">Favor de rellenar todos los campos</p>
	</div>
</template>

<script>
import Control from '../main';
const axios = require(`axios`);

export default {
	name: "AgregarHabiente",
	data() {
		return {
			nombre: "",
		};
	},
	methods: {
		async enviarDato(e) {
			try {
				//Previene que no cambie de página
				e.preventDefault();
				//Manda la solicitud y recibe la respuesta del servidor
				const respuesta = await axios.post("https://localhost:4001/habientes", {
					nombre: this.nombre,
				});
				alert(respuesta.data.msg);
				//Manda a actualizar la tabla
				this.$root.$emit("actualizar", `Actualizate`);
				this.nombre = "";
			} catch (error) {
				Control.validarError(error);
			}
		},
	},
};
</script>
<style>
	
</style>