<template>
  <v-container class="video-carousel-container" fluid>
    <!-- 影片輪播 -->
    <v-carousel hide-delimiters :show-arrows="false" cycle height="100vh" interval="9000">
      <v-carousel-item v-for="(video, index) in videoSources" :key="index" eager>
        <video class="carousel-video" autoplay muted playsinline loop>
          <source :src="video" type="video/mp4" />
          你的瀏覽器不支援影片播放
        </video>
      </v-carousel-item>
    </v-carousel>
  </v-container>

    <!-- 品牌故事 -------------------------------------------------->
  <v-container class="mt-10 mb-10">
    <v-row>
      <!-- 標題 -->
      <v-col cols="12">
        <v-row id="story" class="title">
          <h1>Story&nbsp;</h1>
          <v-icon size="50">mdi-leaf</v-icon>
        </v-row>
      </v-col>
    </v-row>

    <v-row class="d-flex  justify-center">
      <v-col cols="3" class="hover-strory">
        <img class="story-pic" src="../assets/images/index-01.jpg" alt="資源共享共創價值"/>
        <div class="hidden-text">Share</div>
      </v-col>
      <v-col cols="3" class="hover-strory">
        <img class="story-pic" src="../assets/images/index-02.jpg" alt="永續循環減少浪費" />
        <div class="hidden-text">Reuse</div>
      </v-col>
      <v-col cols="3" class="hover-strory">
        <img class="story-pic" src="../assets/images/index-03.jpg" alt="友善社群溫暖互助" />
        <div class="hidden-text">Care</div>
      </v-col>
    </v-row>
  </v-container>

  <!-- 商品引薦區--------------------------------------------- -->
  <v-container>
    <v-row>
      <!-- 標題 -->
      <v-col cols="12">
        <v-row id="product" class="title">
          <v-icon size="50">mdi-leaf</v-icon>
          <h1>&nbsp;Product</h1>
        </v-row>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="6" class="d-flex flex-column align-center justify-center">
        <div class="mb-10 text-center" style="font-size: 24px;">
          精選二手與可再利用美妝品，讓閒置彩妝重獲新生。<br>
          經篩選分類，確保安全與品質，同時減少浪費。<br>
          分享美麗，讓每件彩妝找到最適合的歸屬！
        </div>
        <v-btn>see more</v-btn>
      </v-col>

      <v-col cols="6" class="d-flex align-center justify-center">
        <img src="../assets/images/carousel-3.jpg" style="height: 300px; width: 1000px"/>
      </v-col>
    </v-row>
  </v-container>

</template>

<script setup>
import { ref } from 'vue'

// 影片來源
import video01 from '@/assets/videos/v-01.mp4'
import video02 from '@/assets/videos/v-02.mp4'
import video03 from '@/assets/videos/v-03.mp4'
import video04 from '@/assets/videos/v-04.mp4'
import video05 from '@/assets/videos/v-05.mp4'


const videoSources = ref([
  video01,
  video02,
  video03,
  video04,
  video05,
])


</script>



<style scoped>

/* 影片 ------------------------------------- */
.video-carousel-container {
  padding: 0; /* 移除內邊距 */
}

.carousel-video {
  width: 100vw; /* 設置影片寬度為視窗寬度 */
  height: 100vh; /* 設置影片高度為視窗高度 */
  object-fit: cover; /* 讓影片滿版不變形 */
}

/* 理念 --------------------------------------- */
.story-pic {
  width: 90%;
  height: 500px;
  object-fit: cover;
  border-radius: 200px;
  transition: transform 0.3s ease; /* 可加上平滑變化效果 */
}

.hover-strory {
  position: relative;
  overflow: hidden; /* 確保超出部分不會顯示 */
}

/* 文字浮現效果 */
.hidden-text {
  font-family: "Croissant One", serif;
  position: absolute;
  bottom: 0px;
  left: 46%;
  transform: translateX(-50%);

  color: rgb(131, 110, 110);
  font-size: 3rem;
  opacity: 0;
  /* 讓文字有過渡效果 */
  transition: bottom 1s ease, opacity 1s ease;
  z-index: 10;
  text-align: center;
}

/* 當 hover 時，讓文字浮現 */
.hover-strory:hover .hidden-text {
  bottom: 45%;
  opacity: 1;
}

/* 圖片加上半透明遮罩 */
.hover-strory::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.7); /* 半透明白色遮罩 */
  opacity: 0; /* 預設不顯示 */
  /* 讓遮罩有過渡效果 */
  transition: opacity 0.3s ease;
  z-index: 5; /* 確保遮罩在圖片上，但在文字下 */
}

/* 當 hover 移開時，延遲 0.3 秒再讓文字淡出 */
.hover-strory:not(:hover) .hidden-text {
  transition: bottom 1s ease, opacity 0.5s ease; /* 文字淡出比遮罩快 0.2 秒 */
  bottom: -25%;
  opacity: 0;
}

/* 當 hover 時，顯示遮罩 */
.hover-strory:hover::before {
  opacity: 1;
}

/* 當 hover 移開時，延遲 0.5 秒再讓遮罩淡出 */
.hover-strory:not(:hover)::before {
  transition: opacity 0.3s ease 0.3s; /* 延遲 0.5 秒再變透明 */
  opacity: 0;
}

/* 確保圖片不被遮罩擋住 */
.hover-strory img {
  position: relative;
  z-index: 1; /* 圖片在遮罩下方，文字在最上層 */
}

/* 標題文字 */
.title {
  font-family: "Croissant One", serif;
  font-size: 2.5rem;
  z-index: 10;
  color: rgb(159, 190, 155);
  display: flex;
}

#story {
  position: relative;
  top: 50px;
  left: 50px;
  justify-content: flex-start;
  align-items: center; /* 垂直置中 */
  width: 100%; /* 確保它能夠撐滿整個行 */
}

#product {
  justify-content: flex-end;
  align-items: center; /* 垂直置中 */
  width: 100%; /* 確保它能夠撐滿整個行 */
}

</style>

<route lang="yaml">
  meta:
    login: false
    admin: false
    title: '首頁'
</route>
