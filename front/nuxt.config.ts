// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  css: [
    '@/assets/css/main.scss'
  ],
  content: {
    watch: {
      ws: {
        hostname: '10.77.178.237',
        port: 4001
      }
    }
  },
  modules: [
    '@pinia/nuxt',
    '@nuxt/content',
    '@nuxt/image-edge'
  ],
})
