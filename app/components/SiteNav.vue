<template>
  <div class="site-nav">
	Nav
  </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>

@use '@/assets/css/variables.scss' as variables;
@use '@/assets/css/mixins.scss' as mixins;
@use '@/assets/css/animations.scss' as animations;

.site-nav {
	@include mixins.media-query(medium-down) {
		
	}

	@include mixins.media-query(large) {
		
	}
}

</style>
