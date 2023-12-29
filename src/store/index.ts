import { defineStore } from 'pinia'
import type { info } from '@/types'
import { getInfo } from '@/api/info'

export const useInfoStore = defineStore('info', {
  state (): info {
    const result: info = {
      id: '0'
    }

    return result
  },
  actions: {
    setId (id: string) {
      this.id = id
    },
    getInfo () {
      console.log('get id')
      getInfo()
        .then((res) => {
          const { data } = res
          console.log(res)
          if (data.id) this.id = data.id
        })
    }
  }
})
