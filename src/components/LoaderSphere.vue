<template>
	<div class="loader-sphere" :class="{ 'loader-sphere-leaving': leaving }" aria-hidden="true">
		<div class="loader-sphere-spin">
			<ul v-for="plane in PLANES" :key="plane" class="loader-plane">
				<li v-for="dot in DOTS" :key="dot"></li>
			</ul>
		</div>
	</div>
</template>

<script setup>
/*
 * Esfera de puntos en 3D, CSS puro: un solo keyframe de rotación en el contenedor
 * mueve los 288 puntos. Los ángulos de cada plano y de cada punto viven en reglas
 * :nth-child de style.css, no en atributos style, porque inline costarían HTML extra
 * por nodo en cada respuesta SSR. Bajo md, style.css oculta la mitad de los planos
 * y de los puntos (12 x 6 = 72 pintados).
 *
 * La densidad del CodePen de referencia era 36 x 18 = 648, demasiado para un móvil:
 * un árbol preserve-3d de ese tamaño no se pinta fluido. A 15 grados el patrón se
 * lee igual de denso con menos de la mitad de nodos.
 *
 * Dos capas a propósito: la interior gira y nunca se toca, la exterior maneja la
 * salida. En un solo nodo habría que redeclarar el giro para acompañar al fade, y
 * eso lo reiniciaría en 0°: la esfera daría un salto justo al empezar a salir.
 *
 * Presentacional puro: no sabe nada del estado de carga.
 */
const PLANES = 24
const DOTS = 12

defineProps({
	leaving: { type: Boolean, default: false },
})
</script>
