<template>
  <div class="flow-list" v-if="flows && flows.length > 0">
	<NuxtLink
		v-for="(flow, index) in flows"
		:key="index"
		:to="`/flow/${flow.projectId}/${flow.name.toLowerCase().replace(/\s+/g, '-')}`"
	>
		~{{ flow.name }}
	</NuxtLink>
  </div>
</template>

<script setup>

const props = defineProps({
	flows: {
		type: Array,
		default: () => []
	}
})

</script>

<style lang="scss" scoped>

@use '@/assets/css/variables.scss' as variables;
@use '@/assets/css/mixins.scss' as mixins;
@use '@/assets/css/animations.scss' as animations;

.flow-list {
	display: flex;
	flex-wrap: wrap;
	gap: 8px;

	a {
		color: var(--back);
		padding: 4px 10px;
		border-radius: 5px;
		font-size: 12px;
		text-decoration: none;
		background-color: rgba(var(--frontRGB), 1);
		// border: 1px solid rgba(var(--backRGB), 0.5);
		transition: all 150ms animations.$ease;

		&:hover {
			background-color: rgba(var(--frontRGB), 0.75);
		}
	}
	
	@include mixins.media-query(medium-down) {
		
	}

	@include mixins.media-query(large) {
		
	}
}

</style>
