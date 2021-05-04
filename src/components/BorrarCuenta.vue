<template>
	<div class="borrar-cuenta">
		<v-container>
			<v-row>
				<v-col cols="12" sm="4" class="ma-auto">
					<h2>Borrar Cuenta Bancaria</h2>
					<v-form ref="form">
						<v-text-field
							v-model="id"
							type="number"
							label="Id"
							min="1"
							:rules="validar"
							placeholder="Id Cuenta Bancaria"
							required
						/>
						<v-btn @click="borrarCuenta" light>Borrar</v-btn>
					</v-form>
				</v-col>
			</v-row>
		</v-container>
	</div>
</template>

<script>
const axios = require("axios");

export default {
	name: "BorrarCuenta",
	data() {
		return {
			id: "",
			validar: [
				(v) => !!v || `Este campo es obligatorio`,
				(v) => parseInt(v) >= 0 || "El numero debe ser positivo",
			],
		};
	},
	methods: {
		async borrarCuenta() {
			try {
				if (!this.$refs.form.validate())
					throw { type: "Error", msg: `Rellene los campos que se indican` };
				//Manda la solicitud y recibe la respuesta del servidor
				const respuesta = await axios.delete(
					`https://localhost:4001/cuentas/${this.id}`
				);
				this.$root.$emit("mostrar", respuesta?.data);
				//Manda un evento para que se actualize la tabla mostrada
				this.$root.$emit("actualizar", `Actualizate`);
				this.id = "";
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