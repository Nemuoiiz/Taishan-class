<!-- 管理者後台 -->
<template>
  <v-navigation-drawer permanent>
    <v-list>
      <!-- 側邊欄顯示帳號和動態大頭貼 -->
      <v-list-item class="mt-3 mb-3">
        <template #prepend>
          <!-- 使用 vue-boring-avatars 動態生成大頭貼 -->
          <Avatar :size="50" :name="user.account" variant="beam" :colors="colors" />
        </template>
        <v-list-item-title class="ml-5">{{ user.account }}</v-list-item-title>
      </v-list-item>
    </v-list>
    <v-divider></v-divider>
    <v-list>
      <v-list-item v-for="nav in navs" :key="nav.to" :prepend-icon="nav.icon" :title="nav.text" :to="nav.to"></v-list-item>
    </v-list>
  </v-navigation-drawer>
  <v-main>
    <router-view></router-view>
  </v-main>
</template>

<script setup>
import { computed } from 'vue';
import { useUserStore } from '@/stores/user';
import Avatar from "vue-boring-avatars";

const user = useUserStore();

// 用來動態生成頭貼顏色
const colors = ["#9EBD98", "#FFCD57", "#F8B58C"];

const navs = computed(() => {
  return [
    { to: '/admin/products', text: '商品管理', icon: 'mdi-shopping' },
    { to: '/admin/orders', text: '訂單管理', icon: 'mdi-format-list-bulleted' },
    { to: '/', text: '返回首頁', icon: 'mdi-home' },
  ]
});
</script>
