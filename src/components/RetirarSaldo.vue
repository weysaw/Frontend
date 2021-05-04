<template>
	<div class="retirar-saldo">
		<v-container>
			<v-row>
				<v-col cols="12" sm="4" class="ma-auto">
					<h2>Retirar Saldo Cuenta</h2>
					<v-form ref="form">
						<v-text-field
							v-model="id"
							type="number"
							label="Id"
							:rules="validarId"
							min="1"
							placeholder="Ingrese id cuenta"
							required
						/>
						<v-text-field
							v-model="saldo"
							type="number"
							label="Saldo a retirar"
							:rules="validarSaldo"
							min="1"
							placeholder="Ingrese saldo a retirar cuenta"
							required
						/>
						<v-btn @click="retirarSaldo" light>Retirar</v-btn>
					</v-form>
				</v-col>
			</v-row>
		</v-container>
	</div>
</template>

<script>
const axios = require("axios");

export default {
	name: "RetirarSaldo",
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
		async retirarSaldo() {
			try {
				if (!this.$refs.form.validate())
					throw { type: "Error", msg: `Rellene los campos que se indican` };
				const respuesta = await axios.post(
					`https://localhost:4001/cuentas/saldo/retirar`,
					{
						id: this.id,
						saldo: parseInt(this.saldo),
					}
				);
				this.$root.$emit("mostrar", respuesta.data);
				//Manda un evento para que se actualize la tabla mostrada
				this.$root.$emit("actualizar", `Actualizate`);
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