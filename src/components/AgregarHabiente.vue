<template>
	<div class="agregar-hab">
		<v-container>
			<v-row>
				<v-col cols="12" sm="6" class="ma-auto">
					<h2>Agregar habiente</h2>
					<v-form ref="form">
						<v-text-field
							v-model="nombre"
							label="Nombre"
							placeholder="Ingrese el nombre"
							:rules="validarNombre"
							required
						></v-text-field>
						<v-btn @click="enviarDato" light>Enviar</v-btn>
					</v-form>
				</v-col>
			</v-row>
		</v-container>
	</div>
</template>

<script>
const axios = require(`axios`);

export default {
	name: "AgregarHabiente",
	data() {
		return {
			nombre: "",
			validarNombre: [(v) => !!v || "El nombre debe de rellenarse"],
		};
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
				this.nombre = "";
				this.$refs.form.resetValidation();
			} catch (error) {
				this.$root.$emit("mostrar", error);
			}
		},
	},
};
</script>
