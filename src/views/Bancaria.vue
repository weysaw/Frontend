<template>
	<div class="bancaria">
		<TablaBancaria></TablaBancaria>
    <AgregarCuenta></AgregarCuenta>
    <ConsultarSaldo></ConsultarSaldo>
    <AgregarSaldo></AgregarSaldo>
    <RetirarSaldo></RetirarSaldo>
    <TransferenciaBancaria></TransferenciaBancaria>
    <AgregarHabienteCuenta></AgregarHabienteCuenta>
    <BorrarCuenta></BorrarCuenta>
  </div>
</template>

<script>
import TablaBancaria from "../components/TablaBancaria.vue";
import AgregarCuenta from '../components/AgregarCuenta.vue';
import ConsultarSaldo from '../components/ConsultarSaldo.vue';
import AgregarSaldo from '../components/AgregarSaldo.vue';
import RetirarSaldo from '../components/RetirarSaldo.vue';
import TransferenciaBancaria from '../components/TransferenciaBancaria.vue';
import AgregarHabienteCuenta from '../components/AgregarHabienteCuenta.vue';
import BorrarCuenta from '../components/BorrarCuenta.vue';

export default {
	components: { TablaBancaria, AgregarCuenta, ConsultarSaldo, AgregarSaldo, RetirarSaldo, TransferenciaBancaria, AgregarHabienteCuenta, BorrarCuenta },
	name: "Habientes",
};
</script>

<style>
</style>