import { defineStore } from 'pinia'

export const useUiStore = defineStore({
  id: 'ui',
  state: () => {
    return {
      menuOpen: false
    }
  }
})