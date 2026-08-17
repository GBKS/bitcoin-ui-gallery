<template>
	<span :class="['severity-pill', severity, { zero: count === 0 }]">
		<template v-if="count !== null">{{ count + " " }} </template>{{ label || severity }}
	</span>
</template>

<script setup>
defineProps({
	severity: {
		type: String,
		required: true,
		validator: (value) => ['high', 'medium', 'low'].includes(value)
	},
	// Set for count pills ("4 medium"); leave null for a bare label pill.
	count: {
		type: Number,
		default: null
	},
	label: {
		type: String,
		default: ''
	}
})
</script>

<style lang="scss" scoped>
.severity-pill {
	display: inline-block;
	padding: 0.1rem 0.5rem;
	border-radius: 0.75rem;
	white-space: nowrap;
	font-size: 0.85em;
	color: white;
	font-weight: 500;
	text-transform: capitalize;

	&.high { background-color: #c0392b; }
	&.medium { background-color: #b8860b; }
	&.low { background-color: #6b7280; }

	&.zero { opacity: 0.4; }
}
</style>
