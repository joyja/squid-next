<script setup>
import { useSquidStore } from '~/store/squid'
definePageMeta({
  middleware: 'auth'
})
const { info, profiles } = useSquidStore()
</script>

<template>
  <div>
    {{ info }}
    <ul>
      <li v-for="profile in profiles" :key="profile">{{ profile.name }}</li>
    </ul>
  </div>
</template>


