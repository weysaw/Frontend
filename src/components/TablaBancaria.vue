<template>
	<div id="tabla-bancaria">
		<v-container>
			<v-row>
				<v-col cols="12" sm="12">
					<h1>{{ titulo }}</h1>
					<v-data-table
						:loading="cargando"
						loading-text="Cargando... Espere, por favor"
						:headers="cabeceras"
						:items="cuentasBancarias"
						:items-per-page="5"
					>
						<template v-slot:top>
							<v-toolbar flat>
								<v-toolbar-title>Mi CRUD Cuenta Bancarias</v-toolbar-title>
								<v-spacer></v-spacer>
								<AgregarCuenta></AgregarCuenta>
							</v-toolbar>
						</template>
						<template v-slot:item.acciones="{ item }">
							<ConsultarSaldo :id="item.id"></ConsultarSaldo>
							<AgregarSaldo :id="item.id"></AgregarSaldo>
							<RetirarSaldo
								:defectoSaldo="item.saldo"
								:id="item.id"
							></RetirarSaldo>
							<TransferenciaBancaria
								:origenId="item.id"
							></TransferenciaBancaria>
							<AgregarHabienteCuenta :bancariaId="item.id"></AgregarHabienteCuenta>
							<BorrarCuenta :id="item.id"></BorrarCuenta>
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
import AgregarCuenta from "./AgregarCuenta.vue";
import AgregarHabienteCuenta from './AgregarHabienteCuenta.vue';
import AgregarSaldo from "./AgregarSaldo.vue";
import BorrarCuenta from "./BorrarCuenta.vue";
import ConsultarSaldo from "./ConsultarSaldo.vue";
import RetirarSaldo from "./RetirarSaldo.vue";
import TransferenciaBancaria from "./TransferenciaBancaria.vue";
const axios = require("axios");

export default {
	components: {
		AgregarCuenta,
		ConsultarSaldo,
		RetirarSaldo,
		AgregarSaldo,
		TransferenciaBancaria,
		BorrarCuenta,
AgregarHabienteCuenta,
	},
	name: "TablaBancaria",
	data() {
		return {
			cargando: true,
			titulo: "Tabla Cuentas Bancarias",
			textoError: ``,
			snackbar: false,
			cuentasBancarias: [],
			cabeceras: [
				{ text: "Id Cuenta", value: `id` },
				{ text: `Saldo`, value: `saldo` },
				{ text: `Datos Habientes`, value: `datos` },
				{ text: `Acciones`, value: `acciones` },
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
			this.cargando = true;
			axios
				.get("https://localhost:4001/cuentas")
				.then((datos) => {
					this.cuentasBancarias = [];
					const cuentas = datos.data;
					for (const cuenta of cuentas) {
						this.cuentasBancarias.push({
							id: cuenta[0].id,
							saldo: cuenta[0].saldo,
							datos: JSON.stringify(cuenta[1]),
						});
					}
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

<style>
</style>