<template>
	<div class="retirar-saldo">
		<h2>Retirar Saldo Cuenta</h2>
		<form @submit="retirarSaldo" method="put">
			Id<input
				v-model="id"
				type="number"
				name="id"
				min="1"
				placeholder="Ingrese id cuenta"
				required
			/>
			Saldo<input
				v-model="saldo"
				type="number"
				name="id"
				min="1"
				placeholder="Ingrese saldo a retirar cuenta"
				required
			/>
			<button type="submit">Retirar</button>
		</form>
		<p v-if="id == `` && saldo == ``">Favor de rellenar todos los campos</p>
	</div>
</template>

<script>
import Control from '../main';
const axios = require("axios");

export default {
	name: "RetirarSaldo",
	data() {
		return {
			id: ``,
			saldo: ``,
		};
	},
	methods: {
		async retirarSaldo(e) {
			try {
				//Previene que no cambie de página
				e.preventDefault();
				const respuesta = await axios.put(
					`https://localhost:4001/cuentas/saldo/retirar`,
					{
						id: this.id,
						saldo: parseInt(this.saldo),
					}
				);
				alert(respuesta.data.msg);
				//Manda un evento para que se actualize la tabla mostrada
				this.$root.$emit("actualizar", `Actualizate`);
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