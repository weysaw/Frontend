<template>
	<div class="modificar-habiente">
		<v-dialog v-model="dialog" max-width="500px">
			<template v-slot:activator="{ on, attrs }">
				<v-icon small class="mr-2" v-bind="attrs" v-on="on">
					mdi-pencil
				</v-icon>
			</template>
			<v-card>
				<v-card-title>Modificar CuentaHabiente</v-card-title>
				<v-divider />
				<v-card-text>
					<v-form ref="form">
						<v-text-field
							v-model="nombre"
							label="Nombre"
							placeholder="Ingrese el nombre"
							:rules="validarNombre"
							color="orange"
							required
						></v-text-field>
					</v-form>
				</v-card-text>
				<v-card-actions>
					<v-spacer />
					<v-btn @click="cerrar" color="orange" text>Cerrar</v-btn>
					<v-btn @click="modificarDatos" color="orange" text>Enviar</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</div>
</template>

<script>
const axios = require("axios");

export default {
	name: "ModificarHabiente",
	props: {
		habiente: Object,
	},
	data() {
		return {
			dialog: false,
			nombre: "",
			validarNombre: [(v) => !!v || "El nombre debe de rellenarse"],
		};
	},
	watch: {
		dialog(val) {
			this.nombre = this.habiente.nombre;
			val || this.cerrar();
		},
	},
	methods: {
		async modificarDatos() {
			try {
				if (!this.$refs.form.validate())
					throw { type: "Error", msg: `Rellene los campos que se indican` };
				//Manda la solicitud y recibe la respuesta del servidor
				const respuesta = await axios.put(
					`https://localhost:4001/habientes/${this.habiente.id}/`,
					{ nombre: this.nombre }
				);
				this.$root.$emit("mostrar", respuesta.data);
				//Manda un evento para que se actualize la tabla mostrada
				this.$root.$emit("actualizar", `Actualizate`);
				this.$refs.form.resetValidation();
				this.cerrar();
			} catch (error) {
				//Muestra el error dependiendo si lo manda el server
				this.$root.$emit("mostrar", error);
			}
		},
		cerrar() {
			this.dialog = false;
		},
	},
};
</script>
