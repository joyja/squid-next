<script setup>
import { useSquidStore } from '~/store/squid'
const squidStore = useSquidStore()
const username = ref('')
const password = ref('')
const login = async () => {
  await squidStore.login({ username, password })
}
onMounted(() => {
  if (squidStore.username && squidStore.token){
    navigateTo({ 'path': '/'})
  }
})
</script>

<template>
  <div class="form--wrapper">
    <form class="form" @submit.prevent="login">
      <div class="entry">
        <label class="entry--label" for="username">Username</label>
        <input class="entry--input" type="text" placeholder="Username" name="username" v-model="username" required>
      </div>
      <div class="entry">
        <label class="entry--label" for="password">Password</label>
        <input class="entry--input" type="password" placeholder="Password" name="password" v-model="password" required>
      </div>
      <button class="mt-2 button--primary" type="submit">Login</button>
    </form>
  </div>
</template>
