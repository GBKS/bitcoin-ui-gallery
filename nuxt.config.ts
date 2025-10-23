// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@pinia/nuxt', '@nuxtjs/i18n'],
  components: true, // Auto imports

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
        { name: "twitter:image", content: "https://www.bitcoin-ui-gallery.com/preview.jpg" },

        { property: "og:title", content: "Bitcoin UI Gallery" },
        { property: "og:description", content:  "A collection of screenshots of bitcoin applications." },
        { property: "og:type", content: "product" },
        { property: "og:image", content: "https://www.bitcoin-ui-gallery.com/preview.jpg" },
        { property: "og:url", content: "https://www.bitcoin-ui-gallery.com" },

        { name: "robots", content: "index,follow" },
        { name: "viewport", content: "width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" },
        { name: "google", content: "notranslate" },
        { name: "HandheldFriendly", content: "true" },
        
        { name: "mobile-web-app-capable", content: "yes" },
        { name: "mobile-web-app-status-bar-style", content: "black" }
      ],
      link: [
        { rel: "canonical", href: "https://www.bitcoin-ui-gallery.com" },
        { rel: "icon", type: "image/png", sizes: "32x32", href: "https://www.bitcoin-ui-gallery.com/bitcoin-logo-32.png" },
        { rel: "icon", type: "image/png", sizes: "16x16", href: "https://www.bitcoin-ui-gallery.com/bitcoin-logo-16.png" },
        { rel: "apple-touch-icon", sizes: "180x180", href: "https://www.bitcoin-ui-gallery.com/bitcoin-logo.png" }
      ]
    }
  }
})
