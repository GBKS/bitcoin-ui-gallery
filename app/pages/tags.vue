<template>
  <div class="page tags-page">
    <div class="info">
      <h1>{{ $t('general.all_tags') }}</h1>
    </div>
    
    <ol class="tags">
      <li
        v-for="(item, index) in tags"
        :key="index"
      >
        <Tag :tag="item.name" />
        <p>{{ $t('general.screens', item.screenCount ) }}, {{ $t('general.projects', item.projectCount ) }}</p>
      </li>
    </ol>
  </div>
</template>

<script setup>
import { useSiteStore } from '~/stores/site.js'

const store = useSiteStore()
const tags = store.getAllTags

</script>

<style lang="scss" scoped>

@use '@/assets/css/variables.scss' as variables;
@use '@/assets/css/mixins.scss' as mixins;
@use '@/assets/css/animations.scss' as animations;

.tags-page {
	display: flex;
  flex-direction: column;
  align-items: center;
	gap: 30px;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;

  .tags {
    display: flex;
    flex-direction: column;
    gap: 12px;

    li  {
      display: flex;
      align-items: center;
      gap: 12px;

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
