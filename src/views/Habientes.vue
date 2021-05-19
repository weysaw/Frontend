<template>
	<div class="habientes">
		<TablaHabiente :vista="true"></TablaHabiente>
	</div>
</template>

<script>
import TablaHabiente from "../components/TablaHabiente.vue";

export default {
	components: {
		TablaHabiente,
	},
	name: "Habientes",
};
</script>
<style>
</style>