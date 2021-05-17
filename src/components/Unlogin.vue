<template>
	<div class="transferencia">
		<v-dialog v-model="dialog" max-width="500px">
			<template v-slot:activator="{ on, attrs }">
				<v-btn small class="mb-2" v-bind="attrs" v-on="on">
					Cerrar Sesión
				</v-btn>
			</template>
			<v-card>
				<v-card-title class="headline">Cerrar sesion</v-card-title>
				<v-card-text>¿Esta seguro que quiere cerrar sesión? con </v-card-text>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn color="orange" text @click="cerrar">Cancelar</v-btn>
					<v-btn color="orange" text @click="cerrarSesion">OK</v-btn>
					<v-spacer></v-spacer>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</div>
</template>

<script>
import axios from 'axios';

export default {
	name: "Unlogin",
	data() {
		return {
			dialog: false,
		};
	},
	methods: {
		cerrarSesion() {
			try {
				localStorage.removeItem("token");
				this.$root.$emit("login");
				this.cerrar();
				axios.defaults.headers.common[
					"Authorization"
				] = `Bearer ${localStorage.getItem("token")}`;
				if (this.$router.currentRoute.name !== `Inicio`)
					this.$router.push({ name: "Inicio", query: { redirect: "/" } });
			} catch (error) {
				this.$root.$emit("mostrar", error);
			}
		},
		cerrar() {
			this.dialog = false;
		},
	},
};
</script>

<style>
</style>