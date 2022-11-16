import { useSquidStore } from '~/store/squid'

export default defineNuxtRouteMiddleware((to, from) => {
  const store = useSquidStore()
  let username
  let token
  if (process.client) {
    username = store.username ? store.username : JSON.parse(localStorage.getItem('username'))
    token = store.token ? store.token : JSON.parse(localStorage.getItem('token'))
  } else {
    username = store.username
    token = store.token
  }
  if (!username || !token) {
    navigateTo({ 'path': '/login' })
  }
})