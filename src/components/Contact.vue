<template>
	<section id="contact" class="bg-contact-bg pt-0">
		<div class="relative -top-12 bg-white mx-4 md:mx-12 p-6 md:p-10 lg:p-14 shadow-[0_15px_60px_rgba(0,0,0,0.3)] max-md:top-0 max-md:mb-10">
			<div class="text-center mb-10">
				<h3 class="text-2xl md:text-3xl font-light uppercase tracking-wide text-dark mt-0">
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
					<form @submit.prevent="handleSubmit" class="space-y-5">
						<div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
							<div>
								<label for="contact-name" class="contact-label">Nombre</label>
								<input
									id="contact-name"
									v-model="form.name"
									type="text"
									required
									placeholder="Tu nombre"
									class="contact-input"
								>
							</div>
							<div>
								<label for="contact-company" class="contact-label">Empresa</label>
								<input
									id="contact-company"
									v-model="form.company"
									type="text"
									placeholder="Tu empresa (opcional)"
									class="contact-input"
								>
							</div>
						</div>
						<div>
							<label for="contact-email" class="contact-label">Email</label>
							<input
								id="contact-email"
								v-model="form.email"
								type="email"
								required
								placeholder="correo@empresa.cl"
								class="contact-input"
							>
						</div>
						<div>
							<label for="contact-service" class="contact-label">Servicio de inter&eacute;s</label>
							<select
								id="contact-service"
								v-model="form.service"
								class="contact-input"
							>
								<option value="">Selecciona un servicio</option>
								<option v-for="s in services" :key="s.slug" :value="s.slug">{{ s.title }}</option>
							</select>
						</div>
						<div>
							<label for="contact-message" class="contact-label">Mensaje</label>
							<textarea
								id="contact-message"
								v-model="form.message"
								required
								rows="4"
								placeholder="Cu&eacute;ntanos sobre tu proyecto..."
								class="contact-input resize-none"
							></textarea>
						</div>
						<button
							type="submit"
							class="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-primary text-white font-bold text-sm uppercase tracking-wide px-8 py-4 rounded-full no-underline transition-all duration-200 hover:bg-primary-dark cursor-pointer"
							:disabled="submitted"
						>
							<template v-if="!submitted">
								Enviar mensaje
								<i class="fa fa-paper-plane text-xs"></i>
							</template>
							<template v-else>
								<i class="fa fa-check"></i>
								Mensaje enviado
							</template>
						</button>
					</form>
				</div>

				<!-- Calendar side -->
				<div class="contact-cal-side">
					<h4 class="text-sm font-bold uppercase tracking-widest text-text-muted mb-6">
						O agenda una reuni&oacute;n
					</h4>
					<div ref="calContainer" class="min-h-[400px]"></div>
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
import { services } from '@/data/services.js'

const calContainer = ref(null)
const submitted = ref(false)

const form = ref({
	name: '',
	company: '',
	email: '',
	service: '',
	message: '',
})

function handleSubmit() {
	submitted.value = true
	setTimeout(() => {
		submitted.value = false
		form.value = { name: '', company: '', email: '', service: '', message: '' }
	}, 3000)
}

useCalEmbed(calContainer, {
	calLink: 'restart/asesoria-gratuita',
	layout: 'month_view',
	brandColor: '#000000',
})
</script>

<style scoped>
.contact-label {
	display: block;
	font-size: 12px;
	font-weight: 600;
	text-transform: uppercase;
	letter-spacing: 0.05em;
	color: var(--color-text-muted);
	margin-bottom: 8px;
}

.contact-input {
	width: 100%;
	padding: 14px 16px;
	font-size: 14px;
	color: var(--color-dark);
	background: var(--color-features-bg);
	border: 1px solid var(--color-border);
	border-radius: 12px;
	outline: none;
	transition: border-color 0.2s, box-shadow 0.2s;
	font-family: inherit;
}

.contact-input:focus {
	border-color: var(--color-primary);
	box-shadow: 0 0 0 3px rgba(65, 190, 207, 0.12);
}

.contact-input::placeholder {
	color: var(--color-text-muted);
}

select.contact-input {
	cursor: pointer;
	appearance: none;
	background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23999' d='M6 8L1 3h10z'/%3E%3C/svg%3E");
	background-repeat: no-repeat;
	background-position: right 16px center;
}

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
