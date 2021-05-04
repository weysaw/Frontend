<template>
	<div class="agregar-hav-cuenta">
		<v-container>
			<v-row>
				<v-col cols="12" sm="4" class="ma-auto">
					<h2>Agregar Habiente a Cuenta Bancaria Existente</h2>
					<v-form ref="form">
						Cuenta Habiente Id<v-text-field
							v-model="habienteId"
							type="number"
							name="habienteId"
							:rules="validar"
							min="1"
							placeholder="Id Cuenta Habiente"
							required
						/>
						Cuenta Bancaria Id<v-text-field
							v-model="bancariaId"
							type="number"
							name="bancariaId"
							:rules="validar"
							min="1"
							placeholder="Id Cuenta Bancaria"
							required
						/>
						<v-btn @click="agregarHabCuenta" light>Agregar</v-btn>
					</v-form>
				</v-col>
			</v-row>
		</v-container>
	</div>
</template>

<script>
const axios = require("axios");

export default {
	name: "AgregarHabienteCuenta",
	data() {
		return {
			habienteId: ``,
			bancariaId: ``,
			validar: [
				(v) => !!v || `Este campo es obligatorio`,
				(v) => parseInt(v) >= 0 || `El numero debe ser positivo`,
			],
		};
	},
	methods: {
		async agregarHabCuenta() {
			try {
				if (!this.$refs.form.validate())
					throw { type: "Error", msg: `Rellene los campos que se indican` };
				//Manda la solicitud y recibe la respuesta del servidor
				const respuesta = await axios.post(
					`https://localhost:4001/cuentas/habiente`,
					{
						habienteId: parseInt(this.habienteId),
						bancariaId: parseInt(this.bancariaId),
					}
				);
				this.$root.$emit("mostrar", respuesta?.data);
				this.$root.$emit("actualizar", `Actualizate`);
				this.habienteId = this.bancariaId = ``;
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