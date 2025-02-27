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
      <!-- 直接將導航項目寫死 -->
      <v-list-item :key="'product'" :prepend-icon="'mdi-shopping'" :title="'商品管理'" to="/admin/products"></v-list-item>
      <v-list-item :key="'orders'" :prepend-icon="'mdi-format-list-bulleted'" :title="'訂單管理'" to="/admin/orders"></v-list-item>
      <v-list-item :key="'home'" :prepend-icon="'mdi-home'" :title="'返回首頁'" to="/"></v-list-item>
    </v-list>
  </v-navigation-drawer>
  <v-main>
    <router-view></router-view>
  </v-main>
</template>


<script setup>
import { useUserStore } from '@/stores/user';
import Avatar from "vue-boring-avatars";

const user = useUserStore();

// 用來動態生成頭貼顏色
const colors = ["#9EBD98", "#FFCD57", "#F8B58C"];

</script>

<style scoped>
.v-navigation-drawer {
  background-color: #97ac94;
  color: #eee8df;
}

.v-list-item-title {
  font-size: 26px; /* 調整這裡的文字大小 */
}

.v-main {
  background-color: #eee8df;
  font-size: 30px;
}
</style>
