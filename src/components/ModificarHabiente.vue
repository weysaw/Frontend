<template>
	<div class="modificar-habiente">
		<v-container>
			<v-row>
				<v-col cols="12" sm="6" class="ma-auto">
					<h2>Modificar habiente</h2>
					<v-form ref="form">
						<v-text-field
							v-model="id"
							type="number"
							min="1"
							label="Id"
							:rules="validarId"
							placeholder="Ingrese num"
							required
						/>
						<v-text-field
							v-model="nombre"
							type="text"
							:rules="validarNombre"
							label="Nombre"
							placeholder="Nombre habiente"
							required
						/>
						<v-btn light @click="ingresarDatos">Enviar</v-btn>
					</v-form>
				</v-col>
			</v-row>
		</v-container>
	</div>
</template>

<script>
const axios = require("axios");

export default {
	name: "ModificarHabiente",
	data() {
		return {
			id: 1,
			nombre: "",
			validarId: [
				(v) => !!v || "Ingrese un id valido",
				(v) => parseInt(v) >= 0 || "El id debe de ser positivo",
			],
			validarNombre: [(v) => !!v || "El nombre debe de rellenarse"],
		};
	},
	methods: {
		async ingresarDatos() {
			try {
				//Previene que no cambie de página
				if (!this.$refs.form.validate())
					throw { type: "Error", msg: `Rellene los campos que se indican` };
				//Manda la solicitud y recibe la respuesta del servidor
				const respuesta = await axios.put(
					`https://localhost:4001/habientes/${this.id}/`,
					{ nombre: this.nombre }
				);
				this.$root.$emit("mostrar", respuesta.data);
				//Manda un evento para que se actualize la tabla mostrada
				this.$root.$emit("actualizar", `Actualizate`);
				this.nombre = "";
				this.$refs.form.resetValidation();
			} catch (error) {
				//Muestra el error dependiendo si lo manda el server
				this.$root.$emit("mostrar", error);
			}
		},
	},
};
</script>
