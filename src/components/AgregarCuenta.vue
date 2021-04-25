<template>
	<div class="agregar-cuenta">
		<h2>Agregar Cuenta Bancaria</h2>
		<form @submit="agregarCuenta" method="post">
			Cuenta Habiente Id<input
				type="number"
				v-model="habienteId"
				name="habienteId"
				min="1"
				placeholder="Ingrese id habiente"
				required
			/>
			Saldo<input
				type="number"
				v-model="saldo"
				name="saldo"
				min="1"
				placeholder="Ingrese saldo cuenta"
				required
			/>
			<button type="submit">Agregar Cuenta</button>
		</form>
		<p v-if="habienteId == '' || saldo == ''">
			Favor de rellenar todos los campos
		</p>
	</div>
</template>

<script>
import Control from '../main';
const axios = require("axios");

export default {
	name: "AgregarCuenta",
	data() {
		return {
			saldo: "",
			habienteId: "",
		};
	},
	methods: {
		async agregarCuenta(e) {
			try {
				//Previene que no cambie de página
				e.preventDefault();
				//Manda la solicitud y recibe la respuesta del servidor
				const respuesta = await axios.post("https://localhost:4001/cuentas", {
					saldo: this.saldo,
					habienteId: this.habienteId,
				});
				alert(respuesta.data.msg);
				this.$root.$emit("actualizar", `Actualizate`);
				this.saldo = this.habienteId = '';
			} catch (error) {
				Control.validarError(error);
			}
		},
	},
};
</script>

<style>
</style>