<template lang="pug">
v-app
  v-app-bar(color="rgba(0,0,0,.1)")
    v-app-bar-title#pomo-title.text-white P O M O D O R O
    v-spacer
    v-btn.text-white(icon="mdi-home" variant="text" to="/")
    v-btn.text-white(icon="mdi-format-list-bulleted" variant="text" to="/list")
    v-btn.text-white(icon="mdi-cog" variant="text" to="/settings")
    v-btn.text-white(:icon="notify ? 'mdi-bell' : 'mdi-bell-off'" variant="text" @click="toggleNotify")
  v-main
    v-container
      router-view(v-slot="{ Component }")
        //- 換頁保留元件不被銷毀
        //- 設定 include 指定要保留的元件
        keep-alive(include="HomeView")
          //- 動態元件，將元件以 is 傳入
          component(:is="Component")
</template>
<script setup>
import { useSettingsStore } from '@/stores/settings'
import { storeToRefs } from 'pinia'
const settings = useSettingsStore()
const { notify } = storeToRefs(settings)
const { toggleNotify } = settings
</script>
