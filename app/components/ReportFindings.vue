<template>
	<ol class="findings">
		<li v-for="(finding, index) in resolved" :key="index" class="finding">
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

			<p v-if="finding.screens.length" class="screens">
				<NuxtLink
					v-for="screen in finding.screens"
					:key="screen.id"
					:to="`/${projectId}/${screen.id}`"
					class="screen-link"
				>{{ screen.title }}</NuxtLink>
			</p>
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
			return { id, title: screen?.title || id }
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
	gap: 1.5rem;
}

.finding {
	padding: 1rem 1.1rem;
	border: 1px solid var(--border-color, rgba(128, 128, 128, 0.25));
	border-radius: 0.5rem;
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
	opacity: 0.7;
	font-size: 0.9em;
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

.screens {
	margin: 0.85rem 0 0;
	display: flex;
	flex-wrap: wrap;
	gap: 0.4rem;
}

.screen-link {
	font-size: 0.8em;
	padding: 0.1rem 0.5rem;
	border-radius: 0.75rem;
	border: 1px solid var(--border-color, rgba(128, 128, 128, 0.3));
	opacity: 0.85;
}
</style>
