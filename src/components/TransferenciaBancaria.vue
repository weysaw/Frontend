<template>
	<div class="transferencia">
		<v-container>
			<v-row>
				<v-col cols="12" sm="4" class="ma-auto">
					<h2>Realizar Transferencia Bancaria</h2>
					<v-form ref="form">
						<v-text-field
							v-model="saldo"
							type="number"
							label="Saldo"
							:rules="validar"
							placeholder="saldo transferir"
							min="1"
							required
						/>
						<v-text-field
							v-model="origenId"
							type="number"
							label="Id Cuenta Bancaria Origen"
							:rules="validar"
							placeholder="id cuenta origen"
							min="1"
							required
						/>
						<v-text-field
							v-model="destinoId"
							type="number"
							label="Id Cuenta Bancaria Destino"
							:rules="validar"
							placeholder="id cuenta destino"
							min="1"
							required
						/>
						<v-btn @click="realizarTransferencia" light>Transferencia</v-btn>
					</v-form>
				</v-col>
			</v-row>
		</v-container>
	</div>
</template>

<script>
const axios = require("axios");

export default {
	name: "TransferenciaBancaria",
	data() {
		return {
			saldo: "",
			origenId: "",
			destinoId: "",
			validar: [
				(v) => !!v || `Este campo es obligatorio ${v.label}`,
				(v) => parseInt(v) >= 0 || "El numero debe ser positivo",
			],
		};
	},
	methods: {
		async realizarTransferencia() {
			try {
				if (!this.$refs.form.validate())
					throw { type: "Error", msg: `Rellene los campos que se indican` };
				//Manda la solicitud y recibe la respuesta del servidor
				const respuesta = await axios.post(
					"https://localhost:4001/cuentas/transferencia",
					{
						saldo: parseInt(this.saldo),
						origenId: this.origenId,
						destinoId: this.destinoId,
					}
				);
				this.$root.$emit("mostrar", respuesta?.data);
				this.saldo = this.origenId = this.destinoId = "";
				//Manda un evento para que se actualize la tabla mostrada
				this.$root.$emit("actualizar", `Actualizate`);
				this.$refs.form.resetValidation();
			} catch (error) {
				this.$root.$emit("mostrar", error);
			}
		},
	},
};
</script>

<style>
</style>