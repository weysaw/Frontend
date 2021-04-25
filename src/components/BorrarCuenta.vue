<template>
	<div class="borrar-cuenta">
		<h2>Borrar Cuenta Bancaria</h2>
		<form @submit="borrarCuenta" method="post">
			Id<input
				v-model="id"
				type="number"
				name="id"
				min="1"
				placeholder="Id Cuenta Bancaria"
				required
			/>
			<button type="submit">Agregar</button>
			<p v-if="id == ''">Favor de rellenar todos los campos</p>
		</form>
	</div>
</template>

<script>
import Control from '../main';
const axios = require("axios");

export default {
	name: "BorrarCuenta",
	data() {
		return {
			id: "",
		};
	},
	methods: {
		async borrarCuenta(e) {
			try {
				//Previene que no cambie de página
				e.preventDefault();
				//Manda la solicitud y recibe la respuesta del servidor
				const respuesta = await axios.delete("https://localhost:4001/cuentas", {
					data: { id: this.id },
				});
				alert(respuesta.data.msg);
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