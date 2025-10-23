<template>
  <div class="project-list" v-if="projects && projects.length > 0">
	<ProjectName
		v-for="project in projects"
		:key="project.id"
		:project="project"
	/>
  </div>
</template>

<script setup>

const props = defineProps({
	projects: {
		type: Array,
		default: () => []
	}
})

</script>

<style lang="scss" scoped>

@use '@/assets/css/variables.scss' as variables;
@use '@/assets/css/mixins.scss' as mixins;
@use '@/assets/css/animations.scss' as animations;

.project-list {
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
	gap: 10px;

	> a {
		color: var(--front);
		font-weight: 600;
		font-size: 15px;
		padding: 4px 12px 4px 4px;
		border-radius: 10px;
		transition: all 150ms animations.$ease;

		img {
			height: 30px;
			width: auto;
			margin-right: 5px;
			vertical-align: middle;
			border-radius: 5px;
			border: 1px solid rgba(var(--frontRGB), 0.1);
			box-shadow: 0 4px 8px -4px rgba(var(--frontRGB), 0.35);
		}

		&:hover {
			background-color: rgba(var(--frontRGB), 0.05);
		}
	}
	
	@include mixins.media-query(medium-down) {
		
	}

	@include mixins.media-query(large) {
		
	}
}

</style>
