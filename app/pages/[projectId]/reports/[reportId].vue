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

		<MarkdownRenderer class="report-body" :source="doc.summary" />

		<section v-if="doc.walkthrough.length" class="section">
			<h2>Walkthrough</h2>
			<ReportWalkthrough :steps="doc.walkthrough" :project-id="projectId" />
		</section>

		<section v-if="doc.findings.length" class="section">
			<h2>Findings</h2>
			<ReportFindings :findings="doc.findings" :project-id="projectId" />
		</section>

		<MarkdownRenderer class="report-body" :source="doc.rest" />
	</template>
	<template v-else>
		<p>Report not found. <NuxtLink :to="`/${projectId}/reports`">All reviews</NuxtLink></p>
	</template>
  </div>
</template>

<script setup>
import { parse as parseYaml } from 'yaml'
import { useSiteStore } from '~/stores/site.js'

const route = useRoute()
const store = useSiteStore()

const projectId = route.params.projectId
const reportId = route.params.reportId
const report = store.getReport(projectId, reportId)

if (!report) {
	throw createError({ statusCode: 404, statusMessage: 'Report not found', fatal: true })
}

// The report's own source, loaded only for the report being read — the store index
// carries metadata only, so no other page pulls this.
//
// Walkthrough steps and findings are structured data and live in the frontmatter;
// the prose sections stay markdown. The body is split so the Summary renders above
// the walkthrough and findings, and the remaining sections below them.
const { data: doc } = await useAsyncData(`report-${reportId}`, async () => {
	const mod = await import(`#reports/${reportId}.md?raw`)
	const match = mod.default.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/)
	const meta = match ? parseYaml(match[1]) : {}
	const body = (match ? match[2] : mod.default).trim()

	// Everything before "## What's working" is the summary; the rest follows the
	// structured sections. Falls back to putting it all first if that heading moves.
	const splitAt = body.search(/^## (What's working|Gaps in this review)/m)

	return {
		summary: splitAt === -1 ? body : body.slice(0, splitAt).trim(),
		rest: splitAt === -1 ? '' : body.slice(splitAt).trim(),
		walkthrough: meta.walkthrough || [],
		findings: meta.findings || []
	}
})

useHead({
  title: report
    ? `${report.walletTitle} ${report.flowName} — ${report.modeLabel} — Bitcoin UI Gallery`
    : 'Report not found'
})
</script>

<style lang="scss" scoped>
.report-page {
	max-width: 48rem;
	margin-left: auto;
	margin-right: auto;
}

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
	
}

.section {
	margin-top: 2.5rem;

	h2 {
		margin-bottom: 1rem;
	}
}
</style>
