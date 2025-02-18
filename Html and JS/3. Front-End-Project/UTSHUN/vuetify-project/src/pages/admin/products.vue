<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1 class="text-center">商品管理</h1>
      </v-col>
      <v-divider></v-divider>
      <v-col cols="12">
        <v-data-table :items="products" :headers="headers">
          <!-- 插槽 v-slot 簡寫為 #  -->
          <template #top>
            <v-toolbar>
              <!-- 新增商品 -->
              <v-btn @click="openDialog(null)">新增商品</v-btn>
              <v-spacer></v-spacer>
              <v-text-field v-model="search" prepend-inner-icon="mdi-magnify" variant="underlined"></v-text-field>
            </v-toolbar>
          </template>

          <template #[`item.image`]="{ value }">
            <v-img :src="value" height="50"></v-img>
          </template>
          <template #[`item.sell`]="{ value }">
            <v-icon v-if="value" icon="mdi-check"></v-icon>
          </template>
          <template #[`item.createdAt`]="{ value }">
            {{ new Date(value).toLocaleString() }}
          </template>
          <template #[`item.updatedAt`]="{ value }">
            {{ new Date(value).toLocaleString() }}
          </template>
          <template #[`item.category`]="{ value }">
            {{ value.sub }} - {{ value.main }}
          </template>
          <template #[`item.used`]="{ value }">
            <v-icon v-if="value" icon="mdi-bandage"></v-icon>
            <v-icon v-else icon="mdi-new-box"></v-icon>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useAxios } from '@/composables/axios'
import { reactive, computed } from 'vue'
import { useSnackbar } from 'vuetify-use-dialog'
// import { useForm, useField } from 'vee-validate'
// import * as yup from 'yup'

const { apiAuth } = useAxios()
const createSnackbar = useSnackbar()

const products = reactive([])
const headers = computed(() => {
  return [
    { title: 'ID', key: '_id', sortable: true },
    { title: '圖片', key: 'image', sortable: false },
    { title: '名稱', key: 'name', sortable: true },
    { title: '類別', key: 'category', sortable: true },
    { title: '售價', key: 'price', sortable: true },
    { title: '說明', key: 'description', sortable: false },
    { title: '新舊狀況', key: 'used', sortable: true },
    { title: '二手情況', key: 'UsedNote', sortable: false },
    { title: '販售狀態', key: 'sell', sortable: true },
    { title: '建立時間', key: 'createdAt', sortable: true },
    { title: '更新時間', key: 'updatedAt', sortable: true },
    // { title: '編輯商品', key: 'edit', sortable: false },
  ]
})


const getProducts = async () => {
  try {
    // 跟後端 router > product.js 取得'給管理員看的'商品資料
    const { data } = await apiAuth.get('/product/all')
    products.push(...data.result)
  } catch (error) {
    console.log(error)
    createSnackbar({
      text: error?.response?.data?.message || '發生未知錯誤',
      snackbarProps: {
        color: 'red'
      }
    })
  }
}
getProducts()

</script>

<route lang="yaml">
  meta:
    layout: admin
    login: true
    admin: true
    title: '商品管理'
</route>
