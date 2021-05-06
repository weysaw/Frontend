<template>
	<div class="agregar-cuenta">
		<v-dialog v-model="dialog" max-width="500px">
			<template v-slot:activator="{ on, attrs }">
				<v-btn color="orange" text class="mb-2" v-bind="attrs" v-on="on">
					Nueva Cuenta Bancaria
				</v-btn>
			</template>
			<v-card>
				<v-card-title>Agregar Cuenta Bancaria</v-card-title>
				<v-divider />
				<v-card-text>
					<v-form ref="form">
						<v-container>
							<v-row>
								<v-col cols="12" sm="6"
									><v-text-field
										type="number"
										v-model="habienteId"
										label="habienteId"
										min="1"
										:rules="validarId"
										placeholder="Ingrese id habiente"
										required
									/>
								</v-col>
								<v-col cols="12" sm="6"
									><v-text-field
										type="number"
										v-model="saldo"
										label="Saldo"
										min="1"
										:rules="validarSaldo"
										placeholder="Ingrese saldo cuenta"
										required
									/>
								</v-col>
							</v-row>
						</v-container>
					</v-form>
				</v-card-text>
				<v-card-actions>
					<v-spacer />
					<v-btn color="orange" text @click="cerrar" >Cerrar</v-btn>
					<v-btn color="orange" text @click="agregarCuenta" >Agregar Cuenta</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</div>
</template>

<script>
const axios = require("axios");

export default {
	name: "AgregarCuenta",
	data() {
		return {
			dialog: false,
			saldo: "",
			habienteId: "",
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
		async agregarCuenta() {
			try {
				if (!this.$refs.form.validate())
					throw { type: "Error", msg: `Rellene los campos que se indican` };
				//Manda la solicitud y recibe la respuesta del servidor
				const respuesta = await axios.post("https://localhost:4001/cuentas", {
					saldo: this.saldo,
					habienteId: this.habienteId,
				});
				//Muestra el dialog con el dato
				this.$root.$emit("mostrar", respuesta.data);
				//Actualiza la tabla
				this.$root.$emit("actualizar", `Actualizate`);
				this.cerrar();	
			} catch (error) {
				this.$root.$emit("mostrar", error);
			}
		},
		cerrar() {
			this.saldo = "";
			this.habienteId = ``;
			this.$refs.form.resetValidation();
			this.dialog = false;
		},
	},
};
</script>

<style>
</style>