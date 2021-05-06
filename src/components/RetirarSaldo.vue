<template>
	<div class="retirar-saldo">
		<v-dialog v-model="dialog" max-width="500px">
			<template v-slot:activator="{ on, attrs }">
				<v-btn small light class="mb-2" v-bind="attrs" v-on="on">
					Retirar Saldo
				</v-btn>
			</template>
			<v-card>
				<v-card-title
					>Retirar Saldo Cuenta Bancaria con ID = {{ id }}</v-card-title
				>
				<v-divider />
				<v-card-text>
					<v-form ref="form">
						<v-text-field
							v-model="saldo"
							type="number"
							label="Saldo a retirar"
							:rules="validarSaldo"
							color="orange"
							min="1"
							:max="defectoSaldo"
							placeholder="Ingrese saldo a retirar cuenta"
							required
						/>
					</v-form>
				</v-card-text>
				<v-card-actions>
					<v-spacer />
					<v-btn @click="cerrar" color="orange" text>Cerrar</v-btn>
					<v-btn @click="retirarSaldo" color="orange" text>Retirar</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</div>
</template>

<script>
const axios = require("axios");

export default {
	name: "RetirarSaldo",
	props: {
		defectoSaldo: Number,
		id: Number,
	},
	data() {
		return {
			saldo: "",
			dialog: false,
			validarSaldo: [
				(v) => !!v || "El saldo es obligatorio",
				(v) => parseInt(v) >= 0 || "El saldo debe ser positivo",
			],
		};
	},
	watch: {
		dialog(val) {
			val || this.cerrar();
		},
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
				this.saldo = ``;
			} catch (error) {
				this.$root.$emit("mostrar", error);
			}
		},
		cerrar() {			
			this.dialog = false;
			this.saldo = this.defectoSaldo;
			this.$refs.form.resetValidation();
		},
	},
};
</script>

<style>
</style>