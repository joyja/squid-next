import { defineStore } from 'pinia'

export const useSquidStore = defineStore({
  id: 'squid',
  state: () => {
    return {
      auth: {
        username: null,
        token: null
      },
      info: 'nothing',
      profiles: []
    }
  },
  actions: {
    async nuxtServerInit() {
      if (process.client) {
        this.username = localStorage.getItem('username')
        this.token = localStorage.getItem('token')
      }
      const route = useRoute()
     
      if (!this.username || !this.password) {
        if (route.path !== '/login') {
          navigateTo({ path: '/login' })
        }
      } else {
        let url
        if (process.client) {
          url = window.location.hostname
        } else {
          url = 'localhost'
        }
        const { data : { info, profiles } } = await $fetch(`http://${url}:4000/`, {
          method: 'POST',
          headers: {
            authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY2ODQwNTk3Nn0.y1RPzrSfut5Jy7bB3GGAuAsNTqMLcU-G_yuV0aEkpiQ"
          },
          body: {
            query: `query info { 
              info 
              profiles 
                { 
                  name 
                }
              }`
          }
        })
        this.info = info
        this.profiles = profiles
      }
    },
    async login({ usernam, password }) {
      let url
      if (process.client) {
        url = window.location.hostname 
      } else {
        url = 'localhost'
      }
      const { data : { user: { username }, token } } = await $fetch(`http://${url}:4000/`, {
        method: 'POST',
        body: {
          query: `mutation login { 
            user {
              id
              username
            } 
            token
          }`
        }
      })
      this.auth.username = username
      this.auth.token = token
    }
  },  
  getters: {},
})