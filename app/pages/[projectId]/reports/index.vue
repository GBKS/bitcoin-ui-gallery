<template>
  <div class="page reports-page">
	<template v-if="project">
		<h1>
			<NuxtLink :to="`/${project.id}`">{{ project.title }}</NuxtLink>
			&rsaquo; Design reviews
		</h1>

		<p class="intro">
			Automated design reviews of {{ project.title }}'s flows, generated against the
			<a href="https://bitcoin.design/guide/" rel="noopener">Bitcoin Design Guide</a>.
			Findings are anchored to specific screens and quote what is on them.
		</p>

		<ul v-if="reports.length" class="report-list">
			<li v-for="report in reports" :key="report.id">
				<NuxtLink :to="`/${project.id}/reports/${report.id}`">
					<span class="flow">{{ report.flowName }}</span>
					<span class="mode">{{ report.modeLabel }}</span>
				</NuxtLink>
				<ReportFindingCounts :findings="report.findings" />
				<time :datetime="report.date">{{ report.date }}</time>
			</li>
		</ul>
		<p v-else class="empty">No reviews of {{ project.title }} yet.</p>
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
const reports = store.getReportsByProjectId(projectId)

useHead({
  title: project ? `${project.title} design reviews — Bitcoin UI Gallery` : 'Design reviews'
})
</script>

<style lang="scss" scoped>
.report-list {
	list-style: none;
	padding: 0;
	margin: 1.5rem 0 0;

	li {
		display: flex;
		align-items: baseline;
		flex-wrap: wrap;
		gap: 0.5rem 1rem;
		padding: 0.75rem 0;
		border-bottom: 1px solid var(--border-color, rgba(128, 128, 128, 0.25));
	}

	.flow {
		font-weight: 600;
		margin-right: 0.5rem;
	}

	.mode {
		opacity: 0.7;
	}

	time {
		margin-left: auto;
		opacity: 0.6;
		font-variant-numeric: tabular-nums;
	}
}

.intro {
	max-width: 40rem;
}

.empty {
	opacity: 0.7;
}
</style>
