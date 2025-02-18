<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1 class="text-center">商品管理</h1>
      </v-col>
      <v-divider></v-divider>
      <v-col cols="12">
        <!-- 表格 -->
        <v-data-table :items="products" :headers="headers" :search="search">
          <!-- 插槽 v-slot 簡寫為 #  -->
          <template #top>
            <v-toolbar>
              <!-- 新增商品 -->
              <v-btn @click="openDialog(null)">新增商品</v-btn>
              <v-spacer></v-spacer>
              <v-text-field v-model="search" prepend-inner-icon="mdi-magnify" variant="underlined"></v-text-field>
            </v-toolbar>
          </template>

          <!-- 插槽 v-slot 簡寫為 #  -->
          <!-- 插槽引入的值非單一時需要用 [``] 包起來 -->
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
            {{ '主分類：' + value.main }}<br>
            {{ value.sub ? '子分類：' + value.sub : '' }}
          </template>
          <!-- 編輯用的虛擬欄位 -->
          <template #[`item.edit`]="{ item }">
            <v-btn icon="mdi-pencil" variant="text" @click="openDialog(item)"></v-btn>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>

  <!-- 對話框 -->
  <!-- persistent 固定表單不會因為點擊外部而關閉 -->
  <v-dialog v-model="dialog.open" persistent>
    <!-- 送出時執行 submit -->
    <v-form :disabled="isSubmitting" @submit.prevent="submit">
      <v-card>
        <!-- 如果商品本身有 id 就判定可以編輯，沒有就判定可以新增 -->
        <v-card-title>{{ dialog.id ? '編輯商品' : '新增商品' }}</v-card-title>
        <v-card-text>
          <v-text-field
            v-model="name.value.value"
            label="商品名稱"
            :error-messages="name.errorMessage.value">
          </v-text-field>

          <v-text-field
            v-model="price.value.value"
            label="商品價格"
            :error-messages="price.errorMessage.value"
            type="number" min="0"
          ></v-text-field>

          <v-select
            v-model="categoryMain.value.value"
            :items="categoryOptions"
            label="商品主分類"
            item-title="text"
            item-value="value"
            @update:model-value="updateSubCategoryOptions"
          />

          <v-select
            v-if="subCategoryOptions.length > 0"
            v-model="categorySub.value.value"
            :items="subCategoryOptions"
            label="商品子分類"
            item-title="text"
            item-value="value"
            :error-messages="categorySub.errorMessage.value"
          />

          <v-checkbox
            v-model="sell.value.value"
            label="是否販售"
            :error-messages="sell.errorMessage.value"
          ></v-checkbox>

          <v-textarea
            v-model="description.value.value"
            label="商品介紹"
            :error-messages="description.errorMessage.value"
          ></v-textarea>

          <!-- vue-file-agent 上傳圖檔 -->
          <VueFileAgent
            ref="fileAgent" v-model="fileRecords"
            v-model:raw-model-value="rawFileRecords"
            accept="image/jpeg,image/png"
            deletable
            max-size="1MB"
            :help-text="'請上傳 JPEG/PNG 格式的圖片，最大 1MB'"
            :error-text="{ type: '僅支援 JPEG/PNG 格式', size: '檔案大小不可超過 1MB' }"
          ></VueFileAgent>
        </v-card-text>

        <v-card-actions>
          <v-btn @click="closeDialog">取消修改</v-btn>
          <v-btn type="submit" :loading="isSubmitting">確定修改</v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script setup>
import { useAxios } from '@/composables/axios'
import { useSnackbar } from 'vuetify-use-dialog'
import { reactive, computed, ref } from 'vue'
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'

const { apiAuth } = useAxios()
const createSnackbar = useSnackbar()

const products = reactive([])
const search = ref('')
const headers = computed(() => {
  return [
    { title: 'ID', key: '_id', sortable: true },
    { title: '商品圖片', key: 'image', sortable: false },
    { title: '商品名稱', key: 'name', sortable: true },
    { title: '商品介紹', key: 'description', sortable: true },
    { title: '商品價格', key: 'price', sortable: true },
    { title: '商品類別', key: 'category', sortable: true },
    { title: '使否販售', key: 'sell', sortable: true },
    { title: '建立時間', key: 'createdAt', sortable: true },
    { title: '更新時間', key: 'updatedAt', sortable: true },
    { title: '編輯商品', key: 'edit', sortable: false },
  ]
})

const getProducts = async () => {
  try {
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

// 對話框
const dialog = ref({
  open: false,
  id: ''
})

// 開啟對話框的編輯鈕
const openDialog = (item) => {
  if (item) {
    dialog.value.id = item._id
    name.value.value = item.name
    price.value.value = item.price
    description.value.value = item.description
    categoryMain.value.value = item.category.main // 確認主分類
    updateSubCategoryOptions(item.category.main) // 更新子分類
    categorySub.value.value = item.category.sub || '' // 若有子分類預設選擇
    sell.value.value = item.sell
  }
  dialog.value.open = true
}

// 設定 categoryMain 和 categorySub 的選項
const updateSubCategoryOptions = (mainCategory) => {
  const selectedCategory = categoryOptions.find(item => item.value === mainCategory)
  subCategoryOptions.value = selectedCategory ? selectedCategory.subs || [] : [] // 更新子分類選項
  categorySub.value.value = '' // 清除子分類選項
}

const closeDialog = () => {
  resetForm()
  dialog.value.id = ''
  dialog.value.open = false
  fileAgent.value.deleteFileRecord()
}

// 分類選項
const categoryOptions = Object.entries({
  '臉部彩妝': ['粉底', '修容', '打亮', '腮紅'],
  '眼部彩妝': ['眼彩', '眉彩'],
  '唇部彩妝': [],
  '日常保養': ['保養品', '乳液乳霜', '面膜', '化妝水'],
  '臉部清潔': ['卸妝品', '洗面乳'],
  '上妝用具': ['刷具', '粉底刮刀', '美妝蛋'],
}).map(([main, subs]) => ({
  text: main,
  value: main,
  subs: subs.length > 0 ? subs.map(sub => ({ text: sub, value: sub })) : null
}))

const subCategoryOptions = ref([])

const fileAgent = ref(null)
const fileRecords = ref([])
const rawFileRecords = ref([])

// 表單驗證
const schema = yup.object({
  name: yup
    .string()
    .required('商品名稱必填'),
  price: yup
    .number()
    .typeError('商品價格必填')
    .required('商品價格必填')
    .min(0, '商品價格不能小於 0'),
  description: yup
    .string()
    .required('商品描述必填'),
  categorySub: yup
    .string()
    .required('商品子分類必填')
    .when('categoryMain', {
      is: (categoryMain) => categoryMain && categoryMain.length > 0,
      then: yup.string().oneOf(subCategoryOptions.value.map(sub => sub.value), '商品子分類不符')
  }),
  sell: yup
    .boolean()
    .required('商品上下架狀態必填'),
})

const { handleSubmit, isSubmitting, resetForm } = useForm({
  validationSchema: schema,
  initialValues: {
    name: '',
    price: 0,
    description: '',
    category: '',
    sell: false,
  }
})

const name = useField('name')
const price = useField('price')
const description = useField('description')
const sell = useField('sell')
const categoryMain = useField('category')
const categorySub = useField('subCategory')

const submit = handleSubmit(async (values) => {
  if (fileRecords.value[0]?.error) return

  if (dialog.value.id.length === 0 && fileRecords.value.length === 0) {
    createSnackbar({
      text: '商品圖片必填',
      snackbarProps: {
        color: 'red'
      }
    })
    return
  }

  try {
    const fd = new FormData()
    fd.append('name', values.name)
    fd.append('price', values.price)
    fd.append('description', values.description)
    fd.append('category', values.category)
    fd.append('sell', values.sell)

    if (fileRecords.value.length > 0) {
      fd.append('image', fileRecords.value[0].file)
    }

    if (dialog.value.id.length > 0) {
      await apiAuth.patch('/product/' + dialog.value.id, fd)
    } else {
      await apiAuth.post('/product', fd)
    }

    products.splice(0, products.length)
    getProducts()
    createSnackbar({
      text: dialog.value.id.length > 0 ? '商品編輯成功' : '商品新增成功',
      snackbarProps: {
        color: 'green'
      }
    })
    closeDialog()
  } catch (error) {
    console.log(error)
    createSnackbar({
      text: error?.response?.data?.message || '發生未知錯誤，請再試一次。',
      snackbarProps: {
        color: 'red'
      }
    })
  }
})
</script>

<route lang="yaml">
  meta:
    layout: admin
    login: true
    admin: true
    title: '商品管理'
</route>
