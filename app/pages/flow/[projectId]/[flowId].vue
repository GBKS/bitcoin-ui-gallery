<template>
  <div class="page flow-page">
	<div class="info">
		<ProjectName
			:project="project"
			size="large"
		/>
		<p>User flow</p>
		<h1>{{ flow?.name }}</h1>

		<template v-if="flow.links && flow.links.length > 0">
			<h2>Resources</h2>
			<ul>
				<li
					v-for="(link, index) in flow.links"
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

	<ScreenGrid
		:screens="screens"
	/>
  </div>
</template>

<script setup>
import { useSiteStore } from '~/stores/site.js'

const route = useRoute()
const store = useSiteStore()

const projectId = route.params.projectId
const flowId = route.params.flowId

// Get screens for specific project
const project = store.getProjectById(projectId)
const flow = store.getFlowById(projectId, flowId)
const screens = store.getScreensByFlowId(projectId, flowId)

</script>

<style lang="scss" scoped>

@use '@/assets/css/variables.scss' as variables;
@use '@/assets/css/mixins.scss' as mixins;
@use '@/assets/css/animations.scss' as animations;

.flow-page {
	display: flex;
	flex-direction: column;
	gap: 50px;
	align-items: center;

	.info {
		display: flex;
		flex-direction: column;
		gap: 0px;
		align-items: center;

		p {
			margin-top: 20px;
			font-size: 24px;
			line-height: 1;
		}

		h1 {
			font-size: 48px;
			line-height: 1;
			text-align: center;
			@include mixins.r('font-size', 40, 48);
		}

		h2 {
			margin-top: 20px;
			font-size: 48px;
			line-height: 1;
			text-align: center;
			@include mixins.r('font-size', 17, 19);
		}

		ul {
			margin-top: 5px;
			text-align: center;
		}
	}

	@include mixins.media-query(medium-down) {
		
	}
}

</style>
