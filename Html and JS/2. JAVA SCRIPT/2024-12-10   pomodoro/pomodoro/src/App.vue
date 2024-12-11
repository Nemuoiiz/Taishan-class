<template>
  <v-app>
    <v-app-bar>
      <v-container class="d-flex align-center">
        <v-app-bar-title>番茄鐘</v-app-bar-title>
        <v-btn prepend-icon="mdi-home" to="/">首頁</v-btn>
        <v-btn prepend-icon="mdi-format-list-bulleted" to="/list">事項</v-btn>
        <v-btn prepend-icon="mdi-cog" to="/settings">設定</v-btn>
      </v-container>
    </v-app-bar>
    <v-main>
    <!-- 使換頁時 setInterval 可以照常運作： -->
    <!--🔻slot = 插槽 = 自訂元件內的某部分 HTML
          🔹 v-slot="元件插槽提供的可用變數"
          🔹 Component = 目前路由應該顯示的元件 -->
      <router-view v-slot="{ Component }">
        <!-- 🔻 <keep-alive> 讓包住的元件不被銷毀 -->
        <!--  🔹 include="index" => include 指定保留的元件，不使用的話網頁效能會變差
                  這裡意思是只有首頁要做快取
                    🔹 :is="Component"
                    🔹 is        => 要使用的元件
                    🔹 component => 動態元件 -->
        <keep-alive include="index">
          <component :is="Component"></component>
        </keep-alive>
      </router-view>
    </v-main>
  </v-app>
</template>
