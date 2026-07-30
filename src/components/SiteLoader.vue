<template>
	<div v-if="phase !== 'done'" class="site-loader">
		<PageCurtain :open="curtainOpen" />
		<LoaderSphere v-if="hasSphere" :leaving="phase === 'opening'" />
	</div>
</template>

<script setup>
import { onMounted } from 'vue'
import PageCurtain from '@/components/PageCurtain.vue'
import LoaderSphere from '@/components/LoaderSphere.vue'
import { useLoader } from '@/composables/useLoader'

/*
 * Orquesta los dos actos y es el único que habla con useLoader. Se renderiza en el
 * SSR con la fase inicial, así el overlay y la esfera se ven antes de que el bundle
 * se parsee: es la diferencia entre un loader real y uno que aparece tarde.
 */
const { phase, curtainOpen, hasSphere, start } = useLoader()

onMounted(start)
</script>
