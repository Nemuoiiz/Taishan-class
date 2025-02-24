<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1 class="text-center">會員訂單</h1>
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
    const { data } = await apiAuth.get('/order')
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
  login: true
  title: '會員訂單'
</route>
