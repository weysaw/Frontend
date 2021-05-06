<template>
	<div class="habientes">
		<TablaHabiente></TablaHabiente>
		<MensajePopup></MensajePopup>
	</div>
</template>

<script>
import TablaHabiente from "../components/TablaHabiente.vue";
import MensajePopup from "../components/MensajePopup.vue";

export default {
	components: {
		TablaHabiente,
		MensajePopup,
	},
	name: "Habientes",
};
</script>
<style>
</style>