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

      <v-spacer/>

      <!-- 選單按鈕 -->
      <template v-for="nav of navs" :key="nav.to">
        <v-btn v-if="nav.show" :to="nav.to" :prepend-icon="nav.icon">{{ nav.text }}</v-btn>
      </template>
      <!-- 登出按鈕獨立顯示 -->
      <v-btn v-if="user.isLoggedIn" prepend-icon="mdi-account-arrow-right" @click="logout">{{ '登出' }}</v-btn>
    </v-container>
  </v-app-bar>

  <v-main>
    <router-view>
    </router-view>
  </v-main>
</template>

<script setup>
// 導覽列會根據有沒有登入顯示不同內容 (動態) 因此要使用 computed
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useUserStore } from '@/stores/user';
import { useAxios } from '@/composables/axios';
import { useSnackbar } from 'vuetify-use-dialog'
import { useRouter } from 'vue-router'

const user = useUserStore()
// 登出需使用到 jwt
const { apiAuth } = useAxios()
const createSnackbar = useSnackbar()
const router = useRouter()

// 導覽列項目
const navs = computed(() => {
  return [
    // 使用 text: t() 去接 zhHant.js 的 export default 內容
    { to: '/register', text:'註冊', icon: 'mdi-account-plus',show: !user.isLoggedIn},
    { to: '/login', text:'登入' , icon: 'mdi-account-arrow-left' ,show: !user.isLoggedIn},
    { to: '/cart', text:'購物車', icon: 'mdi-cart' ,show:user.isLoggedIn},
    { to: '/orders', text:'訂單' , icon: 'mdi-format-list-bulleted',show:user.isLoggedIn},
    { to: '/admin', text:'管理' , icon: 'mdi-cog',show:user.isLoggedIn && user.isAdmin},
    ]
})

// 登出
const logout = async () => {
  try {
    await apiAuth.delete('/user/logout')
  } catch (error) {
    console.log(error)
  }
  user.logout()
  createSnackbar({
    text: '成功登出',
    snackbarProps: {
      color: 'green'
    }
  })
  // 在購物車頁面登出後回首頁
  router.push('/')
}



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
