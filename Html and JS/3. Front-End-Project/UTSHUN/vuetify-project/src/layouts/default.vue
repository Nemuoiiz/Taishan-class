<template>
  <v-app style="background-color: #eee8df; font-family: 'Croissant One', seri">
    <v-app-bar
      elevation="4"
      :color="`rgba(159, 190, 155, 0.6)`"
      class="floating"
      height="100"
      scroll-behavior="elevate"
>
      <v-container class="d-flex align-center" style="height: 100%;">
        <!-- 網站標題 -->
        <v-btn to="/" :active="false" style="font-size: 30px; text-transform: none;">U-tshun</v-btn>

        <v-spacer/>

        <!-- 主要導覽列（首頁、品牌故事、活動專區、愛心捐贈）-->
        <template v-for="(nav, index) in navs" :key="nav.to">
          <v-btn :to="nav.to" class="nav-btn">{{ nav.text }}</v-btn>
          <span v-if="index < navs.length - 1" class="nav-divider">｜</span>
        </template>

        <v-spacer/>

        <!-- 管理者導覽列 -->
        <template v-if="user.isLoggedIn && user.isAdmin">
          <v-btn to="/admin" icon>
            <v-icon>mdi-cog</v-icon>
          </v-btn>
          <v-btn icon @click="logout">
            <v-icon>mdi-logout</v-icon>
          </v-btn>
        </template>

        <!-- 一般使用者導覽列 -->
        <template v-else>
          <v-btn icon>
            <v-icon>mdi-heart</v-icon>
          </v-btn>
          <v-btn to="/cart" icon>
            <v-icon>mdi-cart</v-icon>
            <!-- 購物車數量 -->
            <v-badge v-if="user.cart" :content="user.cart" floating color="red"></v-badge>
          </v-btn>

          <!-- 使用者選單 -->
          <v-menu>
            <template #activator="{ props }">
              <v-btn v-bind="props" icon>
                <v-icon>mdi-account</v-icon>
              </v-btn>
            </template>
            <v-list style="font-size: 16px;font-family: 'Croissant One', seri">
              <v-list-item v-if="!user.isLoggedIn" to="/login">Login</v-list-item>
              <v-list-item v-if="!user.isLoggedIn" to="/register">Register</v-list-item>
              <v-list-item v-if="user.isLoggedIn" to="/orders">User orders</v-list-item>
              <v-list-item v-if="user.isLoggedIn" @click="logout">logout</v-list-item>
            </v-list>
          </v-menu>
        </template>
      </v-container>
    </v-app-bar>

    <v-main :class="{ 'no-padding': $route.meta.title === '首頁' }">
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script setup>
import { computed } from 'vue';
import { useUserStore } from '@/stores/user';
import { useAxios } from '@/composables/axios';
import { useSnackbar } from 'vuetify-use-dialog';
import { useRouter } from 'vue-router';

const user = useUserStore();
const { apiAuth } = useAxios();
const createSnackbar = useSnackbar();
const router = useRouter();

// 主要導覽列（所有人都會看到）
const navs = computed(() => [
  { to: "/about", text: "About" },
  { to: "/products", text: "Product" },
  { to: "/events", text: "Activity" },
  { to: "/donation", text: "Donation" }
]);

// 登出
const logout = async () => {
  try {
    await apiAuth.delete('/user/logout');
  } catch (error) {
    console.log(error);
  }
  user.logout();
  createSnackbar({
    text: '登出成功',
    snackbarProps: { color: 'green' }
  });
  router.push('/');
};
</script>


<style>
/* 全局背景顏色設定 */
.v-app {
  background-color: #eee8df;
}
</style>

<style scoped>

/* 讓 navbar 浮在上方但不影響內容 */
.floating {
  position: fixed !important;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000; /* 確保它在最上層 */
  backdrop-filter: blur(10px); /* 增加毛玻璃效果 */
}

/* 讓 v-main 不會被遮住 */
.v-main {
  padding-top: 100px; /* 讓內容不會被 navbar 壓住 */
}
.no-padding {
  padding-top: 0px !important; /* 如果是首頁，移除 padding */
}

.nav-btn {
  font-size: 16px;
}

/* 分隔線 */
.nav-divider {
  margin: 0 5px;
  font-size: 25px;
  color: rgb(131, 158, 120); /* 可依需求改變顏色 */
}

</style>
