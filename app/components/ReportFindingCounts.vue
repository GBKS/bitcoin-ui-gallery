<template>
	<span class="finding-counts">
		<SeverityPill
			v-for="level in ['high', 'medium', 'low']"
			:key="level"
			:severity="level"
			:count="findings[level] || 0"
		/>
	</span>
</template>

<script setup>
defineProps({
	findings: {
		type: Object,
		required: true
	}
})
</script>

<style lang="scss" scoped>
.finding-counts {
	display: inline-flex;
	gap: 0.4rem;
}
</style>
