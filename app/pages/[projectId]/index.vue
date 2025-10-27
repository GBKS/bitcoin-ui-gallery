<template>
  <div class="page project-page">
	<template v-if="project">
		<div class="info">
			<h1>
				<img
					v-if="project.logo"
					:src="`/logos/${project.logo}`"
					alt=""
				>{{ project.title }}
			</h1>

			<ProjectDetails :project="project" />

			<FlowList 
				:v-if="flows.length > 0"
				:flows="flows"
			/>
		</div>

		<ScreenGrid
			:screens="screens"
		/>
	</template>
	<template v-else>
		<p>Project not found.</p>
	</template>
  </div>
</template>

<script setup>
import { useSiteStore } from '~/stores/site.js'

const route = useRoute()
const store = useSiteStore()

const projectId = route.params.projectId

const project = store.getProjectById(projectId)
const screens = store.getScreensByProjectId(projectId)
const flows = store.getFlowsByProjectId(projectId)

</script>

<style lang="scss" scoped>

@use '@/assets/css/variables.scss' as variables;
@use '@/assets/css/mixins.scss' as mixins;
@use '@/assets/css/animations.scss' as animations;

.project-page {
	display: flex;
	flex-direction: column;
	gap: 40px;

	.info {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 15px;
		
		h1 {
			font-size: 48px;
			text-align: center;
			display: flex;
			align-items: center;
			gap: 20px;

			img {
				width: 50px;
				height: auto;
				border-radius: 5px;
				border: 1px solid rgba(var(--frontRGB), 0.1);
				box-shadow: 0 3px 6px -3px rgba(var(--frontRGB), 0.25);
			}
		}
	}

	@include mixins.media-query(small) {
		
	}

	@include mixins.media-query(medium-up) {
		
	}
}

</style>
