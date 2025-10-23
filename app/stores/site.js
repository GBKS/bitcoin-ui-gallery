import { defineStore } from 'pinia'

export const useSiteStore = defineStore('site', {
  state: () => ({
    language: null,
    themetoggled: false,
    _initialized: false,
    _dataInitialized: false,
    projects: [],
    allScreens: [],
    projectsById: {}
  }),

  actions: {
    // Initialize store with data from storage (call this when store is first used)
    initializeStore() {
      if (this._initialized) return;

      // These will be available as auto-imported composables when called from components
      if (typeof storage !== 'undefined') {
        this.language = storage.getLocal('language');
        this.themetoggled = storage.getLocal('themetoggled', false);
      }

      this._initialized = true;
    },

    // Initialize project data (call this once during app startup)
    async initializeProjectData() {
      if (this._dataInitialized) return;

      try {
        // Load the projects list
        const projectsData = await import('~/data/projects.json')
        const projectIds = projectsData.default.projects

        // Load all project data files
        const projectPromises = projectIds.map(async (projectId) => {
          const projectData = await import(`~/data/${projectId}.json`)
          return projectData.default
        })

        const projects = await Promise.all(projectPromises)

        // Store projects data
        this.projects = projects

        // Create projects lookup by ID
        this.projectsById = projects.reduce((acc, project) => {
          acc[project.id] = project
          return acc
        }, {})

        console.log('Loaded projects:', this.projects.map(p => p.id))

        // Process all screens with project context
        const allScreens = []
        projects.forEach(project => {
          project.screens.forEach(screen => {
            allScreens.push({
              ...screen,
              folder: project.folder,
              project: {
                title: project.title,
                id: project.id,
                logo: project.logo || null
              }
            })
          })
        })
        
        this.allScreens = allScreens
        this._dataInitialized = true

        console.log('Project data initialized:', {
          projects: this.projects.length,
          screens: this.allScreens.length
        })

      } catch (error) {
        console.error('Failed to initialize project data:', error)
      }
    },

    updateLanguage(data) {
      // Use storage when available (client-side)
      if (typeof storage !== 'undefined') {
        if (config?.isDev) {
          console.log('store.updateLanguage', data);
        }
        storage?.setLocal('language', data);
      }
      this.language = data;
    }
  },

  getters: {
    // Get project by ID
    getProjectById: (state) => (id) => {
      return state.projectsById[id]
    },

    // Get screens by project ID
    getScreensByProjectId: (state) => (projectId) => {
      return state.allScreens.filter(screen => screen.project.id === projectId)
    },

    // Get flows by project ID
    getFlowsByProjectId: (state) => (projectId) => {
      const project = state.projectsById[projectId]
      if (!project || !project.flows) return []

      // Return flows with additional metadata
      return project.flows.map(flow => {
        // Convert flow name to URL-friendly slug (lowercase, spaces to dashes)
        const flowSlug = flow.name.toLowerCase().replace(/\s+/g, '-')
        return {
          ...flow,
          id: flowSlug,
          projectId: projectId,
          project: {
            title: project.title,
            id: project.id,
            logo: project.logo || null
          }
        }
      })
    },

    // Get screen by project ID and screen file name
    getScreen: (state) => (projectId, fileName) => {
      return state.allScreens.find(screen => 
        screen.project.id === projectId && screen.file.split('.').shift() === fileName
      )
    },

    // Get flow by project ID and flow ID (slug based on flow name)
    getFlowById: (state) => (projectId, flowId) => {
      const project = state.projectsById[projectId]
      if (!project || !project.flows) return null

      // Find flow by matching the flowId slug to the flow name
      const flowIndex = project.flows.findIndex(flow => {
        // Convert flow name to URL-friendly slug (lowercase, spaces to dashes)
        const flowSlug = flow.name.toLowerCase().replace(/\s+/g, '-')
        return flowSlug === flowId
      })

      if (flowIndex === -1) return null

      const flow = project.flows[flowIndex]
      
      // Return the flow with additional metadata
      return {
        ...flow,
        id: flowId, // Use the slug as the ID
        index: flowIndex, // Keep the array index for reference
        projectId: projectId,
        project: {
          title: project.title,
          id: project.id,
          logo: project.logo || null
        }
      }
    },

    // Get screen objects for a specific flow
    getScreensByFlowId: (state) => (projectId, flowId) => {
      const project = state.projectsById[projectId]
      if (!project || !project.flows) return []

      // Find flow by matching the flowId slug to the flow name
      const flow = project.flows.find(flow => {
        // Convert flow name to URL-friendly slug (lowercase, spaces to dashes)
        const flowSlug = flow.name.toLowerCase().replace(/\s+/g, '-')
        return flowSlug === flowId
      })

      if (!flow) return []

      // Map screen file names to full screen objects
      return flow.screens.map(screenFile => {
        return state.allScreens.find(screen => 
          screen.project.id === projectId && screen.file === screenFile
        )
      }).filter(Boolean) // Remove any null/undefined screens
    },

    // Get screens by tag (supports URL-friendly format: lowercase with dashes)
    getScreensByTag: (state) => (tag) => {
      return state.allScreens.filter(screen => {
        if (!screen.tags) return false
        
        // Convert the input tag from URL format (lowercase-with-dashes) to stored format
        const normalizedInputTag = tag.toLowerCase().replace(/-/g, ' ')
        
        // Check if any of the screen's tags match when normalized
        return screen.tags.some(screenTag => 
          screenTag.toLowerCase() === normalizedInputTag
        )
      })
    },

    // Search screens by query (searches titles and tags)
    searchScreens: (state) => (query) => {
      console.log('searchScreens')
      if (!query || query.trim() === '') return []
      
      const searchTerm = query.toLowerCase().trim()
      
      return state.allScreens.filter(screen => {
        // Search in title
        const titleMatch = screen.title.toLowerCase().includes(searchTerm)
        
        // Search in tags
        const tagMatch = screen.tags && screen.tags.some(tag => 
          tag.toLowerCase().includes(searchTerm)
        )

        console.log('Searching screen:', screen.title, { titleMatch, tagMatch })
        
        return titleMatch || tagMatch
      })
    },

    // Search projects by query (searches titles and IDs)
    searchProjects: (state) => (query) => {
      if (!query || query.trim() === '') return []
      
      const searchTerm = query.toLowerCase().trim()
      
      return state.projects.filter(project => {
        // Search in title
        const titleMatch = project.title.toLowerCase().includes(searchTerm)

        // Search in ID
        const idMatch = project.id.toLowerCase().includes(searchTerm)
        
        return titleMatch || idMatch
      })
    },

    // Search and get unique tags by query
    searchTags: (state) => (query) => {
      if (!query || query.trim() === '') return []
      
      const searchTerm = query.toLowerCase().trim()
      
      // Get all tags from all screens
      const allTags = new Set()
      state.allScreens.forEach(screen => {
        if (screen.tags) {
          screen.tags.forEach(tag => {
            if (tag.toLowerCase().includes(searchTerm)) {
              allTags.add(tag)
            }
          })
        }
      })
      
      // Return sorted array of unique tags
      return Array.from(allTags).sort()
    },

    // Search and get flows by query
    searchFlows: (state) => (query) => {
      if (!query || query.trim() === '') return []
      
      const searchTerm = query.toLowerCase().trim()
      
      // Get all flows from all projects
      const matchingFlows = []
      state.projects.forEach(project => {
        if (project.flows) {
          project.flows.forEach(flow => {
            if (flow.name.toLowerCase().includes(searchTerm)) {
              // Convert flow name to URL-friendly slug (lowercase, spaces to dashes)
              const flowSlug = flow.name.toLowerCase().replace(/\s+/g, '-')
              matchingFlows.push({
                ...flow,
                id: flowSlug,
                projectId: project.id,
                project: {
                  title: project.title,
                  id: project.id,
                  logo: project.logo || null
                }
              })
            }
          })
        }
      })
      
      // Return sorted array by flow name
      return matchingFlows.sort((a, b) => a.name.localeCompare(b.name))
    }
  }
});
