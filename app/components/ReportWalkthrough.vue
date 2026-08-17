<template>
	<ol class="walkthrough">
		<li v-for="(step, index) in resolved" :key="step.screen" class="step">
			<figure v-if="step.image" class="shot">
				<NuxtLink :to="`/${projectId}/${step.screen}`">
					<img
						:src="step.image"
						:alt="step.title"
						loading="lazy"
						decoding="async"
					>
				</NuxtLink>
			</figure>

			<div class="text">
				<h3>
					<span class="index">{{ index + 1 }}</span>
					<NuxtLink :to="`/${projectId}/${step.screen}`">{{ step.title }}</NuxtLink>
				</h3>
				<p>{{ step.text }}</p>
			</div>
		</li>
	</ol>
</template>

<script setup>
import { useSiteStore } from '~/stores/site.js'

const props = defineProps({
	steps: {
		type: Array,
		default: () => []
	},
	projectId: {
		type: String,
		required: true
	}
})

const store = useSiteStore()

// Each step names a screen id; pair it with the screenshot so the narrative sits
// next to what it describes rather than referring to it from a distance.
const resolved = computed(() =>
	props.steps.map((step) => {
		const screen = store.getScreen(props.projectId, step.screen)
		return {
			screen: step.screen,
			text: step.text,
			title: screen?.title || step.screen,
			image: screen ? `/screens/${screen.folder}/${screen.file}` : null
		}
	})
)
</script>

<style lang="scss" scoped>
.walkthrough {
	list-style: none;
	padding: 0;
	margin: 0;
	display: flex;
	flex-direction: column;
	gap: 2.5rem;
}

.step {
	display: flex;
	gap: 1.5rem;
	align-items: flex-start;
}

.shot {
	margin: 0;
	flex: 0 0 9rem;

	img {
		width: 100%;
		height: auto;
		border-radius: 0.5rem;
		border: 1px solid var(--border-color, rgba(128, 128, 128, 0.25));
		display: block;
	}
}

.text {
	flex: 1 1 auto;
	min-width: 0;

	h3 {
		display: flex;
		align-items: baseline;
		gap: 0.5rem;
		margin: 0 0 0.5rem;
		font-size: 1rem;
	}

	p {
		margin: 0;
	}
}

.index {
	flex: 0 0 auto;
	width: 1.5rem;
	height: 1.5rem;
	border-radius: 50%;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	font-size: 0.8rem;
	border: 1px solid var(--border-color, rgba(128, 128, 128, 0.4));
	opacity: 0.7;
}

// On narrow screens the screenshot goes above the text rather than beside it,
// where a 9rem column would leave the prose too cramped to read.
@media (max-width: 34rem) {
	.step {
		flex-direction: column;
		gap: 0.75rem;
	}

	.shot {
		flex: none;
		width: 7rem;
	}
}
</style>
