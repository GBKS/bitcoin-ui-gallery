<template>
	<ol class="findings">
		<li v-for="(finding, index) in resolved" :key="index" class="finding">
			<div class="shots" v-if="finding.screens.length">
				<figure v-for="screen in finding.screens" :key="screen.id">
					<NuxtLink :to="`/${projectId}/${screen.id}`">
						<img
							v-if="screen.image"
							:src="screen.image"
							:alt="screen.title"
							loading="lazy"
							decoding="async"
						>
						<figcaption>{{ screen.title }}</figcaption>
					</NuxtLink>
				</figure>
			</div>

			<div class="content">
			<div class="head">
				<span class="number">{{ index + 1 }}</span>
				<SeverityPill :severity="finding.severity" />
				<span class="impact">{{ finding.impact }}</span>
			</div>

			<blockquote class="observed">{{ finding.observed }}</blockquote>

			<p class="body">{{ finding.finding }}</p>

			<p v-if="finding.fix" class="fix">
				<span class="label">Suggested fix</span>
				{{ finding.fix }}
			</p>

			</div>
		</li>
	</ol>
</template>

<script setup>
import { useSiteStore } from '~/stores/site.js'

const props = defineProps({
	findings: {
		type: Array,
		default: () => []
	},
	projectId: {
		type: String,
		required: true
	}
})

const store = useSiteStore()

const resolved = computed(() =>
	props.findings.map((finding) => ({
		...finding,
		screens: (finding.screens || []).map((id) => {
			const screen = store.getScreen(props.projectId, id)
			return {
				id,
				title: screen?.title || id,
				image: screen ? `/screens/${screen.folder}/${screen.file}` : null
			}
		})
	}))
)
</script>

<style lang="scss" scoped>
// A list rather than a table: the old seven-column layout was unreadable on a
// phone, and every field here reads fine stacked.
.findings {
	list-style: none;
	padding: 0;
	margin: 0;
	display: flex;
	flex-direction: column;
	gap: 2rem;
}

.finding {
	display: flex;
	gap: 1.5rem;
	align-items: flex-start;

	+ .finding {
		padding-top: 2rem;
		border-top: 1px solid var(--border-color, rgba(128, 128, 128, 0.3));
	}
}

.head {
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	gap: 0.5rem;
	margin-bottom: 0.75rem;
}

.number {
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

.impact {
	opacity: 1;
	font-weight: 600;
	font-size: 1.1em;
}

.observed {
	margin: 0 0 0.75rem;
	padding: 0.5rem 0.75rem;
	border-left: 3px solid var(--border-color, rgba(128, 128, 128, 0.45));
	font-style: italic;

	// Quoted screen copy can be long and unbreakable; never let it widen the card.
	overflow-wrap: anywhere;
}

.body {
	margin: 0 0 0.75rem;
}

.fix {
	margin: 0;

	.label {
		display: block;
		font-size: 0.75em;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		opacity: 0.6;
		margin-bottom: 0.15rem;
	}
}

.shots {
	flex: 0 0 auto;
	display: flex;
	flex-direction: column;
	gap: 0.75rem;

	// Cap the figure at the same width as the image so a long screen title wraps
	// under it instead of stretching the column wider than the screenshot.
	figure {
		margin: 0;
		max-width: var(--report-shot-width, 10rem);
	}

	img {
		max-width: var(--report-shot-width, 10rem);
		width: 100%;
		height: auto;
		display: block;
		border-radius: 0.5rem;
		border: 1px solid var(--border-color, rgba(128, 128, 128, 0.25));
	}

	figcaption {
		font-size: 0.75em;
		opacity: 0.7;
		margin-top: 0.3rem;
		overflow-wrap: anywhere;
	}
}

.content {
	flex: 1 1 auto;
	min-width: 0;
}

// Below this width a 9rem image column leaves the prose too narrow to read, so
// the screenshots move above it and shrink. Matches the walkthrough's breakpoint.
@media (max-width: 34rem) {
	.finding {
		flex-direction: column;
		gap: 1rem;
	}

	.shots {
		flex: none;
		flex-direction: row;
		flex-wrap: wrap;

		figure {
			max-width: var(--report-shot-width-narrow, 8rem);
		}

		img {
			max-width: var(--report-shot-width-narrow, 8rem);
		}
	}
}
</style>
