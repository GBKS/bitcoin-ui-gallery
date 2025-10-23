<template>
  <div class="page home-page">
	<ProjectList
		:projects="store.projects"
	/>
	<ScreenGrid
		:screens="visibleScreens"
	/>
  </div>
</template>

<script setup>
import { useSiteStore } from '~/stores/site.js'

const store = useSiteStore()

// Wait for data to be initialized if needed
await store.initializeProjectData()

const visibleScreens = computed(() => {
	let result = store.allScreens

	// TODO: Pagination logic here
	console.log('visibleScreens', result)

	return result
})

</script>

<style lang="scss" scoped>

@use '@/assets/css/variables.scss' as variables;
@use '@/assets/css/mixins.scss' as mixins;
@use '@/assets/css/animations.scss' as animations;

.home-page {
	display: flex;
	flex-direction: column;
	gap: 25px;
	
	@include mixins.media-query(medium-down) {
		
	}
}

</style>
