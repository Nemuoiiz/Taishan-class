<template>
  <v-app theme="light">
    <router-view :key="$route.fullPath" />
  </v-app>
</template>

<!-- 用不到 -->
<!-- <script setup>
  //
</script> -->
