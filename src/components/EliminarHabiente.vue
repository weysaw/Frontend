<template>
	<div class="eliminar-hab">
		<v-container>
			<v-row>
				<v-col cols="12" sm="4" class="ma-auto">
					<h2>Eliminar habiente</h2>
					<v-form ref="form">
						<v-text-field
							v-model="id"
							label="Id"
							type="number"
							:rules="validarId"
							min="1"
							placeholder="Ingrese id"
							required
						></v-text-field>
						<v-btn @click="eliminarDato" light>Enviar</v-btn>
					</v-form>
				</v-col>
			</v-row>
		</v-container>
	</div>
</template>

<script>
const axios = require(`axios`);

export default {
	name: "EliminarHabiente",
	data() {
		return {
			id: 1,
			validarId: [
				(v) => !!v || "Ingrese un id valido",
				(v) => parseInt(v) >= 0 || "El id debe de ser positivo",
			],
		};
	},
	methods: {
		async eliminarDato() {
			try {
				if (!this.$refs.form.validate())
					throw { type: "Error", msg: `Rellene los campos que se indican` };
				//Manda la solicitud y recibe la respuesta del servidor
				const respuesta = await axios.delete(
					`https://localhost:4001/habientes/${this.id}`
				);
				this.$root.$emit("mostrar", respuesta.data);
				//Manda un evento para que se actualize la tabla mostrada
				this.$root.$emit("actualizar", `Actualizate`);
				this.id = "";
				this.$refs.form.resetValidation();
			} catch (error) {
				this.$root.$emit("mostrar", error);
			}
		},
	},
};
</script>