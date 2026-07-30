<template>
	<section id="contact" class="bg-contact-bg pt-0">
		<div class="contact-card relative -top-12 bg-surface mx-4 md:mx-12 p-6 md:p-10 lg:p-14 max-md:top-0 max-md:mb-10">
			<div class="text-center mb-10" data-reveal>
				<h3 class="text-2xl md:text-3xl font-light uppercase tracking-wide text-text mt-0">
					&iexcl;Tom&eacute;monos un caf&eacute;!
				</h3>
				<p class="text-text-light text-sm mt-3 max-w-lg mx-auto">
					Elige el canal que prefieras: completa el formulario o agenda directamente una reuni&oacute;n en nuestro calendario.
				</p>
				<hr class="w-32 mx-auto my-6 border-t-2 border-border">
			</div>

			<div class="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
				<!-- Contact form -->
				<div class="contact-form-side">
					<h4 class="text-sm font-bold uppercase tracking-widest text-text-muted mb-6">
						Env&iacute;anos un mensaje
					</h4>
					<ContactForm
						source="home"
						:fields="['name', 'company', 'email', 'service', 'message']"
					/>
				</div>

				<!-- Calendar side -->
				<div class="contact-cal-side">
					<h4 class="text-sm font-bold uppercase tracking-widest text-text-muted mb-6">
						O agenda una reuni&oacute;n
					</h4>
					<!-- <div ref="calContainer" class="min-h-[400px]"></div> -->
				</div>
			</div>
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
import ContactForm from '@/components/ContactForm.vue'

const calContainer = ref(null)

useCalEmbed(calContainer, {
	calLink: 'restart/asesoria-gratuita',
	layout: 'month_view',
	brandColor: '#0EA5BD',
})
</script>

<style scoped>
.contact-form-side,
.contact-cal-side {
	min-width: 0;
}

@media (min-width: 1024px) {
	.contact-cal-side {
		border-left: 1px solid var(--color-border);
		padding-left: 3.5rem;
	}
}
</style>
