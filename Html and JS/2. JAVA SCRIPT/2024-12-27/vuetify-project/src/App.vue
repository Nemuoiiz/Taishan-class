<template>
  <v-app>
    <!--
    :key="$route.fullPath"
    用於強制 <router-view> 的重新渲染
    這樣的設置會根據完整路徑 ($route.fullPath) 的變更來判斷是否重建組件 -->
      <router-view :key="$route.fullPath" />
  </v-app>
</template>
