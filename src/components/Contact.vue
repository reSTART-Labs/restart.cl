<template>
	<section id="contact" class="bg-contact-bg pt-0">
		<div class="relative -top-12 bg-white mx-4 md:mx-12 p-10 md:px-18 md:py-10 shadow-[0_15px_60px_rgba(0,0,0,0.3)] min-h-[350px] max-md:top-0 max-md:mb-10 max-md:p-6">
			<div class="text-center">
				<h3 class="text-2xl font-light uppercase tracking-wide text-dark mt-0 max-md:text-[23px]">
					&iexcl;Tom&eacute;monos un caf&eacute;!
				</h3>
				<hr class="w-32 mx-auto my-6 border-t-2 border-border">
			</div>

			<div ref="calContainer"></div>
		</div>

		<div class="text-center text-white py-6">
			<a
				href="//twitter.com/restart_cl"
				target="_blank"
				class="social-link inline-block mx-4 text-3xl text-white no-underline"
			>
				<i class="ion-social-twitter"></i>
			</a>
			<a
				href="#"
				class="social-link inline-block mx-4 text-3xl text-white no-underline"
			>
				<i class="ion-social-facebook"></i>
			</a>
		</div>
	</section>
</template>

<script setup>
import { ref } from 'vue'
import { useCalEmbed } from '@/composables/useCalEmbed'

const calContainer = ref(null)

useCalEmbed(calContainer, {
	calLink: 'restart/asesoria-gratuita',
	layout: 'month_view',
	brandColor: '#000000',
})
</script>
