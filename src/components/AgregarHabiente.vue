<template>
	<div class="agregar-hab">
		<v-dialog v-model="dialog" max-width="500px">
			<template v-slot:activator="{ on, attrs }">
				<v-btn class="mb-2" color="orange" text v-bind="attrs" v-on="on">
					Nuevo Habiente
				</v-btn>
			</template>
			<v-card>
				<v-card-title>Agregar Cuenta Habiente</v-card-title>
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
					<v-btn @click="enviarDato" color="orange" text>Enviar</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</div>
</template>

<script>
const axios = require(`axios`);

export default {
	name: "AgregarHabiente",
	data() {
		return {
			dialog: false,
			nombre: "",
			validarNombre: [(v) => !!v || "El nombre debe de rellenarse"],
		};
	},
	watch: {
		dialog(val) {
			val || this.cerrar();
		},
	},
	methods: {
		async enviarDato() {
			try {
				if (!this.$refs.form.validate())
					throw { type: "Error", msg: `Rellene los campos que se indican` };
				//Manda la solicitud y recibe la respuesta del servidor
				const respuesta = await axios.post("https://localhost:4001/habientes", {
					nombre: this.nombre,
				});
				this.$root.$emit("mostrar", respuesta.data);
				//Manda a actualizar la tabla
				this.$root.$emit("actualizar", `Actualizate`);
				this.cerrar();
			} catch (error) {
				this.$root.$emit("mostrar", error);
			}
		},
		cerrar() {
			this.nombre = "";
			this.$refs.form.resetValidation();
			this.dialog = false;
		},
	},
};
</script>
