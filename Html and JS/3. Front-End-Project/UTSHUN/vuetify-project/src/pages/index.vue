<template>
    <!-- 輪播圖 -->
    <v-carousel hide-delimiters :show-arrows="false" fuild>
      <v-carousel-item v-for="(video, index) in videoSources" :key="index">
        <video class="carousel-video" autoplay muted playsinline loop>
          <source :src="video" type="video/mp4" />
          你的瀏覽器不支援影片播放
        </video>
      </v-carousel-item>
    </v-carousel>

  <!-- 品牌故事 -->
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-row align="center">
          <v-icon size="40">mdi-leaf</v-icon>
          <h1 class="mb-0">品牌故事</h1>
        </v-row>
          <p>UTSHUN 是一個專門製作手工皂的品牌，我們的產品不含化學添加物，對肌膚溫和且保濕。</p>
      </v-col>
    </v-row>
  </v-container>

  <!-- 商品搜尋區 -->
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-text-field v-model="search" prepend-inner-icon="mdi-magnify" />
      </v-col>
      <v-col v-for="product of filteredProducts" :key="product._id" cols="12" md="6" lg="3">
        <product-card v-bind="product" />
      </v-col>
      <v-col cols="12">
        <v-pagination v-model="currentPage" :length="totalPage" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAxios } from '@/composables/axios'
import ProductCard from '@/components/ProductCard.vue'

const { api } = useAxios()

// 影片來源
const videoSources = ref([
  '/videos/v-01.mp4',
  '/videos/v-02.mp4',
  '/videos/v-03.mp4',
  '/videos/v-04.mp4',
  '/videos/v-05.mp4',
])

// 一頁 8 筆
const ITEMS_PER_PAGE = 8
const currentPage = ref(1)
const products = ref([])
const search = ref('')
const totalPage = computed(() => Math.ceil(products.value.length / ITEMS_PER_PAGE))

const filteredProducts = computed(() => {
  return products.value
    .filter(product => product.name.toLowerCase().includes(search.value.toLowerCase()))
    .slice((currentPage.value - 1) * ITEMS_PER_PAGE, currentPage.value * ITEMS_PER_PAGE)
})

const getProducts = async () => {
  try {
    const { data } = await api.get('/product')
    products.value.push(...data.result)
  } catch (error) {
    console.log(error)
  }
}
getProducts()
</script>

<style scoped>
.carousel-container {
  padding: 0;
  margin: 0;
  height: 100vh; /* 設置容器高度為 100vh */
}

.carousel-video {
  width: 100vw; /* 設置影片寬度為 100vw */
  height: 100vh; /* 設置影片高度為 100vh */
  object-fit: cover; /* 保持影片比例並覆蓋容器 */
}

/* 淡入淡出效果 */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to {
  opacity: 0.1;
}
</style>

<route lang="yaml">
  meta:
    login: false
    admin: false
    title: '首頁'
</route>
