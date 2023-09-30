import { defineStore } from 'pinia'

interface userAnswer {
  pin: number;
  count: number;
  answer: string;
}

interface State {
  scriptPin: number,
  userName: string,
  userAnswer: userAnswer[],
}

export const useStore = defineStore({
  id: 'storage',
  state: (): State => ({
    scriptPin: 0,
    userName: "",
    userAnswer: [],
  }),
  getters: {
  },
  actions: {
  }
})