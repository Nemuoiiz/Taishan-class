<template>
  <v-app-bar>
    <v-container class="d-flex align-center">
      <!-- :active="false" 關閉連結 -->
      <v-btn to="/" :active="false">購物網站</v-btn>
      <v-spacer/>
      <v-btn v-for="nav of navs" :key="nav.to" :to="nav.to" :prepend-icon="nav.icon">{{  nav.text  }}</v-btn>
    </v-container>
  </v-app-bar>
  <!-- 補 v-main、router-view 才看的到頁面內容 -->
  <v-main>
    <router-view></router-view>
  </v-main>
</template>

<script setup>
  // 導覽列文字是動態的，因此需使用 computed
  import { computed } from "vue"
  import { useI18n } from 'vue-i18n'

  const { t } = useI18n()

// 導覽列項目
const navs = computed(() => {
  return [
    // 使用 text: t() 去接 zhHant.js 的 export default 內容
    { to: '/register', text: t('nav.register'), icon: 'mdi-account-plus' },
    { to: '/login', text: t('nav.login'), icon: 'mdi-account-arrow-left' },
    ]
  })
</script>
