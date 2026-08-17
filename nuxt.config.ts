import { fileURLToPath } from 'node:url'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@pinia/nuxt', '@nuxtjs/i18n'],
  components: true, // Auto imports

  // Report markdown lives with the skill that writes it, outside app/.
  alias: {
    '#reports': fileURLToPath(new URL('./skills/bitcoin-wallet-design-review/reports', import.meta.url))
  },

  // Serve the repo-root skills/ folder as static files at /skills/*
  nitro: {
    publicAssets: [
      {
        dir: fileURLToPath(new URL('./skills', import.meta.url)),
        baseURL: '/skills'
      }
    ]
  },

	css: [
		'@/assets/css/normalize.scss',
		'@/assets/css/common.scss',
		'@/assets/css/forms.scss',
		'@/assets/css/general.scss'
	],

  // i18n configuration
  i18n: {
    locales: [
      { code: 'en', language: 'en-US', file: 'en_US.json', name: 'English' },
    ],
    lazy: true,
    langDir: 'locales/',
    defaultLocale: 'en',
    strategy: 'prefix_except_default',
    compilation: {
      strictMessage: false
    }
  },

  // App configuration
  app: {
    head: {
      title: 'Bitcoin UI Gallery',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'A collection of screenshots of bitcoin applications.' },
        { name: "twitter:card", content: "product" },
        { name: "twitter:site", content: "@gbks" },
        { name: "twitter:title", content:  "Bitcoin UI Gallery" },
        { name: "twitter:description", content: "A collection of screenshots of bitcoin applications." },
        { name: "twitter:image", content: "https://bitcoin-ui-gallery.netlify.app/android-chrome-512x512.png" },

        { property: "og:title", content: "Bitcoin UI Gallery" },
        { property: "og:description", content:  "A collection of screenshots of bitcoin applications." },
        { property: "og:type", content: "product" },
        { property: "og:image", content: "https://bitcoin-ui-gallery.netlify.app/android-chrome-512x512.png" },

        { name: "robots", content: "index,follow" },
        { name: "viewport", content: "width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" },
        { name: "google", content: "notranslate" },
        { name: "HandheldFriendly", content: "true" },
        
        { name: "mobile-web-app-capable", content: "yes" },
        { name: "mobile-web-app-status-bar-style", content: "black" }
      ],
      link: [
        // canonical + og:url are set per-route in app.vue — a single site-wide
        // canonical would mark every page a duplicate of the home page
        { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32x32.png" },
        { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon-16x16.png" },
        { rel: "icon", href: "/favicon.ico" },
        { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
        { rel: "manifest", href: "/site.webmanifest" }
      ]
    }
  }
})
