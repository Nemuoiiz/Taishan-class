<template>
  <v-app-bar :color="`rgba(134, 193, 149)`">
    <v-container class="d-flex align-center">
      <!-- 網站標題 -->
      <v-btn to="/" :active="false">UTSHUN</v-btn>

      <v-spacer/>

      <!-- 主要導覽列（首頁、品牌故事、活動專區、愛心捐贈）-->
      <template v-for="nav in navs" :key="nav.to">
        <v-btn :to="nav.to">{{ nav.text }}</v-btn>
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
          <v-list>
            <v-list-item v-if="!user.isLoggedIn" to="/login">登入</v-list-item>
            <v-list-item v-if="!user.isLoggedIn" to="/register">註冊</v-list-item>
            <v-list-item v-if="user.isLoggedIn" to="/orders">使用者訂單</v-list-item>
            <v-list-item v-if="user.isLoggedIn" @click="logout">登出</v-list-item>
          </v-list>
        </v-menu>
      </template>
    </v-container>
  </v-app-bar>

  <v-main>
    <router-view></router-view>
  </v-main>
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
  { to: "/", text: "首頁" },
  { to: "/about", text: "品牌故事" },
  { to: "/products", text: "再生商品" },
  { to: "/events", text: "活動專區" },
  { to: "/donation", text: "愛心捐贈" }
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
