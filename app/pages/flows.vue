<template>
  <div class="page flows-page">
    <div class="info">
      <h1>{{ $t('general.all_flows') }}</h1>
    </div>
    
    <ol class="flows">
      <li
        v-for="(item, index) in sortedFlows"
        :key="index"
      >
        <Flow :flow="{ name: item.name, projectId: item.project.id }" />
        <ProjectName :project="item.project" size="small" />
        <p>{{ $t('general.screens', item.screenCount ) }}</p>
      </li>
    </ol>
  </div>
</template>

<script setup>
import { useSiteStore } from '~/stores/site.js'

const store = useSiteStore()
const flows = store.getAllFlows

// Sort flows alphabetically by project name then flow name
const sortedFlows = computed(() => {
  return [...flows].sort((a, b) => {
    if (a.project.title.toLowerCase() < b.project.title.toLowerCase()) return -1
    if (a.project.title.toLowerCase() > b.project.title.toLowerCase()) return 1
    if (a.name.toLowerCase() < b.name.toLowerCase()) return -1
    if (a.name.toLowerCase() > b.name.toLowerCase()) return 1
    return 0
  })
})  

</script>

<style lang="scss" scoped>

@use '@/assets/css/variables.scss' as variables;
@use '@/assets/css/mixins.scss' as mixins;
@use '@/assets/css/animations.scss' as animations;

.flows-page {
	display: flex;
  flex-direction: column;
  align-items: center;
	gap: 30px;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;

  .flows {
    display: flex;
    flex-direction: column;
    gap: 10px;

    li  {
      display: flex;
      align-items: center;
      gap: 15px;

      p {
        margin: 0;
        font-size: 14px;
        color: var(--front-secondary);
      }
    }
  }
	
	@include mixins.media-query(medium-down) {
		
	}

	@include mixins.media-query(large) {
		
	}
}

</style>
