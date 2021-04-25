<template>
	<div class="agregar-saldo">
		<h2>Agregar Saldo Cuenta</h2>
		<!--Formulario para los datos  -->
		<form @submit="agregarSaldo" method="post">
			Id Cuenta Bancaria<input
				v-model="id"
				type="number"
				name="id"
				min="1"
				placeholder="Ingrese id cuenta"
				required
			/>
			Saldo a agregar<input
				v-model="saldo"
				type="number"
				name="id"
				min="1"
				placeholder="Ingrese saldo cuenta"
				required
			/>
			<button type="submit">Agregar</button>
		</form>
		<!-- Mensaje que se muestra si los datos no esta correctos -->
		<p v-if="id == `` || saldo == ``">Favor de rellenar todos los campos</p>
	</div>
</template>

<script>
import Control from "../main";
const axios = require("axios");

export default {
	name: "AgregarSaldo",
	data() {
		return {
			id: ``,
			saldo: ``,
		};
	},
	methods: {
		async agregarSaldo(e) {
			try {
				//Previene que no cambie de página
				e.preventDefault();
				//Realiza una peticion al servidor
				const respuesta = await axios.post(
					`https://localhost:4001/cuentas/saldo`,
					{
						id: this.id,
						saldo: parseInt(this.saldo),
					}
				);
				//Manda un evento para que se actualize la tabla mostrada
				this.$root.$emit("actualizar", `Actualizate`);
				alert(respuesta.data.msg);
				//Se vacian los datos del formulario
				this.id = this.saldo = ``;
			} catch (error) {
				Control.validarError(error);
			}
		},
	},
};
</script>

<style>
</style>