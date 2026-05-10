<template>
	<!-- Success state: replace the form with a confirmation card. -->
	<div v-if="status === 'ok'" class="contact-success" role="status" aria-live="polite">
		<span class="contact-success-icon">
			<i class="fa fa-check"></i>
		</span>
		<h3 class="contact-success-title">{{ successTitle }}</h3>
		<p class="contact-success-body">{{ successBody }}</p>
		<button
			v-if="allowReset"
			type="button"
			class="contact-success-reset"
			@click="reset"
		>
			Enviar otro mensaje
		</button>
	</div>

	<form v-else @submit.prevent="handleSubmit" class="space-y-5" novalidate>
		<!-- Honeypot: bots tend to fill every field; humans never see it. -->
		<div aria-hidden="true" class="hp-field">
			<label :for="`${uid}-website`">Sitio web</label>
			<input
				:id="`${uid}-website`"
				v-model="form.website"
				type="text"
				tabindex="-1"
				autocomplete="off"
			>
		</div>

		<div
			v-if="has('name') || has('company')"
			class="grid grid-cols-1 sm:grid-cols-2 gap-5"
		>
			<div v-if="has('name')">
				<label :for="`${uid}-name`" class="contact-label">Nombre</label>
				<input
					:id="`${uid}-name`"
					v-model="form.name"
					type="text"
					required
					placeholder="Tu nombre"
					class="contact-input"
				>
			</div>
			<div v-if="has('company')">
				<label :for="`${uid}-company`" class="contact-label">Empresa</label>
				<input
					:id="`${uid}-company`"
					v-model="form.company"
					type="text"
					placeholder="Tu empresa"
					class="contact-input"
				>
			</div>
		</div>

		<div
			v-if="has('email') || has('phone')"
			class="grid grid-cols-1 sm:grid-cols-2 gap-5"
		>
			<div v-if="has('email')">
				<label :for="`${uid}-email`" class="contact-label">Email</label>
				<input
					:id="`${uid}-email`"
					v-model="form.email"
					type="email"
					required
					placeholder="correo@empresa.cl"
					class="contact-input"
				>
			</div>
			<div v-if="has('phone')">
				<label :for="`${uid}-phone`" class="contact-label">Tel&eacute;fono</label>
				<input
					:id="`${uid}-phone`"
					v-model="form.phone"
					type="tel"
					placeholder="+56 9 ..."
					class="contact-input"
				>
			</div>
		</div>

		<div v-if="has('service')">
			<label :for="`${uid}-service`" class="contact-label">Servicio de inter&eacute;s</label>
			<select
				:id="`${uid}-service`"
				v-model="form.service"
				class="contact-input"
			>
				<option value="">Selecciona un servicio</option>
				<option v-for="s in services" :key="s.slug" :value="s.slug">{{ s.title }}</option>
			</select>
		</div>

		<div v-if="has('message')">
			<label :for="`${uid}-message`" class="contact-label">{{ messageLabel }}</label>
			<textarea
				:id="`${uid}-message`"
				v-model="form.message"
				required
				:rows="messageRows"
				:placeholder="messagePlaceholder"
				class="contact-input resize-none"
			></textarea>
		</div>

		<div class="flex flex-col items-stretch sm:items-start gap-3">
			<button
				type="submit"
				class="contact-submit"
				:disabled="status === 'sending'"
			>
				<template v-if="status === 'idle' || status === 'error'">
					{{ submitLabel }}
					<i class="fa fa-paper-plane text-xs"></i>
				</template>
				<template v-else-if="status === 'sending'">
					<i class="fa fa-spinner fa-spin"></i>
					Enviando...
				</template>
			</button>
			<p v-if="status === 'error'" class="form-error">{{ errorMessage }}</p>
		</div>
	</form>
</template>

<script setup>
import { ref, useId } from 'vue'
import { services } from '@/data/services.js'
import { pushEvent } from '@/composables/useTracking.js'

const props = defineProps({
	fields: {
		type: Array,
		default: () => ['name', 'company', 'email', 'service', 'message'],
	},
	source: { type: String, default: '' },
	messageLabel: { type: String, default: 'Mensaje' },
	messagePlaceholder: {
		type: String,
		default: 'Cuéntanos sobre tu proyecto...',
	},
	messageRows: { type: Number, default: 4 },
	submitLabel: { type: String, default: 'Enviar mensaje' },
	successTitle: { type: String, default: '¡Mensaje enviado!' },
	successBody: {
		type: String,
		default: 'Gracias por contactarnos. Te responderemos a la brevedad.',
	},
	allowReset: { type: Boolean, default: true },
})

const emit = defineEmits(['submit', 'success', 'error'])

const uid = useId()
const status = ref('idle') // idle | sending | ok | error
const errorMessage = ref('')

const emptyForm = () => ({
	name: '',
	company: '',
	email: '',
	phone: '',
	service: '',
	message: '',
	website: '',
})
const form = ref(emptyForm())

const has = (field) => props.fields.includes(field)

const ERROR_COPY = {
	invalid_name: 'Por favor ingresa tu nombre.',
	invalid_email: 'El email no parece válido.',
	invalid_message: 'Cuéntanos un poco más en el mensaje.',
	rate_limited: 'Demasiados intentos. Espera un minuto e inténtalo de nuevo.',
	upstream_failed: 'No pudimos enviar tu mensaje ahora. Intenta más tarde.',
	forbidden: 'Solicitud no permitida.',
	network: 'Hubo un problema de conexión. Revisa tu red.',
	default: 'Algo salió mal. Intenta nuevamente.',
}

function reset() {
	form.value = emptyForm()
	errorMessage.value = ''
	status.value = 'idle'
}

async function handleSubmit() {
	if (status.value === 'sending') return
	status.value = 'sending'
	errorMessage.value = ''

	const payload = { ...form.value, source: props.source }
	emit('submit', payload)

	try {
		const res = await fetch('/api/contact', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(payload),
		})
		const data = await res.json().catch(() => ({}))

		if (!res.ok || !data.ok) {
			const code = data.error || 'default'
			errorMessage.value = ERROR_COPY[code] || ERROR_COPY.default
			status.value = 'error'
			pushEvent('contact_form_error', { code, source: props.source, service: form.value.service })
			emit('error', { code, message: errorMessage.value })
			return
		}

		status.value = 'ok'
		pushEvent('contact_form_submit', { source: props.source, service: form.value.service })
		emit('success', payload)
	} catch (err) {
		errorMessage.value = ERROR_COPY.network
		status.value = 'error'
		pushEvent('contact_form_error', { code: 'network', source: props.source })
		emit('error', { code: 'network', message: errorMessage.value })
	}
}
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
	color: var(--color-text);
	background: var(--color-features-bg);
	border: 1px solid var(--color-border);
	border-radius: 12px;
	outline: none;
	transition: border-color 0.2s, box-shadow 0.2s;
	font-family: inherit;
}

.contact-input:focus {
	border-color: var(--color-primary);
	box-shadow: 0 0 0 3px color-mix(in oklab, var(--color-primary) 18%, transparent);
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

.contact-submit {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	gap: 10px;
	padding: 14px 28px;
	font-size: 13px;
	font-weight: 700;
	letter-spacing: 0.08em;
	text-transform: uppercase;
	color: #FFFFFF;
	background: var(--color-primary);
	border: 1px solid var(--color-primary);
	border-radius: 999px;
	cursor: pointer;
	transition: background 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
	width: 100%;
}

@media (min-width: 640px) {
	.contact-submit { width: auto; }
}

.contact-submit:hover:not(:disabled) {
	background: var(--color-primary-dark);
	border-color: var(--color-primary-dark);
	transform: translateY(-1px);
}

.contact-submit:disabled {
	opacity: 0.65;
	cursor: not-allowed;
}

.form-error {
	margin: 0;
	font-size: 13px;
	color: var(--color-accent-magenta, #E60A62);
}

.contact-success {
	display: flex;
	flex-direction: column;
	align-items: center;
	text-align: center;
	gap: 14px;
	padding: 40px 24px;
	background: var(--color-features-bg);
	border: 1px solid color-mix(in oklab, var(--color-accent-green, #47AE89) 30%, transparent);
	border-radius: 18px;
	animation: contact-success-in 0.35s ease-out;
}

@keyframes contact-success-in {
	from { opacity: 0; transform: translateY(8px); }
	to   { opacity: 1; transform: translateY(0); }
}

.contact-success-icon {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	width: 56px;
	height: 56px;
	border-radius: 999px;
	background: color-mix(in oklab, var(--color-accent-green, #47AE89) 18%, transparent);
	color: var(--color-accent-green, #47AE89);
	font-size: 22px;
}

.contact-success-title {
	margin: 0;
	font-family: var(--font-display);
	font-size: 22px;
	font-weight: 600;
	letter-spacing: -0.01em;
	color: var(--color-text);
}

.contact-success-body {
	margin: 0;
	max-width: 38ch;
	font-size: 14px;
	line-height: 1.6;
	color: var(--color-text-light);
}

.contact-success-reset {
	margin-top: 4px;
	background: transparent;
	border: 0;
	padding: 8px 12px;
	font-size: 12px;
	font-weight: 700;
	letter-spacing: 0.12em;
	text-transform: uppercase;
	color: var(--color-primary);
	cursor: pointer;
	transition: color 0.2s ease;
}

.contact-success-reset:hover {
	color: var(--color-primary-dark);
}

.hp-field {
	position: absolute;
	left: -9999px;
	width: 1px;
	height: 1px;
	overflow: hidden;
}
</style>
