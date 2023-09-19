import { defineStore } from 'pinia'

interface State {
  scriptPin: number,
  userName: string,
}

export const useStore = defineStore({
  id: 'storage',
  state: (): State => ({
    scriptPin: 0,
    userName: "",
  }),
  getters: {
  },
  actions: {
  }
})