<!-- 帳號登入頁面 -->
<template>
  <v-container>
    <!-- 第一行 -->
    <v-row justify="space-between" align="center">
      <v-col cols="6">
        <transition name="fade-up">
          <img v-if="showImage" class="circle" src="../assets/images/carousel-1.jpg">
        </transition>
      </v-col>
      <v-col cols="6">
        <h1>品牌故事</h1>
        <p>我們是一群熱愛環保的年輕人，希望透過再生商品，讓更多人認識環保的重要性。</p>
      </v-col>
    </v-row>

    <!-- 第二行 -->
    <v-row justify="space-between" align="center">
      <v-col cols="6">
        <h1>品牌故事</h1>
        <p>我們是一群熱愛環保的年輕人，希望透過再生商品，讓更多人認識環保的重要性。</p>
      </v-col>
      <v-col cols="6">
        <transition name="fade-up">
          <img v-if="showImage" class="circle" src="../assets/images/carousel-2.jpg">
        </transition>
      </v-col>
    </v-row>

    <!-- 第三行 -->
    <v-row justify="space-between" align="center">
      <v-col cols="6">
        <transition name="fade-up">
          <img v-if="showImage" class="circle" src="../assets/images/carousel-3.jpg">
        </transition>
      </v-col>
      <v-col cols="6">
        <h1>品牌故事</h1>
        <p>我們是一群熱愛環保的年輕人，希望透過再生商品，讓更多人認識環保的重要性。</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const showImage = ref(false); // 先隱藏圖片

onMounted(() => {
  setTimeout(() => {
    showImage.value = true;
  }, 300);
});
</script>



<style>

body {
  font-size: 30px; /* 設定字體大小 */
  font-family: 'Arial', sans-serif; /* 設定字體 */
}

</style>


<style scoped>

/* 讓圖片變圓形 */
.circle {
  position: relative;
  top:100px;
  width: 500px;
  height: 500px;
  border-radius: 50%;
  object-fit: cover;
  animation: floating 3s infinite ease-in-out; /* 持續浮動 */
}

/* Vue 過渡動畫 */
.fade-up-enter-active {
  animation: fadeUp 1s ease-in-out forwards;
}
.fade-up-enter {
  opacity: 0;
  transform: translateY(50px); /* 讓圖片從下方滑入 */
}

/* 進場時上移 + 淡入 */
@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 浮動動畫 (無限循環) */
@keyframes floating {
  0% { transform: translateY(0); }
  50% { transform: translateY(-30px); }
  100% { transform: translateY(0); }
}
</style>

<route lang="yaml">
  meta:
    login: false
    admin: false
    title: '品牌故事'
</route>
