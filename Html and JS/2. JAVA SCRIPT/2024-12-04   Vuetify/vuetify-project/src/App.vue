<template>
  <!-- https://vuetifyjs.com/en/components -->
  <!-- Vapp => 放置整體內容 -->
  <VApp>
    <!-- 導覽列元件 -->
    <VAppBar>
      <!--  container 容器包起來導覽列才不會太開
            class="d-flex align-center" 防止跑版 -->
      <VContainer class="d-flex align-center">
        <!-- 網頁標題 -->
        <VAppBarTitle>VUETIFY</VAppBarTitle>
        <!-- 使用 mdi icon => mdi-home -->
        <VBtn prepend-icon="mdi-home" to="/">首頁</VBtn>
        <!-- 使用 mdi icon => mdi-cog -->
        <VBtn prepend-icon="mdi-cog" to="/test">相關內容</VBtn>
      </VContainer>
    </VAppBar>
    <!-- 網頁主要內容 -->
    <VMain>
      <RouterView />
    </VMain>
  </VApp>
</template>
