<script setup>
import { storeToRefs } from 'pinia';
import { useSquidStore } from '~/store/squid'
definePageMeta({
  middleware: 'auth'
})
const store = useSquidStore()
await store.getProfiles()
const { info, profiles, operations } = storeToRefs(store); 
let interval
onMounted(() => {
  interval = setInterval(() => {
    store.getProfiles()
    // store.getContainers()
    store.getOperations()
  }, 2500)
  document
    .getElementById('createContainerDialog')
    .addEventListener(
      'click',
      ((event) => {
        let rect = event.target.getBoundingClientRect();
        if (rect.left > event.clientX ||
            rect.right < event.clientX ||
            rect.top > event.clientY ||
            rect.bottom < event.clientY
        ) {
          hideDialog()
        }
      })
    )
})
const containerTypes = [
  {
    name: 'tentacle',
    imageSrc: 'tentacle.png',
    imageLazySrc: 'tentacle_blur.png',
    selected: false,
    class: 'p-2 bg-ocean-700',
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
    class: 'p-2',
  },
  {
    name: 'ignition',
    imageSrc: 'ignition.png',
    imageLazySrc: 'ignition_blur.png',
    selected: false,
    class: 'p-2 bg-ocean-700',
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
    class: 'p-2',
  },
  {
    name: 'codesys',
    imageSrc: 'codesys.png',
    imageLazySrc: 'codesys_blur.png',
    selected: false,
    class: 'p-2',
  },
]
const containerName = ref('')
const profileName = ref('')
const showDialog = (selected) => {
  const element = document.getElementById('createContainerDialog');
  if (typeof element.showModal === "function") {
    profileName.value = selected
    element.showModal();
    element.classList.add('modal--show')
    element.classList.remove('modal--hide')
  }
}
const hideDialog = () => {
  const element = document.getElementById('createContainerDialog');
    element.classList.add('modal--hide')
    element.classList.remove('modal--show')
    setTimeout(() => {
      element.close();
    },300)
}
const createContainer = async () => {
  await store.fetch(`mutation createContainer {
        createContainer (
          containerName: "${containerName.value}"
          profile: "${profileName.value}"
        ) { 
          name
          status
          network {
            name
            addresses {
              family
              address
              netmask
              scope
            }
            bytes_received
            bytes_sent
            packets_received
            packets_sent
            macAddress
            host_name
            mtu
            state
            type
          }
          profiles {
            name
          }
          status_code
          architecture
          ephemeral
          stateful
          description
          created_at
          last_used_at
          location
          type
          cloudInitComplete
          application
        }
      }`
  )
}
</script>

<template>
<div>
  <div class="cards">
    <div @click="showDialog(containerType.name)" :class="`card ${containerType.class}`" v-for="containerType in containerTypes">
      <nuxt-img class="rounded" :src="containerType.imageSrc" loading="lazy" :placeholder="containerType.imageLazySrc"/>
    </div>
  </div>
  <div class="operations">
    <div v-for="operation in operations">{{ operation.metadata }}</div>
  </div>
  <dialog id="createContainerDialog" class="modal modal--hide">
    <form class="form" @submit.prevent="createContainer">
      <div class="entry">
        <label class="entry--label" for="containerName">Container Name</label>
        <input class="entry--input" type="text" placeholder="e.g.   My Container" name="containerName" v-model="containerName" required>
      </div>
      <button class="mt-2 button--primary" type="submit">Create Container</button>
    </form>
  </dialog>
</div>
</template>

<style lang="scss">
@import '~/assets/css/boxShadow.scss';
.operations {
  display: flex;
  flex-direction: column;
}
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  grid-gap: 20px;
}
.card {
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  border: solid 1px var(--ocean-300);
  border-radius: var(--spacing-unit);
  aspect-ratio: 1;
  @extend .shadow-md;
  transition: all .3s ease-out;
  cursor: pointer;
}
.card:hover {
  transform: scale(1.1) rotate(-1deg);
}
.rounded {
  border-radius: var(--spacing-unit);
}
.modal {
  position: absolute;
  left: 0px;
  right: 0px;
  margin: auto;
  transition: opacity .3s ease-out;
  padding: calc(3 * var(--spacing-unit));
  border-radius: var(--spacing-unit);
  border: none;
  @extend .shadow-xl;
}
.modal--show {
  opacity: 1;
}
.modal--hide {
  opacity: 0;
}
.modal::backdrop {
  transition: opacity .3s ease-out;
  background-color: rgba(var(--gray-500--rgb), 0.5);
  backdrop-filter: blur(3px);
}
.modal--show::backdrop {
  opacity: 1;
}
.modal--hide::backdrop {
  opacity: 0;
}
</style>


