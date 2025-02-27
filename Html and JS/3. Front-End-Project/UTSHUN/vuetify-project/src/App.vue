<template>
  <v-app theme="light">
    <router-view :key="$route.fullPath" />
  </v-app>
</template>

<!-- 用不到 -->
<!-- <script setup>
  //
</script> -->


<style>
@font-face {
  font-family: 'Iansui';
  src: url('@/assets/fonts/Iansui-Regular.ttf') format('truetype');
}

body {
  font-family: 'Iansui', serif;
}
</style>
