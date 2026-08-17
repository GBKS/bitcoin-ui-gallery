<template>
  <div class="page screen-page">
	<template v-if="screen">
		<ScreenDetails
			:screen="screen"
			:project="project"
		/>

		<p v-if="reports.length" class="screen-reports">
			Referenced in
			<template v-for="(report, i) in reports" :key="report.id">
				<NuxtLink :to="`/${projectId}/reports/${report.id}`">{{ report.modeLabel }}, {{ report.date }}</NuxtLink><span v-if="i < reports.length - 1">, </span>
			</template>
		</p>
	</template>
	<template v-else>
		<p>Screen not found. <NuxtLink :to="`/${projectId}`">Back to {{ project ? project.title : 'the wallet' }}</NuxtLink></p>
	</template>
  </div>
</template>

<script setup>
import { useSiteStore } from '~/stores/site.js'

const route = useRoute()
const store = useSiteStore()

const projectId = route.params.projectId
const screenId = route.params.screenId

// Get screens for specific project
const project = store.getProjectById(projectId)
const screen = store.getScreen(projectId, screenId)
const reports = store.getReportsByScreenId(projectId, screenId)

// Unknown screen ids previously rendered an empty 200 page; make them a real 404.
if (!screen) {
	throw createError({ statusCode: 404, statusMessage: 'Screen not found', fatal: true })
}

</script>

<style lang="scss" scoped>

@use '@/assets/css/variables.scss' as variables;
@use '@/assets/css/mixins.scss' as mixins;
@use '@/assets/css/animations.scss' as animations;

.screen-page {
	display: flex;
	justify-content: center;
	max-width: 800px;
	margin-left: auto;
	margin-right: auto;
	padding-top: 30px;

	@include mixins.media-query(small) {
		
	}

	@include mixins.media-query(medium-up) {
		
	}
}

</style>
