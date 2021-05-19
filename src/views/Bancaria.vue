<template>
	<div class="bancaria">
		<TablaBancaria></TablaBancaria>
		<TablaHabiente :vista="false"></TablaHabiente>
	</div>
</template>

<script>
import TablaBancaria from "../components/TablaBancaria.vue";
import TablaHabiente from "../components/TablaHabiente.vue";

export default {
	components: {
		TablaBancaria,
		TablaHabiente,
	},
	name: "CuentaBancaria",
};
</script>

<style>
</style>