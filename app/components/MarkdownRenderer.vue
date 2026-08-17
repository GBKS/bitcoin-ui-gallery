<template>
	<div class="markdown" v-html="html" />
</template>

<script setup>
import { marked } from 'marked'

const props = defineProps({
	// Raw markdown source, frontmatter included — it gets stripped below.
	source: {
		type: String,
		default: ''
	}
})

marked.setOptions({ gfm: true })

const FRONTMATTER = /^---\r?\n[\s\S]*?\r?\n---\r?\n/

const html = computed(() =>
	props.source ? marked.parse(props.source.replace(FRONTMATTER, '').trim()) : ''
)
</script>

<style lang="scss" scoped>

@use '@/assets/css/variables.scss' as variables;
@use '@/assets/css/mixins.scss' as mixins;
@use '@/assets/css/animations.scss' as animations;

.markdown {
	:deep(h1) { display: none; } // pages render their own title from the frontmatter
	:deep(h2) { margin-top: 2rem; }

	:deep(table) {
		width: 100%;
		border-collapse: collapse;
		margin: 1rem 0;
		display: block;
		overflow-x: auto;
	}

	:deep(th),
	:deep(td) {
		border: 1px solid var(--border-color, rgba(128, 128, 128, 0.3));
		padding: 0.45rem 0.6rem;
		text-align: left;
		vertical-align: top;
	}

	:deep(th) { white-space: nowrap; }

	:deep(p) {
		font-size: 1.1rem;
		line-height: 1.6;
	}

	:deep(blockquote) {
		margin: 1rem 0;
		padding-left: 1rem;
		border-left: 3px solid var(--border-color, rgba(128, 128, 128, 0.4));
	}

	:deep(code) {
		font-size: 0.9em;
	}

	:deep(img) {
		max-width: 100%;
		height: auto;
	}

	:deep(ul) {
		list-style-type: disc;
		padding-left: 1rem;

		li + li {
			margin-top: 0.25rem;
		}
	}

	@include mixins.media-query(huge) {
    	:deep(h2) {
	        font-size: 30px;
			padding-bottom: 1rem;
		}
	}
}
</style>
