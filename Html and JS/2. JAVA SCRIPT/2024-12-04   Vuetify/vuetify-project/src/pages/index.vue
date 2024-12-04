<template>
  <VContainer>
    <VRow class="text-center" justify="center">
      <VCol cols="12">
        <h1>首頁</h1>
      </VCol>
      <VCol col="12">
        <p>store.number：{{ store.number }}</p>
        <p>store.square：{{ store.square }}</p>
        <p>number：{{ number }}</p>
        <p>square：{{ square }}</p>
        <!-- 使用 action 做修改 -->
        <VBtn @click="store.minus">－</VBtn>
        <VBtn @click="store.plus">＋</VBtn>
        <!-- 直接對 state 做修改 -->
        <VBtn @click="store.number--">－</VBtn>
        <VBtn @click="store.number++">＋</VBtn>
      </VCol>
    </VRow>
  </VContainer>
</template>

<script setup>
import { useAppStore } from "@/stores/app";
import { storeToRefs } from 'pinia'

const store = useAppStore()

// 解構 store 的 state 和 getters 會失去響應性
// const { number, square } = store
const { number, square } = storeToRefs(store)
</script>

