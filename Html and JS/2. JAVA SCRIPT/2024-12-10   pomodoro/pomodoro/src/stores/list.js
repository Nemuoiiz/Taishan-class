import { defineStore } from "pinia"

const time = parseInt(import.meta.env.VITE_TIME)
const timeBreak = parseInt(import.meta.env.VITE_TIME_BREAK)

export const useListStore = defineStore('list', {
  state: () => ({
    items: [],
    id: 1,
    // 倒數時間、還剩多少時間
    timeleft: time,
    // 是否在休息時間
    break: false,
    // 已完成的陣列
    finishedItems: [],
    // 目前倒數事項
    current:'',
  }),
  actions: {
    addItem(value) {
      this.items.push({
        id: this.id++,
        text: value,
        edit: false,
        model:value,
      })
    },
    // 在 action 裡呼叫其他 action => this.
    // 用 id 去找它是原始陣列的哪個索引
    findIndexById(id) {
      return this.items.findIndex((item) => item.id === id)
    },
    delItem(id) {
      const i = this.findIndexById(id)
      this.items.splice(i,1)
    },
    editItem(id) {
      const i = this.findIndexById(id)
      this.items[i].edit = true
    },
    confirmEditItem(id) {
      const i = this.findIndexById(id)
      this.items[i].text = this.items[i].model
      this.items[i].edit = false
    },
    cancelEditItem(id) {
      const i = this.findIndexById(id)
      this.items[i].model = this.items[i].text
      this.items[i].edit = false
    },
    setCurrentItem() {
      this.current = this.break ? '休息一下' : this.items.shift().text
    },
    countdown() {
      this.timeleft--
    },
    setFinishItem() {
      if (!this.break) {
        this.finishedItems.push({
          id: this.id++,
          text: this.current,
        })
      }
      this.current = ''
      if (this.items.length > 0) {
        this.break = !this.break
      }
      // 重設時間
      this.timeleft = this.break ? timeBreak : time
    },
    delFinishedItem(id) {
      const i = this.finishedItems.findIndex((item) => item.id === id)
      this.finishedItems.splice(i, 1)
    },
  },
  persist: {
    // 自訂存進 localstorage 時的 key
    key: 'pomodoro-list',
  },
})
