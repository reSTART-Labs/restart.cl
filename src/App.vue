<template>
	<SiteLoader />
	<Nav />
	<RouterView />
	<Footer />
</template>

<script setup>
import SiteLoader from '@/components/SiteLoader.vue'
import Nav from '@/components/Nav.vue'
import Footer from '@/components/Footer.vue'
</script>
