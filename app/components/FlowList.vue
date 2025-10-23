<template>
  <div class="flow-list" v-if="flows && flows.length > 0">
	<Flow
		v-for="(flow, index) in flows"
		:key="index"
		:flow="flow"
	/>
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
	
	@include mixins.media-query(medium-down) {
		
	}

	@include mixins.media-query(large) {
		
	}
}

</style>
