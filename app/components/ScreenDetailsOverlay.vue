<template>
	<dialog
		class="screen-details-overlay"
		open
		ref="canvas"
	>
		<button
			autofocus
			@click="close"
		>Close</button>
		<ScreenDetails
			:screen="screen"
			:project="project"
		/>
	</dialog>
</template>

<script setup>

const props = defineProps({
	screen: {
		type: Object,
		required: true
	},
	project: {
		type: Object,
		required: true
	}
})

const emit = defineEmits(['close']);

const canvas = ref(null);

function close() {
	canvas.value.close();
	emit('close');
}

</script>

<style lang="scss" scoped>

@use '@/assets/css/variables.scss' as variables;
@use '@/assets/css/mixins.scss' as mixins;
@use '@/assets/css/animations.scss' as animations;

.screen-details-overlay {
	@include mixins.media-query(medium-down) {
		
	}

	@include mixins.media-query(large) {
		
	}
}

</style>
