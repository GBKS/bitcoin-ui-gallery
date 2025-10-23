<template>
	<NuxtLink
		class="flow"
		:to="`/flow/${flow.projectId}/${flow.name.toLowerCase().replace(/\s+/g, '-')}`"
	>
		~{{ flow.name }}
	</NuxtLink>
</template>

<script setup>

const props = defineProps({
	flow: {
		type: Object,
		required: true
	}
})

</script>

<style lang="scss" scoped>

@use '@/assets/css/variables.scss' as variables;
@use '@/assets/css/mixins.scss' as mixins;
@use '@/assets/css/animations.scss' as animations;

.flow {
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
	
	@include mixins.media-query(medium-down) {
		
	}

	@include mixins.media-query(large) {
		
	}
}

</style>
