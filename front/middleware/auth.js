import { useSquidStore } from '~/store/squid'

export default defineNuxtRouteMiddleware((to, from) => {
  const store = useSquidStore()
  const username = store.username
  const token = store.token
  if (!username || !token) {
    navigateTo({ 'path': '/login' })
  }
})