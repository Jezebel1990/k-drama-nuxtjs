// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss"],
  plugins: ['~/plugins/fontawesome.js'],
  components: true,
  runtimeConfig: {
    public: {
      API_TOKEN: process.env.NUXT_API_TOKEN,
    }
  }
})
