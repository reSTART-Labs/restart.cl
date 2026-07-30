<template>
	<div class="loader-sphere" :class="{ 'loader-sphere-leaving': leaving }" aria-hidden="true">
		<ul v-for="plane in PLANES" :key="plane" class="loader-plane">
			<li v-for="dot in DOTS" :key="dot"></li>
		</ul>
	</div>
</template>

<script setup>
/*
 * Esfera de puntos en 3D, CSS puro: un solo keyframe de rotación en el contenedor
 * mueve los 648 puntos. Los ángulos de cada plano y de cada punto viven en reglas
 * :nth-child de style.css, no en atributos style, porque inline costarían ~26 KB
 * de HTML en cada respuesta SSR. Bajo md, style.css oculta la mitad de los planos
 * y de los puntos.
 *
 * Presentacional puro: no sabe nada del estado de carga.
 */
const PLANES = 36
const DOTS = 18

defineProps({
	leaving: { type: Boolean, default: false },
})
</script>
