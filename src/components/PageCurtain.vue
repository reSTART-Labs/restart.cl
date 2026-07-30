<template>
	<div class="curtain" :class="{ 'curtain-open': open }" aria-hidden="true">
		<div class="curtain-half curtain-top">
			<span v-for="slat in SLATS" :key="slat" class="curtain-slat"></span>
		</div>
		<div class="curtain-half curtain-bottom">
			<span v-for="slat in SLATS" :key="slat" class="curtain-slat"></span>
		</div>
	</div>
</template>

<script setup>
/*
 * Cortina de 5 columnas partidas en dos mitades. Al abrirse, cada columna de
 * arriba se retrae hacia arriba y la de abajo hacia abajo, escalonadas de
 * izquierda a derecha (stagger de 150 ms, medido de team-work.cl).
 *
 * Las persianas son el fondo del overlay: no hay una capa de color aparte.
 * Presentacional puro: no sabe nada del estado de carga.
 */
const SLATS = 5

defineProps({
	open: { type: Boolean, default: false },
})
</script>
