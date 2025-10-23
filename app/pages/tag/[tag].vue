<template>
  <div class="page tag-page">
    <div class="info">
      <h1>Screens tagged "{{ tag }}"</h1>
      <p>{{ summary }}</p>
    </div>

	<ScreenGrid
		:screens="screens"
	/>
  </div>
</template>

<script setup>
import { useSiteStore } from '~/stores/site.js'

const route = useRoute()
const store = useSiteStore()

const tag = route.params.tag

// Get screens for specific tag
const screens = store.getScreensByTag(tag)

const summary = computed(() => {
  return `Found ${screens.length} screens.`
})

</script>

<style lang="scss" scoped>

@use '@/assets/css/variables.scss' as variables;
@use '@/assets/css/mixins.scss' as mixins;
@use '@/assets/css/animations.scss' as animations;

.tag-page {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 40px;

	.info {
		display: flex;
		flex-direction: column;
		gap: 10px;
		text-align: center;
	}    

	@include mixins.media-query(medium-down) {

	}

	@include mixins.media-query(large) {

	}
}

</style>

