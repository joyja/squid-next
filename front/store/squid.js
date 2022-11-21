import { defineStore } from 'pinia'
import nuxtServerInit from '~~/plugins/nuxtServerInit'

export const useSquidStore = defineStore({
  id: 'squid',
  state: () => {
    return {
      interval: null,
      info: 'nothing',
      profiles: [],
      containers: [],
      operations: []
    }
  },
  actions: {
    setUsername(username) {
      const cookie = useCookie('username')
      cookie.value = username
    },
    setToken(token) {
      const cookie = useCookie('token')
      cookie.value = token 
    },
    fetch(query, noAuth = false) {
      let url
      if (process.client) {
        url = window.location.hostname
      } else {
        url = 'localhost'
      }
      return $fetch(`http://${url}:4000/`, {
        method: 'POST',
        headers: {
          authorization: `Bearer ${this.token}`
        },
        body: { query }
      })
    },
    async getProfiles() {
      const { data : { info, profiles } } = await this.fetch(`query info { 
        info 
        profiles 
          { 
            name 
          }
      }`)
      this.info = info
      this.profiles = profiles
    },
    async getContainers() {
      const { data : { containers } } = await this.fetch(`query containers {
        containers {
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
      }`)
      this.containers = containers
    },
    async getOperations() {
      const { data : { operations } } = await this.fetch(`query operations { 
        operations {
          id
          class
          created_at
          updated_at
          status
          status_code
          may_cancel
          err
          metadata
        }
      }`)
      this.operations = operations
    },
    async login({ username, password }) {
      const { data: { login : { user, token} } } = await this.fetch(
        `mutation login {
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
        }`,
        true
      )
      this.setUsername(user.username)
      this.setToken(token)
      window.location.reload(true)
    },
    async logout() {
      this.setUsername(null)
      this.setToken(null)
      window.location.reload(true)
    }
  },  
  getters: {
    username() {
      const cookie = useCookie('username')
      return cookie.value
    },
    token() {
      const cookie = useCookie('token')
      return cookie.value
    }
  },
})  