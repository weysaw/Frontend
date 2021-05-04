<template>
	<div class="text-center">
		<v-dialog v-model="dialog" width="500">
			<v-card>
				<v-card-title> {{ titulo }}</v-card-title>
				<v-divider></v-divider>
				<v-card-text class="mt-5">{{ texto }}</v-card-text>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn @click="dialog = false"> OK </v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</div>
</template>

<script>
export default {
	name: "MensajePopup",
	data() {
		return {
			dialog: false,
			titulo: ``,
			texto: ``,
		};
	},
	mounted() {
		this.$root.$on("mostrar", (datos) => {
			this.mostrar(datos);
		});
	},
	methods: {
		mostrar(datos) {
			if (datos?.response?.data) {
				this.titulo = datos.response.data.type
				this.texto = datos.response.data.msg;
			} else {
				this.titulo = datos.type;
				this.texto = datos.msg;
			}
			this.dialog = true;
		},
	},
};
</script>

<style>
</style>