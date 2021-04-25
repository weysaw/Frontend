<template>
	<div class="modificar-habiente">
		<h2>Modificar habiente</h2>
		<form @submit="ingresarDatos" method="put">
			Id<input v-model="id" type="number" min="1" name="id" placeholder="Ingrese num" required/>
			Nombre<input v-model="nombre" type="text" name="nomre" placeholder="Nombre habiente" required/>
			<button type="submit">Enviar</button>
		</form>
		<p v-if="id == `` || nombre == ``"> Favor de rellenar todos los campos </p>
	</div>
</template>

<script>
import Control from '../main';
const axios = require("axios");


export default {
	name: "ModificarHabiente",
	data() {
		return {
			id: 1,
			nombre: "",
		};
	},
	methods: {
		async ingresarDatos(e) {
			try {
				//Previene que no cambie de página
				e.preventDefault();
				//Manda la solicitud y recibe la respuesta del servidor
				const respuesta = await axios.put("https://localhost:4001/habientes", {id : this.id, nombre: this.nombre});
				alert(respuesta.data.msg);
				//Manda un evento para que se actualize la tabla mostrada 
				this.$root.$emit("actualizar", `Actualizate`);
				this.nombre = "";
			} catch (error) {
				//Muestra el error dependiendo si lo manda el server
				Control.validarError(error);
			} 
		},
	},
};
</script>

<style>
.modificar-habiente {
	display: block;
	margin: 20px;
}
</style>