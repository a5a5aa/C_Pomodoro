import { defineStore } from 'pinia'

const time = parseInt(import.meta.env.VITE_TIME)
const timeBreak = parseInt(import.meta.env.VITE_TIME_BREAK)

export const useListStore = defineStore({
  id: 'list',
  state () {
    return {
      // 所有待辦項目
      items: [],
      // 已完成
      finishedItems: [],
      // 目前事項
      currentItem: '',
      id: 1,
      // 是否是休息狀態
      break: false,
      // 目前倒數剩下幾秒
      timeleft: time,
      notify: false
    }
  },
  // 這裡放所有修改 state 的 function (store裡有什麼function都放在裡面)
  actions: {
    addItem (name) {
      this.items.push({
        id: this.id++,
        name,
        edit: false,
        model: name
      })
    },

    editItem (id) {
      const i = this.getItemIndexById(id)
      this.items[i].edit = true
    },
    delItem (id) {
      const i = this.getItemIndexById(id)
      this.items.splice(i, 1)
    },
    confirmEditItem (id) {
      const i = this.getItemIndexById(id)
      this.items[i].name = this.items[i].model
      this.items[i].edit = false
    },
    undoEditItem (id) {
      const i = this.getItemIndexById(id)
      this.items[i].model = this.items[i].name
      this.items[i].edit = false
    },
    getItemIndexById (id) {
      return this.items.findIndex(item => item.id === id)
    },
    start () {
      // this.currentItem = this.items[0].name
      // this.items.splice(0 , 1)
      // 以上兩段可以簡寫成下方 ↓
      this.currentItem = this.break ? '休息一下' : this.items.shift().name
      // shift() 回傳陣列的第一個元素
    },
    countdown () {
      this.timeleft--
    },
    finish () {
      // 如果現在不是休息時間
      if (!this.break) {
        this.finishedItems.push({
          name: this.currentItem,
          id: this.id++
        })
      }
      this.currentItem = ''
      if (this.items.length > 0) {
        this.break = !this.break
      }
      // 結束了重設為休息時間的秒數
      this.timeleft = this.break ? timeBreak : time
    },
    delFinishedItem (id) {
      const i = this.finishedItems.findIndex(item => item.id === id)
      this.finishedItems.splice(i, 1)
    }
  },
  persist: {
    key: 'pomodoro-list'
  }
})
