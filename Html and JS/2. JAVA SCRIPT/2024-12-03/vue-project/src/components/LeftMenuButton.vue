<template>
  <div class="btn">{{ text }}</div>
</template>

<style scoped lang="sass">
.btn
  width: 200px
  height: 35px
  text-align: center
  background: url(@/assets/menu1.png) no-repeat center
  margin: 5px auto

  // 內容是單行 => align-items
  // 內容是多行 => align-content
  align-content: center
  &:hover
    background: url(@/assets/menu1.png) no-repeat center
</style>

<script setup>
defineProps(['text'])
</script>

<!--
<script>
export default {
  props: ['text'],
}
</script>
-->
