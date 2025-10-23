export default defineNuxtPlugin(async () => {
  const store = useSiteStore()
  
  // Initialize project data on client-side
  await store.initializeProjectData()
})