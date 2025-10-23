<template>
  <div class="screen-details">
	<div class="image">	
		<img
			:src="`/screens/${screen.folder}/${screen.file}`"
			:alt="screen.title"
		/>
	</div>

	<div class="info">
		<ProjectName
			:project="project"
			size="large"
		/>
		
		<h1>{{ screen.title }}</h1>
		<p v-if="screen.date">Screenshot taken {{ screen.date }}</p>
		<p v-if="screen.os">OS: {{ screen.os }}</p>
		<p v-if="screen.version">Version: {{ screen.version }}</p>

		<template v-if="screen.tags && screen.tags.length > 0">
			<h2><NuxtLink to="/tags">Tags</NuxtLink></h2>
			<TagList :tags="screen.tags" />
		</template>

		<template v-if="flows && flows.length > 0">
			<h2><NuxtLink to="/flows">Flows</NuxtLink></h2>
			<FlowList :flows="flows" />
		</template>

		<template v-if="screen.links && screen.links.length > 0">
			<h2>Links</h2>
			<ul>
				<li
					v-for="(link, index) in screen.links"
					:key="index"
				>
					<a
						:href="link.url"
						target="_blank"
						rel="noopener noreferrer"
					>
						{{ link.label }}
					</a>
				</li>
			</ul>
		</template>
	</div>
  </div>
</template>

<script setup>
import { useSiteStore } from '~/stores/site.js'

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

const store = useSiteStore()

const flows = computed(() => {
	return store.getFlowsByProjectId(props.project.id);
})

</script>

<style lang="scss" scoped>

@use '@/assets/css/variables.scss' as variables;
@use '@/assets/css/mixins.scss' as mixins;
@use '@/assets/css/animations.scss' as animations;

.screen-details {
	display: flex;
	justify-content: center;
	gap: 40px;

	.image {
		width: 100%;
		max-width: 300px;

		img {
			width: 100%;
			height: auto;
			border-radius: 15px;
			border: 1px solid rgba(var(--frontRGB), 0.1);
			box-shadow: 0 8px 24px -8px rgba(var(--frontRGB), 0.15);
		}
	}
	.info {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 5px;

		h1 {
			font-size: 30px;
			line-height: 1.2;
		}

		h2 {
			margin-top: 20px;
			font-size: 15px;
		}
	}

	@include mixins.media-query(small) {
		flex-direction: column;
		align-items: center;

		.info {
			order: 1;
			align-items: center;

			h1 {
				text-align: center;
			}
		}

		.image {
			order: 2;
		}
	}

	@include mixins.media-query(medium-up) {
		
	}
}

</style>
