<template>
  <!-- 🔻 兩種寫法 <RouterLink>、<router-link> 都可以 -->
  <!-- ㊙️ 老師常用第一種 -->
  <RouterLink to="/yangmingshan">YangMingShan</RouterLink>
  <router-link :to="{ name: 'home' }">YangMingShan</router-link>

  <table id="menu">
    <!-- 要求 :key 時可以直接使用變數當值 -->
    <template v-for="(link, i) in links" :key="i">
      <tr>
        <td>
          <!-- ㊙️ 使用 RouterLink :to 才不會另外跳頁 -->
          <RouterLink :to="link.to">
            <img :src="link.image" />
          </RouterLink>
        </td>
      </tr>
      <tr>
        <td>&nbsp;</td>
      </tr>
    </template>
  </table>
  <!-- 新增檔案下載 -->
  <p class="download">
    <a href="./others/park.mp3" download>檔案下載</a>
  </p>
</template>

<script setup>
const links = [
  // 此處是使用迴圈去取 assets 的路徑資料，所以一定要加上 new
  // 若路徑固定，可以直接用靜態方式（如模板內的 @/assets/...）。
  // 若路徑需要動態生成（如依賴變數），則使用 new URL() 或其他工具來確保資源正確取得
  // '/' 代表回首頁
  { to: '/yangmingshan', image: new URL('@/assets/park0302.jpg', import.meta.url).href },
  { to: '/', image: new URL('@/assets/park0303.jpg', import.meta.url).href },
  { to: '/', image: new URL('@/assets/park0304.jpg', import.meta.url).href },
  { to: '/', image: new URL('@/assets/park0305.jpg', import.meta.url).href },
]
</script>

<style scoped lang="sass">
#menu
  width: 100%
  text-align: center

  img
    width: 120px
    height: 40px

    &:hover
      filter: hue-rotate(120deg)

.download
  text-align: center
  margin-top: 10px
</style>
