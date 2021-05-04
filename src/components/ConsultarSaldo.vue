<template>
	<div class="consulta-saldo">
		<v-container>
			<v-row>
				<v-col cols="12" sm="4" class="ma-auto">
					<h2>Consulta Saldo Cuenta</h2>
					<v-form ref="form">
						<v-text-field
							v-model="id"
							type="number"
							label="Id"
							min="1"
							:rules="validarId"
							placeholder="Ingrese id cuenta"
							required
						/>
						<v-btn @click="consultaSaldo" light>Consultar</v-btn>
					</v-form>
				</v-col>
			</v-row>
		</v-container>
	</div>
</template>

<script>
const axios = require(`axios`);

export default {
	name: `ConsultarSaldo`,
	data() {
		return {
			id: 1,
			validarId: [
				(v) => !!v || "Ingrese un id valido",
				(v) => parseInt(v) >= 0 || "El id debe de ser positivo",
			],
		};
	},
	methods: {
		async consultaSaldo() {
			try {
				if (!this.$refs.form.validate())
					throw { type: "Error", msg: `Rellene los campos que se indican` };
				//Manda la solicitud y recibe la respuesta del servidor
				const respuesta = await axios.get(
					`https://localhost:4001/cuentas/saldo/${this.id}`
				);
				this.$root.$emit("mostrar", respuesta.data);
				this.id = 1;
			} catch (error) {
				this.$root.$emit("mostrar", error);
			}
		},
	},
};
</script>

<style>
</style>