<template lang="pug">
v-app
  v-app-bar(color="red lighten-1")
    v-app-bar-title 番茄鐘
    v-spacer
    v-btn(icon="mdi-home" variant="text" to="/")
    v-btn(icon="mdi-format-list-bulleted" variant="text" to="/list")
    v-btn(icon="mdi-cog" variant="text" to="/settings")
    v-btn(:icon="notify ? 'mdi-bell' : 'mdi-bell-off'" variant="text" @click="toggleNotify")
  v-main
    v-container
      //- 看路由的設定把該顯示的顯示出來
      router-view(v-slot="{ Component }")
        //- 換頁時保留元件不被銷毀
        //- 設定 inclues 指定要保留的原件 將 HomeView 的狀態保留
        keep-alive(include="HomeView")
          //- component動態元件，將元件以 is 傳入，用 component 傳路徑(也可以是文字)
          component(:is="Component")
</template>

<script setup>
import { useSettingsStore } from '@/stores/settings'
import { storeToRefs } from 'pinia'
const settings = useSettingsStore()
const { notify } = storeToRefs(settings)
const { toggleNotify } = settings
</script>
