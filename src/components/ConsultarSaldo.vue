<template>
	<div class="consulta-saldo">
		<h2>Consulta Saldo Cuenta</h2>
		<form @submit="consultaSaldo" method="get">
			Id<input
				v-model="id"
				type="number"
				name="id"
				min="1"
				placeholder="Ingrese id cuenta"
				required
			/>
			<button type="submit">Consultar</button>
			<p v-if="id == ``">Favor de rellenar todos los campos</p>
		</form>
	</div>
</template>

<script>
import Control from '../main';
const axios = require(`axios`);

export default {
	name: `ConsultarSaldo`,
	data() {
		return {
			id: 1,
		};
	},
	methods: {
		async consultaSaldo(e) {
			try {
				//Previene que no cambie de página
				e.preventDefault();
				//Manda la solicitud y recibe la respuesta del servidor
				const respuesta = await axios(`https://localhost:4001/cuentas/saldo`, {
					params: { id: this.id },
				});
				alert(respuesta?.data?.msg);
				this.id = 1;
			} catch (error) {
				Control.validarError(error);
			}
		},
	},
};
</script>

<style>
</style>