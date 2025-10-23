<template>
	<NuxtLink
		class="tag"
		:to="`/tag/${tag.toLowerCase().replace(/\s+/g, '-')}`"
	>
		#{{ tag }}
	</NuxtLink>
</template>

<script setup>

const props = defineProps({
	tag: {
		type: String,
		required: true
	}
})

</script>

<style lang="scss" scoped>

@use '@/assets/css/variables.scss' as variables;
@use '@/assets/css/mixins.scss' as mixins;
@use '@/assets/css/animations.scss' as animations;

.tag {
	color: var(--front);
	padding: 4px 12px;
	border-radius: 50px;
	font-size: 12px;
	text-decoration: none;
	background-color: rgba(var(--backRGB), 1);
	border: 1px solid rgba(var(--frontRGB), 0.15);
	transition: all 150ms animations.$ease;

	&:hover {
		background-color: rgba(var(--backRGB), 0.75);
	}
	
	@include mixins.media-query(medium-down) {
		
	}

	@include mixins.media-query(large) {
		
	}
}

</style>
