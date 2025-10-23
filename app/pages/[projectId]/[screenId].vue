<template>
  <div class="page screen-page">
	<template v-if="screen">
		<ScreenDetails
			:screen="screen"
			:project="project"
		/>
	</template>
  </div>
</template>

<script setup>
import { useSiteStore } from '~/stores/site.js'

const route = useRoute()
const store = useSiteStore()

const projectId = route.params.projectId
const screenId = route.params.screenId

// Get screens for specific project
const project = store.getProjectById(projectId)
const screen = store.getScreen(projectId, screenId)

</script>

<style lang="scss" scoped>

@use '@/assets/css/variables.scss' as variables;
@use '@/assets/css/mixins.scss' as mixins;
@use '@/assets/css/animations.scss' as animations;

.screen-page {
	display: flex;
	justify-content: center;
	max-width: 800px;
	margin-left: auto;
	margin-right: auto;
	padding-top: 30px;

	@include mixins.media-query(small) {
		
	}

	@include mixins.media-query(medium-up) {
		
	}
}

</style>
