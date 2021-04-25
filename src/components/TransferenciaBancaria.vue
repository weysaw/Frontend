<template>
	<div class="transferencia">
		<h2>Realizar Transferencia Bancaria</h2>
		<form @submit="realizarTransferencia" method="post">
			Saldo<input
				v-model="saldo"
				type="number"
				name="saldo"
				placeholder="saldo transferir"
				min="1"
				required
			/>
			Id Cuenta Bancaria Origen<input
				v-model="origenId"
				type="number"
				name="bancariaId"
				placeholder="id cuenta origen"
				min="1"
				required
			/>
			Id Cuenta Bancaria Destino<input
				v-model="destinoId"
				type="number"
				name="destinoId"
				placeholder="id cuenta destino"
				min="1"
				required
			/>
			<button type="submit">Transferencia</button>
		</form>
		<p v-if="saldo == '' || origenId == '' || destinoId == ''">
			Favor de rellenar todos los campos
		</p>
	</div>
</template>

<script>
import Control from '../main';
const axios = require("axios");

export default {
	name: "TransferenciaBancaria",
	data() {
		return {
			saldo: "",
			origenId: "",
			destinoId: "",
		};
	},
	methods: {
		async realizarTransferencia(e) {
			try {
				e.preventDefault();				
				//Manda la solicitud y recibe la respuesta del servidor
				const respuesta = await axios.put(
					"https://localhost:4001/cuentas/transferencia",
					{
						saldo: parseInt(this.saldo),
						origenId: this.origenId,
						destinoId: this.destinoId,
					}
				);
				alert(respuesta?.data?.msg);
				this.saldo = this.origenId = this.destinoId = "";
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