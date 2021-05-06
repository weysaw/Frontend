<template>
	<v-app id="inspire">
		<v-navigation-drawer v-model="drawer" temporary app clipped>
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
			<v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

			<v-toolbar-title
				>CRUD Cuentas Bancarias y Cuentas Habientes</v-toolbar-title
			>
		</v-app-bar>
		<v-main class="text-center">
			<v-container fluid>
				<v-fade-transition mode="out-in">
					<router-view />
				</v-fade-transition>
			</v-container>
		</v-main>
	</v-app>
</template>

<script>
export default {
	data: () => ({
		drawer: null,
		secciones: [
			["/", `Inicio`],
			["/habientes", `Cuenta Habientes`],
			["/cuentas", `Cuentas Bancarias`],
		],
	}),
};
</script>
