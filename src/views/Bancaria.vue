<template>
	<div class="bancaria">
		<TablaBancaria></TablaBancaria>
		<MensajePopup></MensajePopup>
	</div>
</template>

<script>
import TablaBancaria from "../components/TablaBancaria.vue";
import MensajePopup from "../components/MensajePopup.vue";

export default {
	components: {
		TablaBancaria,
		MensajePopup,
	},
	name: "Habientes",
};
</script>

<style>
</style>