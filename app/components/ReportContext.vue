<template>
	<dl class="report-context">
		<div v-if="mode" class="entry">
			<dt>{{ mode.name }}</dt>
			<dd>
				{{ mode.summary }}
				<span v-if="mode.excludes" class="excludes">{{ mode.excludes }}</span>
			</dd>
		</div>

		<div v-if="persona" class="entry">
			<dt>{{ persona.name }} — {{ persona.role }}</dt>
			<dd>{{ persona.summary }}</dd>
		</div>
	</dl>
</template>

<script setup>
import meta from '~/data/review-meta.json'

const props = defineProps({
	mode: {
		type: String,
		required: true
	},
	// Persona name from the report frontmatter; absent for modes that don't use one.
	personaName: {
		type: String,
		default: ''
	}
})

const mode = computed(() => meta.modes[props.mode] || null)
const persona = computed(() => (props.personaName ? meta.personas[props.personaName] : null) || null)
</script>

<style lang="scss" scoped>
.report-context {
	margin: 1.25rem 0 0;
	display: flex;
	flex-direction: column;
	gap: 0.75rem;
	max-width: 42rem;
}

.entry {
	dt {
		font-weight: 600;
		margin-bottom: 0.15rem;
	}

	dd {
		margin: 0;
		opacity: 0.85;
	}
}

.excludes {
	opacity: 0.75;
}
</style>
