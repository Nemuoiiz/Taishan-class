<template>
  <div id="top">
    <img src="@/assets/park0307.gif" @click="goHome" />
    <img src="@/assets/park0307.gif" @click="$router.push('/')" />
  </div>
</template>

<style scoped lang="sass">
#top
  width: 1000px
  height: 65px
  margin: auto
  background: #00f
  text-align: center
</style>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
const goHome = () => {
  router.push('/')
}
</script>

<!--
<script>
export default {
  methods: {
    goHome() {
      // 在瀏覽器歷史紀錄裡新增一筆資料來換頁
      this.$router.push('/')
      // 在瀏覽器歷史紀錄裡新增一筆資料來換頁
      // this.$router.push({ name: 'home' })
      // 在瀏覽器歷史紀錄裡取代目前資料來換頁
      // this.$router.replace('/')
      // 相對數字跳頁，-1 上一頁，1 是下一頁
      // this.$router.go(-1)
    },
  },
}
</script>
-->
