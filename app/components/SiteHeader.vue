<template>
  <div class="site-header">
	<div class="logo">
		<h2>
			<NuxtLink to="/">Bitcoin UI Gallery</NuxtLink>
		</h2>
		<button
			@click.prevent="toggleTheme"
			v-html="themeIcon"
			:title="themeTitle"
			:aria-selected="store.themeToggled"
		/>
	</div>
	<SearchBox
		:searchInput="searchInput"
	/>
  </div>
</template>

<script setup>
const store = useSiteStore()

const props = defineProps(['searchInput']);

const id = 'site-header';
let themeToggled = store.themetoggled;

const themeIcon = computed(() => {
  return store.themetoggled ? icons.moon : icons.sun;
})

const themeTitle = computed(() => {
  return store.themetoggled ? 'Bask under the moonlight' : 'Let the sunshine in';
})

onBeforeMount(() => {
    events.listen('change-theme', onChangeThemeEvent, id);

    if(store.themetoggled) {
      document.documentElement.classList.add('-theme-dark');
    } else {
      document.documentElement.classList.remove('-theme-dark');
    }
})

onBeforeUnmount(() => {
  events.clearListener(id);
})

function toggleTheme() {
    themeToggled = !themeToggled;

    store.themetoggled = themeToggled;

    if(themeToggled) {
        document.documentElement.classList.add('-theme-dark');
    } else {
        document.documentElement.classList.remove('-theme-dark');
    }
}

function onChangeThemeEvent(data) {
  const active = data.type == 'light';

  if(themeToggled != active) {
    toggleTheme();
  }
}
</script>

<style lang="scss" scoped>

@use '@/assets/css/variables.scss' as variables;
@use '@/assets/css/mixins.scss' as mixins;
@use '@/assets/css/animations.scss' as animations;

.site-header {
	display: flex;
	gap: 20px;
	justify-content: space-between;

	.logo {
		display: flex;
		align-items: center;
		gap: 5px;

		h2 {
			color: var(--front);
			font-weight: 600;
			font-size: 20px;
			margin: 0;

			a {
				color: var(--front);
			}
		}

		button {
			:deep(svg) {
				vertical-align: top;
				width: 16px;
				height: 16px;
				fill: var(--yellow);
				stroke: var(--yellow);
			}
		}
	}
	
	@include mixins.media-query(medium-down) {
		flex-direction: column;
		align-items: center;
		gap: 15px;
		padding: 20px 10px;
	}

	@include mixins.media-query(large) {
		padding: 10px 10px;
	}
}

</style>
