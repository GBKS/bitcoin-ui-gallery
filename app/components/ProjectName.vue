<template>
	<NuxtLink :class="classObject" :to="`/${project.id}`">
		<img
			v-if="project.logo"
			:src="`/logos/${project.logo}`"
			alt=""
		>
		{{ project.title }}
	</NuxtLink>
</template>

<script setup>

const props = defineProps({
	project: {
		type: Object,
		required: true
	},
	size: {
		type: String,
		default: 'normal' // options: small, normal, large
	}
})

const classObject = computed(() => {
	return [
		'project-name',
		'-' + props.size
	]
})

</script>

<style lang="scss" scoped>

@use '@/assets/css/variables.scss' as variables;
@use '@/assets/css/mixins.scss' as mixins;
@use '@/assets/css/animations.scss' as animations;

.project-name {
	color: var(--front);
	transition: all 150ms animations.$ease;
	display: flex;
	align-items: center;

	img {
		width: auto;
		border-radius: 5px;
		border: 1px solid rgba(var(--frontRGB), 0.1);
		box-shadow: 0 3px 6px -3px rgba(var(--frontRGB), 0.25);
	}

	&.-small {
		font-size: 14px;
		margin-left: -4px;
		padding: 4px 8px 4px 4px;
		border-radius: 6px;
		gap: 7px;

		img {
			height: 24px;
		}
	}

	&.-normal {
		font-size: 16px;
		margin-left: -4px;
		padding: 4px 8px 4px 4px;
		border-radius: 6px;
		gap: 9px;

		img {
			height: 30px;
		}
	}

	&.-large {
		font-size: 21px;
		font-weight: 600;
		margin-left: -6px;
		padding: 6px 12px 6px 6px;
		border-radius: 10px;
		gap: 11px;

		img {
			height: 40px;
		}
	}

	&:hover {
		background-color: rgba(var(--frontRGB), 0.15);
	}
	
	@include mixins.media-query(medium-down) {
		
	}

	@include mixins.media-query(large) {
		
	}
}

</style>
