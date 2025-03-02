<template>
  <v-container>
    <h1 class="text-h4 mb-4">活動列表</h1>
    <v-list>
      <v-list-item v-for="(activity, index) in activities" :key="index" class="activity-item">
        <v-card class="pa-4 mb-3">
          <v-card-title>{{ activity }}</v-card-title>
        </v-card>
      </v-list-item>
    </v-list>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import gsap from 'gsap';

const activities = ref(['淨灘', '美妝教室', '使用彩妝平提供給弱勢繪畫']);

onMounted(() => {
  gsap.from('.activity-item', { opacity: 0, y: 50, stagger: 0.2 });
});
</script>

<style scoped>
.activity-item {
  transition: all 0.3s ease-in-out;
}
</style>

<route lang="yaml">
  meta:
    login: false
    admin: false
    title: '活動專區'
  </route>
