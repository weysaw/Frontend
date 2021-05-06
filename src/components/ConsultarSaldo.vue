<template>
	<div class="consulta-saldo">
		<v-dialog v-model="dialog" max-width="500px">
			<template v-slot:activator="{ on, attrs }">
				<v-btn
					small 
					light
					class="mb-2"
					v-bind="attrs"
					v-on="on"
					@click="consultaSaldo"
				>
					Consultar Saldo
				</v-btn>
			</template>
			<v-card>
				<v-card-title>Consulta Saldo Cuenta</v-card-title>
				<v-divider />
				<v-card-text>
					{{ info }}
				</v-card-text>
				<v-card-actions>
					<v-spacer />
					<v-btn @click="cerrar" color="orange" text>Cerrar</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</div>
</template>

<script>
const axios = require(`axios`);

export default {
	name: `ConsultarSaldo`,
	props: {
		id: Number,
	},
	data() {
		return {
			info: ``,
			dialog: false,
			validarId: [
				(v) => !!v || "Ingrese un id valido",
				(v) => parseInt(v) >= 0 || "El id debe de ser positivo",
			],
		};
	},
	methods: {
		async consultaSaldo() {
			try {
				//Manda la solicitud y recibe la respuesta del servidor
				const respuesta = await axios.get(
					`https://localhost:4001/cuentas/saldo/${this.id}`
				);
				this.info = respuesta.data.msg;
			} catch (error) {
				this.$root.$emit("mostrar", error);
			}
		},
		cerrar() {
			this.dialog = false;
		},
	},
};
</script>

<style>
</style>