<template>
	<div id="tabla-habiente">
		<v-container>
			<v-row>
				<v-col cols="12" sm="12">
					<h1>{{ titulo }}</h1>
					<v-data-table
						:headers="vista ? cabeceras : cabeceras2"
						:items="habientes"
						:loading="cargando"
						:items-per-page="5"
						loading-text="Cargando... Espere, por favor"
					>
						<template v-slot:top>
							<v-toolbar flat>
								<v-toolbar-title
									v-text="
										vista
											? `Mi CRUD CuentaHabientes`
											: `Información CuentaHabientes`
									"
								></v-toolbar-title>
								<v-spacer></v-spacer>
								<AgregarHabiente v-if="vista"></AgregarHabiente>
							</v-toolbar>
						</template>

						<template v-if="vista" v-slot:item.acciones="{ item }">
							<v-container>
								<v-row>
									<v-col cols="12" sm="1">
										<EliminarHabiente :id="item.id"></EliminarHabiente>
									</v-col>
									<v-col cols="12" sm="1">
										<ModificarHabiente :habiente="item"></ModificarHabiente>
									</v-col>
								</v-row>
							</v-container>
						</template>
					</v-data-table>
				</v-col>
			</v-row>
		</v-container>
		<v-snackbar v-model="snackbar">
			{{ textoError }}
			<template v-slot:action="{ attrs }">
				<v-btn color="pink" text v-bind="attrs" @click="snackbar = false">
					Cerrar
				</v-btn>
			</template>
		</v-snackbar>
	</div>
</template>

<script>
import AgregarHabiente from "./AgregarHabiente.vue";
import EliminarHabiente from "./EliminarHabiente.vue";
import ModificarHabiente from "./ModificarHabiente.vue";

const axios = require("axios");

export default {
	components: { AgregarHabiente, EliminarHabiente, ModificarHabiente },
	name: "TablaHabiente",
	props: {
		vista: Boolean,
	},
	data() {
		return {
			cargando: true,
			titulo: "Tabla CuentaHabientes",
			textoError: ``,
			snackbar: false,
			habientes: [],
			cabeceras: [
				{ text: "Id Habiente", value: "id" },
				{ text: "Nombre", value: "nombre" },
				{ text: "Acciones", value: "acciones" },
			],
			cabeceras2: [
				{ text: "Id Habiente", value: "id" },
				{ text: "Nombre", value: "nombre" },
			],
		};
	},
	mounted() {
		this.mostrar();
		this.$root.$on("actualizar", () => {
			this.mostrar();
		});
	},
	methods: {
		mostrar() {
			this.snackbar = false;
			this.cargando = true;
			axios
				.get("https://localhost:4001/habientes")
				.then((datos) => {
					this.habientes = datos.data;
					this.cargando = false;
				})
				.catch((error) => {
					console.error(error);

					this.textoError =
						"No se ha podido realizar una conexión con el servidor, Intentando de nuevo";
					this.snackbar = true;
					setTimeout(this.mostrar, 5000);
				});
		},
	},
};
</script>
