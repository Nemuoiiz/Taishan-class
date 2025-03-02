<template>
  <v-container>
    <h1 class="text-h4 mb-4">捐贈資訊</h1>
    <p class="mb-4">您的捐贈將幫助許多有需要的人。無論是美妝產品、保養品，還是上妝工具，您的心意將帶來改變。</p>
    <v-text-field v-model="item" label="輸入捐贈物品" outlined></v-text-field>
    <v-btn color="primary"  class="mb-4" @click="donate">捐贈</v-btn>
    <v-list>
      <v-list-item v-for="(donated, index) in donatedItems" :key="index" class="donated-item">
        <v-card class="pa-4 mb-3">
          <v-card-title>{{ donated }}</v-card-title>
          <v-card-subtitle>感謝您的愛心！</v-card-subtitle>
        </v-card>
      </v-list-item>
    </v-list>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';

const item = ref('');
const donatedItems = ref(['粉底液（9成新）', '口紅（全新）', '眼影盤（部分使用）']);

const donate = () => {
  if (item.value.trim()) {
    donatedItems.value.push(item.value);
    item.value = '';
  }
};
</script>

<style scoped>
.donated-item {
  transition: all 0.3s ease-in-out;
}
</style>

<route lang="yaml">
  meta:
    login: false
    admin: false
    title: '捐贈資訊'
</route>
