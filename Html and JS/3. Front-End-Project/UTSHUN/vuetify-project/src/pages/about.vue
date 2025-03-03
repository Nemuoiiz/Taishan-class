<!-- 帳號登入頁面 -->
<template>
  <v-container fluid style="padding: 0;margin: 0;">
    <v-row>
      <v-col cols="4">
        <img src="https://picsum.photos/1920/1080/?random=7">
      </v-col>
      <v-col cols="4">
        <img src="https://picsum.photos/1920/1080/?random=8">
      </v-col>
      <v-col cols="4">
        <img src="https://picsum.photos/1920/1080/?random=9">
      </v-col>
      <div>彩妝新賰，永續再生。</div>
    </v-row>
  </v-container>

  <v-container>
    <v-row>
    <v-col cols="6">
      <h1>About Ū-tshun</h1>
      <p>有賰，誕生於對美麗與永續的深刻思考。</p>
      <br>
      <div>
        我們發現，許多彩妝品只使用了幾次，就因為個人口味改變、購物衝動或新品推出而被閒置，最終成為浪費。但其實，這些彩妝仍然擁有價值，只要妥善保存與流通，就能延續它們的生命，減少資源浪費。<br>
        「有賰」在台語中意指「有剩餘」，但我們相信，剩餘不代表無用，而是另一種可能的開始。<br>
        有賰，不只是「多餘」，更是「有春」，象徵著新生與再利用的契機。<br>
        我們的目標是建立一個安心交易的二手彩妝平台，讓閒置彩妝找到新主人，延續它的價值。我們倡導「美麗不浪費，彩妝再重生」，希望透過這個平台，讓每一支口紅、每一盤眼影，都能繼續發揮它的魅力。<br>
        在ū-tshun，每一次交易不僅是物品的流動，更是對環境的友善選擇。讓我們一起用行動支持永續時尚，讓美麗與地球共存，讓「有賰」成為一種負責任的生活態度。</div>
    </v-col>
    <v-col cols="6">
      <img style="width: 100%;" src="../assets/images/about-u.jpg">
    </v-col>
  </v-row>
  </v-container>

  <v-container>
    <!-- 第一行 -->
    <v-row justify="space-between" align="center">
      <v-col cols="6">
        <img ref="image1" class="circle" src="../assets/images/cosmetic.png">
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
        <img ref="image2" class="circle" src="../assets/images/no-plastic.png">
      </v-col>
    </v-row>

    <!-- 第三行 -->
    <v-row justify="space-between" align="center">
      <v-col cols="6">
        <img ref="image3" class="circle" src="../assets/images/love.png">
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
  font-size: 24px;
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
