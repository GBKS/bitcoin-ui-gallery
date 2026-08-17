<script setup>
// Canonical and og:url have to be absolute and per-route. Keeping them here
// rather than in nuxt.config means each page points at itself instead of every
// page claiming to be a duplicate of the home page.
const siteUrl = 'https://bitcoin-ui-gallery.netlify.app'
const route = useRoute()
const canonical = computed(() => siteUrl + (route.path === '/' ? '' : route.path))

useHead({
  link: [{ rel: 'canonical', href: canonical }],
  meta: [{ property: 'og:url', content: canonical }]
})
</script>

<template>
  <div id="container">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
