<template>
	<div class="agregar-saldo">
		<v-dialog v-model="dialog" max-width="500px">
			<template v-slot:activator="{ on, attrs }">
				<v-btn small  light class="mb-2" v-bind="attrs" v-on="on">
					Agregar Saldo
				</v-btn>
			</template>
			<v-card>
				<v-card-title
					>Agregar Saldo Cuenta Bancaria con ID = {{ id }}</v-card-title
				>
				<v-divider />
				<v-card-text>
					<v-form ref="form">
						<v-text-field
							v-model="saldo"
							type="number"
							label="Saldo a retirar"
							:rules="validarSaldo"
							min="1"
							placeholder="Ingrese saldo a retirar cuenta"
							required
						/>
					</v-form>
				</v-card-text>
				<v-card-actions>
					<v-spacer />
					<v-btn @click="cerrar" color="orange" text>Cerrar</v-btn>
					<v-btn @click="agregarSaldo" color="orange" text>Agregar</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</div>
</template>

<script>
const axios = require("axios");

export default {
	name: "AgregarSaldo",
	props: {
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
				this.cerrar();
			} catch (error) {
				this.$root.$emit("mostrar", error);
			}
		},
		cerrar() {
			this.dialog = false;
			this.saldo = ``;
			this.$refs.form.resetValidation();
		},
	},
};
</script>

<style>
</style>