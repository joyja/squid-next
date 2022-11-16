<script setup>
import { useSquidStore } from '~/store/squid'
const squidStore = useSquidStore()
const username = ref('')
const password = ref('')
const remember = ref(false)
const login = async () => {
  let url
  if (process.client) {
    url = window.location.hostname
  } else {
    url = 'localhost'
  }
  const { data: { login : { user, token} } } = await $fetch(`http://${url}:4000/`, {
    method: 'POST',
    body: {
      query: `mutation login {
        login (
          username: "${username.value}"
          password: "${password.value}"
        ) { 
          user {
            id
            username
          }
          token
        }
      }`
    }
  })
  squidStore.username = user.username
  squidStore.token = token
  if (remember.value) {
    localStorage.setItem('username', user.username)
    localStorage.setItem('token', token)
  }
  navigateTo({ 'path': '/' })
}
onMounted(() => {
  squidStore.username = localStorage.getItem('username')
  squidStore.token = localStorage.getItem('token')
  navigateTo({ 'path': '/'})
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
      <div class="checkbox">
        <input id="remember" class="checkbox--input" type="checkbox" name="remember" v-model="remember"> 
        <label class="checkbox--label" for="remember">Remember me</label>
      </div>
    </form>
  </div>
</template>

<style type="scss">
.form--wrapper {
  display: flex;
  justify-content: center;
}
.form {
  display: flex;
  flex-direction: column;
  flex-basis: 400px;
  flex-shrink: 1;
  flex-grow: 0;
}
.entry {
  margin-top: var(--spacing-unit);
  display: flex;
  flex-direction: column;
}
.entry--label {
  display: block;
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 500;
  color: var(--gray-700);
}
.entry--input {
  display:block;
  border-radius: 0.375rem;
  border: solid 1px var(--gray-300); 
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
}
.entry--input:focus {
  border-color: var(--ocean-500);
  outline: 2px solid transparent;
  outline-offset: 2px;
}
.checkbox {
  display:flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: calc(2 * var(--spacing-unit))
}
.checkbox--input {
  border: solid 1px var(--gray-300);
  color: var(--ocean-600);
  border-radius: .25rem; 
  height: 1rem;
  width: 1rem;
}
.checkbox--input:focus {
  outline: 2px solid transparent;
  outline-offset: 2px;
  --tw-ring-inset: var(--tw-empty,/*!*/ /*!*/);
  --tw-ring-offset-width: 2px;
  --tw-ring-offset-color: #fff;
  --tw-ring-color: var(--ocean-400);
  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);
  box-shadow: var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow);
  --tw-ring-opacity: 1;
}
.checkbox--label {
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 500;
  color: var(--gray-700);
  margin-left: calc(1 * var(--spacing-unit))
}
</style>
