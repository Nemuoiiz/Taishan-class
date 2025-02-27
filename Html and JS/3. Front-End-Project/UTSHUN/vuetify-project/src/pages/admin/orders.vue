<!-- 管理員看的訂單系統 -->
<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1 class="text-center">訂單系統</h1>
      </v-col>
      <v-divider></v-divider>
      <v-col cols="12">
        <v-data-table :items="orders" :headers="headers">
          <template #[`item.cart`]="data">
            <ul>
              <li v-for="item in data.item.cart" :key="item._id">
                {{ item.product.name }} x {{ item.quantity }}
              </li>
            </ul>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useAxios } from '@/composables/axios'
import { ref, computed } from 'vue'
import { useSnackbar } from 'vuetify-use-dialog'

const { apiAuth } = useAxios()
const createSnackbar = useSnackbar()

const orders = ref([])

const headers = computed(() => {
  return [
    { title: '訂單ID', key: '_id' },
    { title: '會員帳號', key: 'user.account' },
    // 去改 pages > admin > products.vue
    { title: '訂單時間', key: 'createdAt', value: item => new Date(item.createdAt).toLocaleString() },
    { title: '商品', key: 'cart', sortable: false},
    {
      title: '訂單金額',
      key: 'price',
      value: item => {
        return item.cart.reduce((acc, cur) => acc + cur.product.price * cur.quantity, 0)
      }
    }
  ]
})
const getOrders = async () => {
  try {
    const { data } = await apiAuth.get('/order/all')
    orders.value = data.result
  } catch (error) {
    console.log(error)
    createSnackbar({
      text: error?.response?.data?.message || '未知錯誤',
      snackbarProps: {
        color: 'red'
      }
    })
  }
}
getOrders()
</script>




<route lang="yaml">
meta:
  layout: 'admin'
  login: true
  title: '管理訂單系統'
</route>
