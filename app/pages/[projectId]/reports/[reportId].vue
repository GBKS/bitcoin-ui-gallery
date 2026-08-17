<template>
  <div class="page report-page">
	<template v-if="report">
		<nav class="crumbs">
			<NuxtLink :to="`/${report.wallet}`">{{ report.walletTitle }}</NuxtLink>
			&rsaquo;
			<NuxtLink :to="`/${report.wallet}/reports`">Design reviews</NuxtLink>
		</nav>

		<header class="meta">
			<h1>{{ report.walletTitle }} — {{ report.flowName }}</h1>
			<p class="sub">
				<span>{{ report.modeLabel }}</span>
				<span v-if="report.persona">Persona: {{ report.persona }}</span>
				<time :datetime="report.date">{{ report.date }}</time>
				<span>{{ report.status }}</span>
			</p>
			<ReportFindingCounts :findings="report.findings" />

			<p class="disclaimer">
				Generated automatically and not manually verified. Findings quote the screens
				they reference so they can be checked against the originals.
			</p>
		</header>

		<MarkdownRenderer class="report-body" :source="source" />

		<section v-if="screens.length" class="screens">
			<h2>Screens reviewed</h2>
			<ul>
				<li v-for="screen in screens" :key="screen.id">
					<NuxtLink :to="`/${report.wallet}/${screen.id}`">
						<img :src="`/screens/${screen.folder}/${screen.file}`" :alt="screen.title" loading="lazy">
						<span>{{ screen.title }}</span>
					</NuxtLink>
				</li>
			</ul>
		</section>
	</template>
	<template v-else>
		<p>Report not found. <NuxtLink :to="`/${projectId}/reports`">All reviews</NuxtLink></p>
	</template>
  </div>
</template>

<script setup>
import { useSiteStore } from '~/stores/site.js'

const route = useRoute()
const store = useSiteStore()

const projectId = route.params.projectId
const reportId = route.params.reportId
const report = store.getReport(projectId, reportId)

if (!report) {
	throw createError({ statusCode: 404, statusMessage: 'Report not found', fatal: true })
}

// The markdown source itself, loaded only for the report being read. The index in
// the store carries frontmatter only, so no other page pulls a report body.
const { data: source } = await useAsyncData(`report-${reportId}`, async () => {
	const mod = await import(`#reports/${reportId}.md?raw`)
	// Drop the frontmatter here rather than in the renderer: this value is
	// serialised into the hydration payload, and the metadata is already in the
	// store index, so shipping it again would send the header twice.
	return mod.default.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, '').trim()
})

// Resolve the frontmatter's screen ids to full screen objects for the strip below.
const screens = (report?.screens || [])
	.map(id => store.getScreen(projectId, id))
	.filter(Boolean)

useHead({
  title: report
    ? `${report.walletTitle} ${report.flowName} — ${report.modeLabel} — Bitcoin UI Gallery`
    : 'Report not found'
})
</script>

<style lang="scss" scoped>
.crumbs {
	opacity: 0.7;
	margin-bottom: 1rem;
}

.meta {
	margin-bottom: 2rem;

	.sub {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem 1.25rem;
		opacity: 0.75;
		margin: 0.25rem 0 0.75rem;
	}
}

.disclaimer {
	margin-top: 1rem;
	padding: 0.6rem 0.85rem;
	border-left: 3px solid var(--border-color, rgba(128, 128, 128, 0.4));
	opacity: 0.8;
	max-width: 42rem;
	font-size: 0.9em;
}

.report-body {
	max-width: 48rem;
}

.screens {
	margin-top: 2.5rem;

	ul {
		list-style: none;
		padding: 0;
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
	}

	li {
		width: 8rem;
	}

	img {
		width: 100%;
		height: auto;
		border-radius: 0.4rem;
		border: 1px solid var(--border-color, rgba(128, 128, 128, 0.25));
	}

	span {
		display: block;
		font-size: 0.8em;
		opacity: 0.75;
		margin-top: 0.35rem;
	}
}
</style>
