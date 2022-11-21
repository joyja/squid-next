<script setup>
const containerTypes = [
  {
    name: 'tentacle',
    imageSrc: 'tentacle.png',
    imageLazySrc: 'tentacle_blur.png',
    selected: false,
    color: 'blue-grey darken-4',
    class: 'pa-2',
  },
  {
    name: 'node-red',
    imageSrc: 'node-red.png',
    imageLazySrc: 'node-red_blur.png',
    selected: false,
  },
  {
    name: 'grafana',
    imageSrc: 'grafana.png',
    imageLazySrc: 'grafana_blur.png',
    selected: false,
    class: 'pa-2',
  },
  {
    name: 'ignition',
    imageSrc: 'ignition.png',
    imageLazySrc: 'ignition_blur.png',
    color: 'blue-grey darken-2',
    selected: false,
    class: 'pa-2',
  },
  {
    name: 'mosquitto',
    imageSrc: 'mosquitto.png',
    imageLazySrc: 'mosquitto_blur.png',
    selected: false,
    class: 'pl-2 pb-1 pt-1',
  },
  {
    name: 'postgres',
    imageSrc: 'postgres.png',
    imageLazySrc: 'postgres_blur.png',
    selected: false,
    class: 'pa-2',
  },
  {
    name: 'codesys',
    imageSrc: 'codesys.png',
    imageLazySrc: 'codesys_blur.png',
    selected: false,
    class: 'pa-2',
  },
]
</script>

<template>
<div>
  <div v-for="containerType in containerTypes">
    <h3>{{ containerType.name }}</h3>
  </div>
</div>
</template>