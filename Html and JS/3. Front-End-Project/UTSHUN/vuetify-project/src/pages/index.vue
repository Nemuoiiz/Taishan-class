<template>
  <v-container class="video-carousel-container" fluid>
    <!-- 影片播放 -->
    <transition name="fade" mode="in-out">
      <video
        v-if="currentVideo"
        :key="currentVideo"
        class="carousel-video"
        autoplay
        loop
        muted
        playsinline
      >
        <source :src="currentVideo" type="video/mp4" />
        你的瀏覽器不支援影片播放
      </video>
    </transition>
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
import { ref, computed, onMounted } from 'vue'
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

const currentVideoIndex = ref(0)
const currentVideo = computed(() => videoSources.value[currentVideoIndex.value])

const changeVideo = () => {
  currentVideoIndex.value = (currentVideoIndex.value + 1) % videoSources.value.length
}

onMounted(() => {
  setInterval(changeVideo, 10000) // 每10秒切換一次影片
})

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
.video-carousel-container {
  padding: 0; /* 移除內邊距 */
}

.carousel-video {
  width: 100vw; /* 設置影片寬度為視窗寬度 */
  height: 100vh; /* 設置影片高度為視窗高度 */
  object-fit: cover; /* 讓影片滿版不變形 */
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 3s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

</style>

<route lang="yaml">
  meta:
    login: false
    admin: false
    title: '首頁'
</route>
