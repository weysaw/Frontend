<template>
	<div class="agregar-hav-cuenta">
		<h2>Agregar Habiente a Cuenta Bancaria Existente</h2>
		<form @submit="agregarHabCuenta" method="post">
			Cuenta Habiente Id<input
				v-model="habienteId"
				type="number"
				name="habienteId"
				min="1"
				placeholder="Id Cuenta Habiente"
				required
			/>
			Cuenta Bancaria Id<input
				v-model="bancariaId"
				type="number"
				name="bancariaId"
				min="1"
				placeholder="Id Cuenta Bancaria"
				required
			/>
			<button type="submit">Agregar</button>
			<p v-if="habienteId == '' || bancariaId == ''">
				Favor de rellenar todos los campos
			</p>
		</form>
	</div>
</template>

<script>
import Control from "../main";
const axios = require("axios");

export default {
	name: "AgregarHabienteCuenta",
	data() {
		return {
			habienteId: ``,
			bancariaId: ``,
		};
	},
	methods: {
		async agregarHabCuenta(e) {
			try {
				//Previene que no cambie de página
				e.preventDefault();
				//Manda la solicitud y recibe la respuesta del servidor
				const respuesta = await axios.post(
					`https://localhost:4001/cuentas/habiente`,
					{
						habienteId: parseInt(this.habienteId),
						bancariaId: parseInt(this.bancariaId),
					}
				);
				console.log(respuesta);
				alert(respuesta.data.msg);
				this.$root.$emit("actualizar", `Actualizate`);
				this.habienteId = this.bancariaId = ``;
			} catch (error) {
				Control.validarError(error);
			}
		},
	},
};
</script>

<style>
</style>