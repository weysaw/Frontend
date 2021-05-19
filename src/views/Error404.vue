<template>
	<div class="no-encontrada">
		<v-container>
			<v-row>
				<v-col cols="12" sm="12">
					<h1>Página no encontrada</h1>
				</v-col>
			</v-row>
			<v-row>
				<v-col cols="12" sm="8" class="ma-auto">
					<v-img src="../assets/img/error404.gif" alt="Página no encontrada"></v-img>
				</v-col>
			</v-row>
			<v-row>
				<v-col cols="12" sm="12">
					<v-btn @click="irInicio">Ir a inicio</v-btn>
				</v-col>
			</v-row>
		</v-container>
	</div>
</template>

<script>
export default {
	name: "Error404",
	methods: {
		irInicio() {
			this.$router.push({ name: "Inicio" });
		},
	},
};
</script>

<style>
</style>