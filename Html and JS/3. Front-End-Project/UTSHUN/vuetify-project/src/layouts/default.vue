<!-- 網頁基礎架構 -->
<template>
  <!-- 導覽列 -->
  <v-app-bar
    :color="`rgba(134, 193, 149, ${1 - Math.min(scrollY / 300, 1)})`"
    :elevation="scrollY > 50 ? 4 : 0"
    scroll-behavior="fade-image"
  >
    <v-container class="d-flex align-center">
      <v-btn to="/" :active="false">UTSHUN</v-btn>

      <v-spacer></v-spacer>

      <v-btn v-for="nav of navs" :key="nav.to" :to="nav.to" :prepend-icon="nav.icon">{{ nav.text }}</v-btn>
    </v-container>
  </v-app-bar>

  <v-main>
    <router-view>
    </router-view>
  </v-main>
</template>

<script setup>
// 導覽列會根據有沒有登入顯示不同內容 (動態) 因此要使用 computed
import { ref,computed, onMounted, onUnmounted } from 'vue';

// 導覽列項目
const navs = computed(() => {
  return [
    // 使用 text: t() 去接 zhHant.js 的 export default 內容
    { to: '/register', text:'註冊', icon: 'mdi-account-plus'},
    { to: '/login', text:'登入' , icon: 'mdi-account-arrow-left' },
    { to: '/cart', text:'購物車', icon: 'mdi-cart' },
    // { to: '/orders', text:'' , icon: 'mdi-format-list-bulleted'},
    // { to: '/admin', text:'' , icon: 'mdi-cog'},
    ]
})

const scrollY = ref(0);


// 監聽滾動事件
const updateScroll = () => {
  scrollY.value = window.scrollY;
};

onMounted(() => {
  window.addEventListener('scroll', updateScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', updateScroll);
});

</script>
