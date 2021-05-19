<template>
	<div class="agregar-hav-cuenta">
		<v-dialog v-model="dialog" max-width="500px">
			<template v-slot:activator="{ on, attrs }">
				<v-btn small light class="mb-2" v-bind="attrs" v-on="on">
					Agregar CuentaHabiente
				</v-btn>
			</template>
			<v-card>
				<v-card-title
					>Agregar Habiente a Cuenta Bancaria Existente</v-card-title
				>
				<v-divider />
				<v-card-text>
					<h3>
						Agregar cuentahabiente con id {{ habienteId }} a cuenta bancaria con
						id {{ bancariaId }}
					</h3>
					<v-form ref="form">
						Cuenta Habiente Id<v-text-field
							v-model="habienteId"
							type="number"
							label="ID Cuenta Habiente"
							:rules="validar"
							min="1"
							placeholder="Ingrese ID"
							color="orange"
							required
						/>
					</v-form>
				</v-card-text>
				<v-card-actions>
					<v-spacer />
					<v-btn @click="cerrar" color="orange" text>Cerrar</v-btn>
					<v-btn @click="agregarHabCuenta" color="orange" text>Agregar</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</div>
</template>

<script>
const axios = require("axios");

export default {
	name: "AgregarHabienteCuenta",
	props: {
		bancariaId: Number,
	},
	data() {
		return {
			dialog: false,
			habienteId: ``,
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
				this.cerrar();
			} catch (error) {
				this.$root.$emit("mostrar", error);
			}
		},
		cerrar() {
			this.habienteId = ``;
			this.$refs.form.resetValidation();
			this.dialog = false;
		},
	},
};
</script>

<style>
</style>