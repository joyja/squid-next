<script setup>
const { data: info , pending, error, refresh } = await useAsyncData(
  'info',
  async () => {
    const { data } = await $fetch('http://10.251.214.196:4000/', {
      method: 'POST',
      body: {
        query: `query info { info }`
      }
    })
    return data
  })
</script>

<template>
  <div>
    {{ info }}
  </div>
</template>


