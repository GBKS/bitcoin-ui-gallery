<template>
  <div class="screen-grid-item">
	<div class="screen">
		<NuxtLink
			:to="screenLink"
		>
			<img
				:src="`/screens/${info.folder}/${info.file}`"
				:alt="info.title"
				@click="select"
			/>
		</NuxtLink>

		<div v-if="info.tags" class="tags">
			<TagList :tags="info.tags" />
		</div>
	</div>
	<div class="info">
		<ProjectName
			:project="info.project"
			size="small"
		/>
		<p class="-title">{{ info.title }}</p>
	</div>
  </div>
</template>

<script setup>

const props = defineProps({
	info: {
		type: Object,
		required: true
	}
})

const emit = defineEmits(['select']);

const screenLink = computed(() => {
	// Replace png and jpg extensions
	const file = props.info.file.replace('.png', '').replace('.jpg', '');
	return `/${props.info.project.id}/${file}`;
});

function select(event) {
	// event.preventDefault();
	// event.stopPropagation();
	// emit('select', props.info);
}

</script>

<style lang="scss" scoped>

@use '@/assets/css/variables.scss' as variables;
@use '@/assets/css/mixins.scss' as mixins;
@use '@/assets/css/animations.scss' as animations;

.screen-grid-item {
	flex-basis: 250px;
	display: flex;
	flex-direction: column;
	gap: 15px;

	.screen {
		position: relative;

		> a {
			display: block;
			line-height: 0;

			img {
				width: 100%;
				height: auto;
				border-radius: 15px;
				border: 1px solid rgba(var(--frontRGB), 0.1);
				box-shadow: 0 8px 24px -8px rgba(var(--frontRGB), 0.15);
			}
		}

		.tags {
			position: absolute;
			bottom: 20px;
			left: 20px;
			display: flex;
			flex-wrap: wrap;
			gap: 8px;
			opacity: 0;
			transition: opacity 150ms animations.$ease;
		}

		&:hover {
			.tags {
				opacity: 1;
			}
		}
	}

	.info {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 10px;

		p {
			color: var(--front);
		}
	}

	@include mixins.media-query(medium-down) {
		
	}

	@include mixins.media-query(large) {
		
	}
}

</style>
