// 放保存的資料
import { defineStore } from 'pinia'

// 變數名稱建議取use開頭 Store 結尾
export const useSettingsStore = defineStore({
  // 設定欲保存的資料一組ID
  id: 'settings',
  // 這個 store 保存那些資料
  state () {
    return {
      alarms: [
        { id: 1, name: 'Alarm', file: new URL('@/assets/alarm.mp3', import.meta.url).href },
        { id: 2, name: 'Yay', file: new URL('@/assets/yay.mp3', import.meta.url).href }
      ],
      selectedAlarms: 2,
      notify: false
    }
  },
  actions: {
    async toggleNotify () {
      if (!this.notify && 'Notification' in window) {
        // permission 請求到權限的結果
        const permission = await Notification.requestPermission()
        if (permission === 'granted') {
          this.notify = true
        }
      } else {
        this.notify = false
      }
    }
  },
  getters: {
    selectedAlarmFile () {
      const i = this.alarms.findIndex(alarm => alarm.id === this.selectedAlarms)
      return this.alarms[i].file
    }
  },
  // locostorage 的保存設定
  persist: {
    key: 'pomodoro-settings',
    // 要存哪些資料
    paths: ['selectedAlarms', 'notify']
  }
})
