<template>
  <div class="page search-page">
    <div class="info">
      <h1>{{ $t('search.results', { query: searchQuery }) }}</h1>
      <p>{{ summary }}</p>
    </div>
    
    <template v-if="projects && projects.length > 0">
      <ProjectList :projects="projects" />
    </template>

    <div class="tags-and-flows" v-if="(tags && tags.length > 0) || (flows && flows.length > 0)">
        <FlowList v-if="tags && tags.length > 0" :flows="flows" />
        <TagList v-if="tags && tags.length > 0" :tags="tags" />
    </div>

    <template v-if="screens && screens.length > 0">
      <ScreenGrid :screens="screens" />
    </template>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { useSiteStore } from '~/stores/site.js'

const props = defineProps({
  query: {
    type: String,
    default: ''
  }
})

const i18n = useI18n();
const route = useRoute()
const store = useSiteStore()
const projects = ref(null)
const tags = ref(null)
const screens = ref(null)
const flows = ref(null)

const searchQuery = ref(route.query.q || '')

function updateSearchResults() {
  searchQuery.value = route.query.q

  projects.value = store.searchProjects(searchQuery.value)
  tags.value = store.searchTags(searchQuery.value)
  screens.value = store.searchScreens(searchQuery.value)
  flows.value = store.searchFlows(searchQuery.value)
}

if(searchQuery.value && searchQuery.value.length > 0) {
  updateSearchResults()
}

// Watch for route changes
watch(route, (value) => {
  searchQuery.value = value.query.q
  if (searchQuery.value && searchQuery.value.length > 0) {
    updateSearchResults()
  }
})

const summary = computed(() => {
  const projectCount = projects.value ? projects.value.length : 0
  const tagCount = tags.value ? tags.value.length : 0
  const screenCount = screens.value ? screens.value.length : 0
  const flowCount = flows.value ? flows.value.length : 0

  return i18n.t('search.found') + " " + i18n.t('general.screens', screenCount) + ", " + i18n.t('general.projects', projectCount) + ", " + i18n.t('general.tags', tagCount) + ", " + i18n.t('general.flows', flowCount) + "."

  // return i18n.t('search.found') + ` ${projectCount} projects, ${tagCount} tags, and ${screenCount} screens.`
})

</script>

<style lang="scss" scoped>

@use '@/assets/css/variables.scss' as variables;
@use '@/assets/css/mixins.scss' as mixins;
@use '@/assets/css/animations.scss' as animations;

.search-page {
	display: flex;
  flex-direction: column;
  align-items: center;
	gap: 30px;

	.info {
		display: flex;
		flex-direction: column;
		gap: 10px;
    text-align: center;
  }   

  .tags-and-flows {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }
	
	@include mixins.media-query(medium-down) {
		
	}

	@include mixins.media-query(large) {
		
	}
}

</style>
