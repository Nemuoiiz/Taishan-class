import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
// pinia 有三種可以使用 : state、actions

  // state 代表保存的資料 (對應 data)，一定要寫成 function return
  state: () => {
    return {
      number:0,
    }
  },
  // 修改資料的 function (對應 methods)
  actions: {
    plus() {
      this.number++
    },
    minus() {
      this.number--
    },
  },
  // 取資料的 function (對應 computed)
  getters: {
    square() {
      return Math.pow(this.number,2)
    },
  },
})
