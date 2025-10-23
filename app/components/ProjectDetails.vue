<template>
  <div class="project-details" v-if="project">
	<div v-if="project.links" class="links">
		<a
			v-for="(url, label) in project.links" :key="label"
			:href="url"
			target="_blank"
			rel="noopener noreferrer"
		>{{ label }}</a>
	</div>
  </div>
</template>

<script setup>

const props = defineProps({
	project: {
		type: Object,
		required: true
	}
})

</script>

<style lang="scss" scoped>

@use '@/assets/css/variables.scss' as variables;
@use '@/assets/css/mixins.scss' as mixins;
@use '@/assets/css/animations.scss' as animations;

.project-details {
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
	gap: 10px;

	.links {
		display: flex;
		justify-content: center;
		gap: 15px;

		a {
			color: var(--front);
			text-decoration: none;
			font-weight: 600;

			&:hover {
				text-decoration: underline;
			}
		}
	}

	@include mixins.media-query(small) {
		.links {
			flex-wrap: wrap;
			row-gap: 5px;
		}
	}	

	@include mixins.media-query(medium-up) {
		
	}
}

</style>
