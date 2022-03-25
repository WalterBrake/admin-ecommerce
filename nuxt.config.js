export default {
  // Global page headers
  head: {
    title: "app-pagos",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },

  // Global CSS
  css: [],

  // Plugins to run before rendering page
  plugins: [
    { src: "@/plugins/vuelidate", ssr: false },
    { src: "~plugins/httpClient", ssr: true },
    { src: '~plugins/persistedstate.js' }
  ],

  // Auto import components
  components: true,

  // Modules for dev and build (recommended)
  buildModules: [],

  // Modules
  modules: [
    // https://go.nuxtjs.dev/buefy
    "nuxt-buefy",
    'cookie-universal-nuxt',
  ],
  // Build Configuration
  build: {},
  env:{
    API_URL: process.env.API_URL
  }
};
