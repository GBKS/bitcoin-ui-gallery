<template>
	<span class="finding-counts">
		<span
			v-for="level in levels"
			:key="level.key"
			:class="['count', level.key, { zero: !findings[level.key] }]"
			:title="`${findings[level.key] || 0} ${level.label} severity`"
		>{{ findings[level.key] || 0 }} {{ level.label }}</span>
	</span>
</template>

<script setup>
defineProps({
	findings: {
		type: Object,
		required: true
	}
})

const levels = [
	{ key: 'high', label: 'high' },
	{ key: 'medium', label: 'medium' },
	{ key: 'low', label: 'low' }
]
</script>

<style lang="scss" scoped>
.finding-counts {
	display: inline-flex;
	gap: 0.4rem;
	font-size: 0.85em;
}

.count {
	padding: 0.1rem 0.45rem;
	border-radius: 0.75rem;
	white-space: nowrap;
	border: 1px solid currentColor;

	&.high { color: #c0392b; }
	&.medium { color: #b8860b; }
	&.low { color: #6b7280; }

	&.zero {
		opacity: 0.4;
	}
}
</style>
