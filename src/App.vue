<template>
	<v-app id="inspire">
		<v-navigation-drawer v-if="sesion" v-model="drawer" temporary app clipped>
			<v-list>
				<v-list-item>
					<v-list-item-content>
						<v-list-item-title class="title"> Opciones </v-list-item-title>
						<v-list-item-subtitle> Seleccione una opción </v-list-item-subtitle>
					</v-list-item-content>
				</v-list-item>
			</v-list>
			<v-divider></v-divider>
			<v-list nav dense rounded>
				<v-list-item
					v-for="([nombre, texto], i) in secciones"
					:key="i"
					:to="nombre"
				>
					<v-list-item-content v-text="texto"></v-list-item-content>
				</v-list-item>
			</v-list>
		</v-navigation-drawer>

		<v-app-bar app color="orange">
			<v-app-bar-nav-icon
				v-if="sesion"
				@click="drawer = !drawer"
			></v-app-bar-nav-icon>
			<v-toolbar-title
				>CRUD Cuentas Bancarias y Cuentas Habientes</v-toolbar-title
			>
			<v-spacer></v-spacer>
			<Login v-if="!sesion"></Login>
			<Unlogin v-else></Unlogin>
		</v-app-bar>
		<v-main class="text-center">
			<v-container fluid>
				<v-fade-transition mode="out-in">
					<router-view />
				</v-fade-transition>
			</v-container>
			<mensaje-popup></mensaje-popup>
		</v-main>
	</v-app>
</template>

<script>
import MensajePopup from "./components/MensajePopup.vue";
import Login from "./components/Login.vue";
import Unlogin from "./components/Unlogin.vue";
import axios from "axios";

export default {
	components: { Login, MensajePopup, Unlogin },
	data: () => ({
		drawer: null,
		sesion: false,
		secciones: [
			["/", `Inicio`],
			["/habientes", `Cuenta Habientes`],
			["/cuentas", `Cuentas Bancarias`],
		],
	}),
	beforeMount() {
		axios.defaults.headers.common[
			"Authorization"
		] = `Bearer ${localStorage.getItem("token")}`;
	},
	mounted() {
		if (localStorage.getItem("token")) this.cambiarSesion();
		this.$root.$on("login", () => {
			this.cambiarSesion();
		});
	},
	methods: {
		cambiarSesion() {
			this.sesion = !this.sesion;
		},
	},
};
</script>
