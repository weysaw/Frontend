<template>
	<div class="transferencia">
		<v-dialog v-model="dialog" max-width="500px">
			<template v-slot:activator="{ on, attrs }">
				<v-btn small light class="mb-2" v-bind="attrs" v-on="on">
					Transferencia Bancaria
				</v-btn>
			</template>
			<v-card>
				<v-card-title
					>Transferencia bancaria de cuenta con ID = {{ origenId }} a cuenta con
					ID = {{ destinoId }}</v-card-title
				>
				<v-divider />
				<v-card-text>
					<v-form ref="form">
						<v-container>
							<v-row>
								<v-col cols="12" sm="6">
									<v-text-field
										v-model="saldo"
										type="number"
										label="Saldo"
										:rules="validar"
										placeholder="saldo transferir"
										min="1"
										required
									/>
								</v-col>
								<v-col cols="12" sm="6">
									<v-text-field
										v-model="destinoId"
										type="number"
										label="Cuenta Bancaria Destino"
										:rules="validar"
										placeholder="ID"
										min="1"
										required
									/>
								</v-col>
							</v-row>
						</v-container>
					</v-form>
				</v-card-text>
				<v-card-actions>
					<v-spacer />
					<v-btn @click="cerrar" color="orange" text>Cerrar</v-btn>
					<v-btn @click="realizarTransferencia" color="orange" text>Transferencia</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</div>
</template>

<script>
const axios = require("axios");

export default {
	name: "TransferenciaBancaria",
	props: {
		origenId: Number,
	},
	data() {
		return {
			dialog: false,
			saldo: "",
			destinoId: "",
			validar: [
				(v) => !!v || `Este campo es obligatorio`,
				(v) => parseInt(v) >= 0 || "El numero debe ser positivo",
			],
		};
	},
	watch: {
		dialog(val) {
			val || this.cerrar();
		},
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
				//Manda un evento para que se actualize la tabla mostrada
				this.$root.$emit("actualizar", `Actualizate`);
				this.$refs.form.resetValidation();
				this.cerrar();
			} catch (error) {
				this.$root.$emit("mostrar", error);
			}
		},
		cerrar() {
			this.saldo = this.destinoId = "";
			this.$refs.form.resetValidation();
			this.dialog = false;
		},
	},
};
</script>

<style>
</style>