<template>
  <div class="tag-list" v-if="tags && tags.length > 0">
	<NuxtLink
		v-for="(tag, index) in tags"
		:key="index"
		:to="`/tag/${tag.toLowerCase().replace(/\s+/g, '-')}`"
	>
		#{{ tag }}
	</NuxtLink>
  </div>
</template>

<script setup>

const props = defineProps({
	tags: {
		type: Array,
		default: () => []
	}
})

</script>

<style lang="scss" scoped>

@use '@/assets/css/variables.scss' as variables;
@use '@/assets/css/mixins.scss' as mixins;
@use '@/assets/css/animations.scss' as animations;

.tag-list {
	display: flex;
	flex-wrap: wrap;
	gap: 8px;

	a {
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
	}
	
	@include mixins.media-query(medium-down) {
		
	}

	@include mixins.media-query(large) {
		
	}
}

</style>
