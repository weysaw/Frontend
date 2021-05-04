<template>
	<div class="agregar-saldo">
		<v-container>
			<v-row>
				<v-col cols="12" sm="4" class="ma-auto">
					<h2>Agregar Saldo Cuenta</h2>
					<v-form ref="form">
						<v-text-field
							v-model="id"
							type="number"
							label="Id Cuenta Bancaria"
							min="1"
							:rules="validarId"
							placeholder="Ingrese id cuenta"
							required
						/>
						<v-text-field
							v-model="saldo"
							type="number"
							label="Saldo a agregar"
							min="1"
							:rules="validarSaldo"
							placeholder="Ingrese saldo cuenta"
							required
						/>
						<v-btn @click="agregarSaldo" light>Agregar</v-btn>
					</v-form>
				</v-col>
			</v-row>
		</v-container>
	</div>
</template>

<script>
const axios = require("axios");

export default {
	name: "AgregarSaldo",
	data() {
		return {
			id: ``,
			saldo: ``,
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
		async agregarSaldo() {
			try {
				if (!this.$refs.form.validate())
					throw { type: "Error", msg: `Rellene los campos que se indican` };
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
				this.$root.$emit("mostrar", respuesta.data);
				//Se vacian los datos del formulario
				this.id = this.saldo = ``;
			} catch (error) {
				this.$root.$emit("mostrar", error);
			}
		},
	},
};
</script>

<style>
</style>