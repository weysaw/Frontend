<template>
	<div class="agregar-cuenta">
		<v-container>
			<v-row>
				<v-col cols="12" sm="4" class="ma-auto">
					<h2>Agregar Cuenta Bancaria</h2>
					<v-form ref="form">
						<v-text-field
							type="number"
							v-model="habienteId"
							label="habienteId"
							min="1"
							:rules="validarId"
							placeholder="Ingrese id habiente"
							required
						/>
						<v-text-field
							type="number"
							v-model="saldo"
							label="Saldo"
							min="1"
							:rules="validarSaldo"
							placeholder="Ingrese saldo cuenta"
							required
						/>
						<v-btn @click="agregarCuenta" light>Agregar Cuenta</v-btn>
					</v-form>
				</v-col>
			</v-row>
		</v-container>
	</div>
</template>

<script>
const axios = require("axios");

export default {
	name: "AgregarCuenta",
	data() {
		return {
			saldo: "",
			habienteId: "",
			validarId: [
				(v) => !!v || "El id es obligatorio",
				(v) => parseInt(v) >= 0 || "El id debe de ser positivo",
			],
			validarSaldo: [
				(v) => !!v || "El saldo es obligatorio",
				(v) => parseInt(v) >= 0 || "El saldo debe ser positivo",
			],
		};
	},
	methods: {
		async agregarCuenta() {
			try {
				if (!this.$refs.form.validate())
					throw { type: "Error", msg: `Rellene los campos que se indican` };
				//Manda la solicitud y recibe la respuesta del servidor
				const respuesta = await axios.post("https://localhost:4001/cuentas", {
					saldo: this.saldo,
					habienteId: this.habienteId,
				});
				this.$root.$emit("mostrar", respuesta.data);
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