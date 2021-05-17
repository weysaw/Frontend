<template>
	<div class="transferencia">
		<v-dialog v-model="dialog" max-width="500px">
			<template v-slot:activator="{ on, attrs }">
				<v-btn small class="mb-2" v-bind="attrs" v-on="on">
					Iniciar Sesión
				</v-btn>
			</template>
			<v-card>
				<v-card-title>Iniciar Sesión</v-card-title>
				<v-divider />
				<v-card-text>
					<v-form ref="form">
						<v-container>
							<v-row>
								<v-col cols="12" sm="6">
									<v-text-field
										v-model="username"
										label="Nombre Usuario"
										:rules="validar"
										placeholder="Ingrese nombre de usuario"
										color="orange"
									/>
								</v-col>
								<v-col cols="12" sm="6">
									<v-text-field
										v-model="password"
										color="orange"
										:append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
										:rules="validar"
										:type="show1 ? 'text' : 'password'"
										name="input-10-1"
										label="Contraseña"
										counter
										@click:append="show1 = !show1"
									></v-text-field>
								</v-col>
							</v-row>
						</v-container>
					</v-form>
				</v-card-text>
				<v-card-actions>
					<v-spacer />
					<v-btn @click="cerrar" color="orange" text>Cerrar</v-btn>
					<v-btn @click="iniciarSesion" :loading="loading" color="orange" text
						>Aceptar</v-btn
					>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</div>
</template>

<script>
const axios = require("axios");

export default {
	name: "Login",
	data() {
		return {
			dialog: false,
			loading: false,
			show1: false,
			username: "",
			password: "",
			validar: [(v) => !!v || `Este campo es obligatorio`],
		};
	},
	watch: {
		dialog(val) {
			val || this.cerrar();
		},
	},
	methods: {
		async iniciarSesion() {
			try {
				this.loading = true;
				if (!this.$refs.form.validate())
					throw { type: "Error", msg: `Rellene los campos que se indican` };
				//Manda la solicitud y recibe la respuesta del servidor
				const respuesta = await axios.post("https://localhost:4001/login", {
					username: this.username,
					password: this.password,
				});
				this.$root.$emit("mostrar", respuesta.data);
				localStorage.setItem("token", respuesta.data.token);
				axios.defaults.headers.common[
					"Authorization"
				] = `Bearer ${localStorage.getItem("token")}`;
				this.$root.$emit("login");
				this.cerrar();
			} catch (error) {
				this.$root.$emit("mostrar", error);
			} finally {
				this.loading = false;
			}
		},
		cerrar() {
			this.username = "";
			this.password = "";
			this.$refs.form.resetValidation();
			this.dialog = false;
		},
	},
};
</script>

<style>
</style>