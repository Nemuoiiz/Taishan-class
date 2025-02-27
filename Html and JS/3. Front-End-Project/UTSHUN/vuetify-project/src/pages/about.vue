<!-- 帳號登入頁面 -->
<template>
  <v-container>
    <!-- 第一行 -->
    <v-row justify="space-between" align="center">
      <v-col cols="6">
        <img ref="image1" class="circle" src="../assets/images/carousel-1.jpg">
      </v-col>
      <v-col cols="6">
        <h3 ref="text1">資源共享，共創價值</h3>
        <p ref="desc1">將剩餘的化妝品重新分配，透過捐贈與交換，讓每一份美麗都能被珍惜與善用。</p>
      </v-col>
    </v-row>

    <!-- 第二行 -->
    <v-row justify="space-between" align="center">
      <v-col cols="6">
        <h3 ref="text2">永續循環，減少浪費</h3>
        <p ref="desc2">打造化妝品的二次生命，減少閒置與丟棄，推動環保與永續時尚，讓美麗更有意義。</p>
      </v-col>
      <v-col cols="6">
        <img ref="image2" class="circle" src="../assets/images/carousel-2.jpg">
      </v-col>
    </v-row>

    <!-- 第三行 -->
    <v-row justify="space-between" align="center">
      <v-col cols="6">
        <img ref="image3" class="circle" src="../assets/images/carousel-3.jpg">
      </v-col>
      <v-col cols="6">
        <h3 ref="text3">友善社群，溫暖互助</h3>
        <p ref="desc3">串聯捐贈者與有需要的人，建立信任與關懷的平台，讓美妝不只是裝飾，更是一種分享的力量。</p>
      </v-col>
    </v-row>
  </v-container>
</template>


<script setup>
import { ref, onMounted } from 'vue';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// 綁定 DOM 元素
const image1 = ref(null);
const text1 = ref(null);
const desc1 = ref(null);

const image2 = ref(null);
const text2 = ref(null);
const desc2 = ref(null);

const image3 = ref(null);
const text3 = ref(null);
const desc3 = ref(null);

onMounted(() => {
  // 設定動畫
  const animate = (element, fromX) => {
    gsap.from(element, {
      x: fromX,
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        trigger: element,
        start: "top 80%",  // 當元素進入視口 80% 時觸發
        toggleActions: "play none none none"
      }
    });
  };

  // 第一行（圖片從左進入，文字從右進入）
  animate(image1.value, -100);
  animate(text1.value, 100);
  animate(desc1.value, 100);

  // 第二行（文字從左進入，圖片從右進入）
  animate(text2.value, -100);
  animate(desc2.value, -100);
  animate(image2.value, 100);

  // 第三行（圖片從左進入，文字從右進入）
  animate(image3.value, -100);
  animate(text3.value, 100);
  animate(desc3.value, 100);
});
</script>



<style>

body {
  font-size: 30px;
  background-color: #eee8df;
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
}


</style>

<route lang="yaml">
  meta:
    login: false
    admin: false
    title: '品牌故事'
</route>
