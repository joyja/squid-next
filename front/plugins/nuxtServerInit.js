import { useSquidStore } from '~/store/squid'

export default defineNuxtPlugin(async (nuxtApp) => {
  if (process.server) {
    const store = useSquidStore(nuxtApp.$pinia)
    // await store.nuxtServerInit()
  }
})