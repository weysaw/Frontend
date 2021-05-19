<template>
	<div class="borrar-cuenta">
		<v-dialog v-model="dialog" max-width="500px">
			<template v-slot:activator="{ on, attrs }">
				<v-icon large class="mr-2"  v-bind="attrs" v-on="on">
					mdi-delete
				</v-icon>
			</template>
			<v-card>
				<v-card-title class="headline">Borrar Cuenta Bancaria</v-card-title>
				<v-card-text
					>¿Esta seguro que quiere borrar esta Cuenta Bancaria? con id
					{{ id }}</v-card-text
				>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn color="orange" text @click="cerrar">Cancelar</v-btn>
					<v-btn color="orange" text @click="borrarCuenta">OK</v-btn>
					<v-spacer></v-spacer>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</div>
</template>

<script>
const axios = require("axios");

export default {
	name: "BorrarCuenta",
	props: {
		id: Number,
	},
	data() {
		return {
			dialog: false,
		};
	},
	watch: {
		dialog(val) {
			val || this.cerrar();
		},
	},
	methods: {
		async borrarCuenta() {
			try {
				const respuesta = await axios.delete(
					`https://localhost:4001/cuentas/${this.id}`
				);
				this.$root.$emit("mostrar", respuesta?.data);
				//Manda un evento para que se actualize la tabla mostrada
				this.$root.$emit("actualizar", `Actualizate`);
			} catch (error) {
				this.$root.$emit("mostrar", error);
			} finally {
				this.cerrar();
			}
		},
		cerrar() {
			this.dialog = false;
		},
	},
};
</script>
