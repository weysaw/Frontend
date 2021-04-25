<template>
	<div class="habientes">
		<TablaHabiente></TablaHabiente>
		<AgregarHabiente></AgregarHabiente>
		<ModificarHabiente></ModificarHabiente>
		<EliminarHabiente></EliminarHabiente>
	</div>
</template>

<script>
import TablaHabiente from "../components/TablaHabiente.vue";
import AgregarHabiente from "../components/AgregarHabiente.vue";
import ModificarHabiente from "../components/ModificarHabiente.vue";
import EliminarHabiente from "../components/EliminarHabiente.vue";

export default {
	components: {
		TablaHabiente,
		AgregarHabiente,
		ModificarHabiente,
		EliminarHabiente,
	},
	name: "Habientes",
};
</script>
<style>
</style>