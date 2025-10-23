<template>
  <div class="screen-grid" v-if="screens && screens.length > 0">
	<ScreenGridItem
		v-for="(item, index) in screens"
		:key="index"
		:info="item"
		@click="selectScreen(item)"
	/>
	<ScreenDetailsOverlay
		v-if="false && selectedScreen"
		:screen="selectedScreen"
		:project="selectedProject"
		@close="closeOverlay"
	/>
  </div>
</template>

<script setup>

const props = defineProps({
	screens: {
		type: Array,
		required: true
	}
})

const selectedScreen = ref(null);
const selectedProject = ref(null);

function selectScreen(info) {
	selectedScreen.value = info;
	selectedProject.value = info.project;
}

function closeOverlay() {
	selectedScreen.value = null;
	selectedProject.value = null;
}

</script>

<style lang="scss" scoped>

@use '@/assets/css/variables.scss' as variables;
@use '@/assets/css/mixins.scss' as mixins;
@use '@/assets/css/animations.scss' as animations;

.screen-grid {
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	gap: 40px;
	
	@include mixins.media-query(medium-down) {
		
	}

	@include mixins.media-query(large) {
		
	}
}

</style>
