<template>
  <div id="top">
    <!-- 🔻 使用 JS function -->
    <img src="@/assets/park0307.gif" @click="goHome" />
    <!-- 🔻不想寫 JS function 的話可以直接寫下方這列 -->
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

    img
      cursor: pointer
</style>

<!-- 🔻 使用 JS function (有 setup 的版本)  -->
<script setup>
// vue-router 來源為 => package.json 資料夾內 package-lock.json 檔的 vue-router": "^4.4.5"
import { useRouter } from 'vue-router'
const router = useRouter()
// 想像瀏覽器的歷史紀錄是一個陣列
const goHome = () => {
  // 🔹 在瀏覽器歷史紀錄裡新增一筆資料來換頁，'/' 在 index.js 被定義為首頁(name)
  router.push('/')
}
</script>

<!-- 🔻 使用 JS function (無 setup 的版本)  -->
<!-- <script>
export default {
  methods: {
    goHome() {
      // 想像瀏覽器的歷史紀錄是一個陣列
      // 🔹 在瀏覽器歷史紀錄裡新增一筆資料來換頁
      this.$router.push('/')
      // 🔹 在瀏覽器歷史紀錄裡新增一筆資料來換頁
      // this.$router.push({ name: 'home' })
      // 🔹 在瀏覽器歷史紀錄裡取代目前資料來換頁
      // this.$router.replace('/')
      // 🔹 相對數字跳頁，-1 上一頁，1 是下一頁
      // this.$router.go(-1)
    },
  },
}
</script> -->
