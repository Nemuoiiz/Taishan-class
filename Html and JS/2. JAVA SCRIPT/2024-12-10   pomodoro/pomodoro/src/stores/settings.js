import { defineStore } from 'pinia'

export const useSettingsStore = defineStore('settings', {
  state: () => ({
    alarms: [
      { id: 1, name: '鬧鐘', file: new URL('@/assets/alarm.mp3', import.meta.url).href },
      { id: 2, name: 'yay', file: new URL('@/assets/yay.mp3', import.meta.url).href },
    ],
    selected: 1,
  }),
  getters: {
    // 確定選擇的數字和鈴聲的 id 符合
    selectedFile() {
      const i = this.alarms.findIndex((alarm) => alarm.id === this.selected)
      return this.alarms[i].file
    },
  },
  persist: {
    // 自訂存進 localstorage 時的 key
    key: 'pomodoro-setting',
    // 只需要保存 selected
    pick:['selected']
  }
})
