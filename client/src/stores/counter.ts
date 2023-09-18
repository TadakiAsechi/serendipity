import { defineStore } from 'pinia'

interface State {
  scriptPin: number
}

export const useCounterStore = defineStore({
  id: 'counter',
  state: (): State => ({
    scriptPin: 0
  }),
  getters: {
  },
  actions: {
  }
})