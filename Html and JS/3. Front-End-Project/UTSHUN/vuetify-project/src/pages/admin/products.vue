<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1 class="text-center">商品管理</h1>
      </v-col>

      <v-divider></v-divider>

      <v-col cols="12">
        <v-data-table :items="products" :headers="headers" :search="search">

          <!-- 插槽 v-slot 簡寫為 #  -->
          <template #top>
            <v-toolbar>
              <!-- 點新增按鈕沒有資料所以是 null -->
              <v-btn @click="openDialog(null)">新增商品</v-btn>
              <v-spacer></v-spacer>
              <v-col cols="3">
                <v-text-field
                  v-model="search"
                  density="compact"
                  label="Search"
                  prepend-inner-icon="mdi-magnify"
                  variant="solo-filled"
                  flat
                  hide-details
                  single-line
                ></v-text-field>
              </v-col>
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
            {{ value.main }} - {{ value.sub }}
          </template>
          <template #[`item.used`]="{ value }">
            <v-icon v-if="value" icon="mdi-new-box"></v-icon>
            <v-icon v-else icon="mdi-bandage"></v-icon>
          </template>
          <!-- 編輯用的虛擬欄位 -->
          <template #[`item.edit`]="{ item }">
            <!-- 修改商品會有舊資料，把 item 資料放入 function 內 -->
            <v-btn icon="mdi-pencil" variant="text" @click="openDialog(item)"></v-btn>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>

  <!-- 新增商品的對話窗 -->
  <v-dialog v-model="dialog.open" persistent="">
    <v-form :disabled="isSubmitting" @submit.prevent="submit">
      <v-card>
        <!-- 標題 -->
        <v-card-title>{{ dialog.id ? '編輯商品' : '新增商品' }}</v-card-title>
        <!-- 表單輸入欄位 -->
        <v-card-text>
          <v-text-field
            v-model="name.value.value"
            label="商品名稱"
            :error-messages="name.errorMessage.value"
          ></v-text-field>

          <v-text-field
            v-model="price.value.value"
            label="商品價格"
            :error-messages="price.errorMessage.value"
            type="number" min="0"
          ></v-text-field>

          <!-- 選單 -->
          <v-select
            v-model="category.value.value"
            :error-messages="category.errorMessage.value"
            :items="categoryOptions"
            label="商品主分類"
            item-title="text"
            item-value="value"
            @update:model-value="onCategoryUpdate(true)"
          ></v-select>

          <v-select
            v-model="subcategory.value.value"
            :error-messages="subcategory.errorMessage.value"
            :items="filteredSubcategories"
            label="商品子分類"
            item-title="text"
            item-value="value"
            :disabled="filteredSubcategories.length === 0"
          />

          <v-checkbox
            v-model="sell.value.value"
            label="販售狀態"
            :error-messages="sell.errorMessage.value"
          ></v-checkbox>

          <v-checkbox
            v-model="used.value.value"
            label="是否為新品"
            :error-messages="used.errorMessage.value"
          ></v-checkbox>

          <v-textarea
            v-model="description.value.value"
            label="商品說明"
            :error-messages="description.errorMessage.value"
          ></v-textarea>

          <v-textarea
            v-model="usedNote.value.value"
            label="二手情形說明"
            :error-messages="usedNote.errorMessage.value"
          ></v-textarea>

          <!-- vue-file-agent 上傳圖檔 -->
          <!-- accept 限定支援的檔案．deletable 可刪除．max-size 最大尺寸 -->
          <VueFileAgent
            ref="fileAgent" v-model="fileRecords"
            v-model:raw-model-value="rawFileRecords"
            accept="image/jpeg,image/png"
            deletable
            max-size="1MB"
            help-text="點擊或拖曳檔案至此"
            :error-text="{ type: '檔案類型錯誤', size: '檔案尺寸超過 1MB' }"
            ></VueFileAgent>
        </v-card-text>

        <!-- 動作按鈕 -->
        <v-card-actions>
          <v-btn @click="closeDialog">取消</v-btn>
          <v-btn type="submit" :loading="isSubmitting">確認</v-btn>
        </v-card-actions>

      </v-card>
    </v-form>
  </v-dialog>
</template>

<script setup>
import { useAxios } from '@/composables/axios'
import { reactive, computed, ref } from 'vue'
import { useSnackbar } from 'vuetify-use-dialog'
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'

// use
const { apiAuth } = useAxios()
const createSnackbar = useSnackbar()

// 商品
const products = reactive([])
const search = ref('')
const headers = [
  // 後端資料回的 key
  { title: 'ID', key: '_id', sortable: true },
  { title: '圖片', key: 'image', sortable: false },
  { title: '名稱', key: 'name', sortable: true },
  { title: '類別', key: 'category', sortable: true },
  { title: '售價', key: 'price', sortable: true },
  { title: '說明', key: 'description', sortable: false },
  { title: '新舊狀態', key: 'used', sortable: true },
  { title: '二手情形說明', key: 'usedNote', sortable: false },
  { title: '販售狀態', key: 'sell', sortable: true },
  { title: '建立時間', key: 'createdAt', sortable: true },
  { title: '更新時間', key: 'updatedAt', sortable: true },
    // 編輯 (虛擬欄位)，key 可以設一個不存在的名稱
  { title: '編輯商品', key: 'edit', sortable: false },
]

const getProducts = async () => {
  try {
    const { data } = await apiAuth.get('/product/all')
    products.push(...data.result)
  } catch (error) {
    console.log(error)
    createSnackbar({
      text: error?.response?.data?.message || '發生未知錯誤',
      snackbarProps: { color: 'red' }
    })
  }
}
getProducts()

// 新增商品的對話框
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
    category.value.value = item.category.main // 確保 category 是字串
    subcategory.value.value = item.category.sub // 確保 subcategory 是字串
    used.value.value = item.used
    usedNote.value.value = item.usedNote
    sell.value.value = item.sell
  } else {
    // 重設分類選項
    category.value.value = ''
    subcategory.value.value = ''
  }
  onCategoryUpdate()
  dialog.value.open = true
}

// 關閉編輯對話框
const closeDialog = () => {
  // 重設表單
  resetForm()
  dialog.value.id = ''
  dialog.value.open = false
  fileAgent.value.deleteFileRecord()
  // 重設分類選項
  category.value.value = ''
  subcategory.value.value = ''
}


// **商品分類資料**
const categoryOptions = ref([
  { text: '臉部彩妝', value: '臉部彩妝', subcategories: ['粉底', '修容', '打亮', '腮紅'] },
  { text: '眼部彩妝', value: '眼部彩妝', subcategories: ['眼彩', '眉彩'] },
  { text: '唇部彩妝', value: '唇部彩妝', subcategories: [] },
  { text: '日常保養', value: '日常保養', subcategories: ['保養品', '乳液乳霜', '面膜', '化妝水'] },
  { text: '臉部清潔', value: '臉部清潔', subcategories: ['卸妝品', '洗面乳'] },
  { text: '上妝用具', value: '上妝用具', subcategories: ['刷具', '粉底刮刀', '美妝蛋'] }
])


// **計算對應的子分類選項**
const filteredSubcategories = ref([])

// **表單驗證 Schema**
const schema = computed(() =>
  yup.object({
    name: yup
      .string()
      .required('商品名稱必填'),
    price: yup
      .number()
      .typeError('商品價格必填')
      .required('商品價格必填')
      .min(0, '價格區間不符'),
    description: yup
      .string()
      .required('商品說明必填'),
    category: yup
      .string()
      .required('請選擇主分類')
      .oneOf(categoryOptions.value.map(c => c.value), '分類不存在'),
    subcategory: yup
      .string()
      .test('subcategory', '請選擇子分類', function (value) {
        const category = categoryOptions.value.find(c => c.value === this.parent.category)
        if (!category) return false
        if (this.parent.category === '唇部彩妝') return true
        return category.subcategories.includes(value)
      }),
    sell: yup
      .boolean()
      .required('販售狀態必填'),
    used: yup
      .boolean()
      .required('二手狀態必填'),
    usedNote: yup
      .string()
      .nullable(),
  })
)

// **建立表單**
const { handleSubmit, isSubmitting, resetForm } = useForm({
  validationSchema: schema,
  initialValues: {
    name: '',
    price: null, // 避免使用者沒改變就變成 0
    category: '',
    subcategory: '', // 記得加上子分類，避免 undefined
    sell: false,
    used: false,
    description: '',
    usedNote: '',
  }
})

// **表單欄位**
const name = useField('name')
const price = useField('price')
const description = useField('description')
const category = useField('category')
const subcategory = useField('subcategory')
const used = useField('used')
const usedNote = useField('usedNote')
const sell = useField('sell')

const fileAgent = ref(null)
const fileRecords = ref([])
const rawFileRecords = ref([])

const onCategoryUpdate = (reset = false) => {
  const selectedCategory = categoryOptions.value.find(c => c.value === category.value.value)
  filteredSubcategories.value = selectedCategory ? selectedCategory.subcategories : []
  if (reset) {
    subcategory.resetField()
  }
}

// 新增、編輯的提交
const submit = handleSubmit(async (values) => {
  console.log('handleSubmit的地方')
  // 先檢查有沒有錯誤
  if (fileRecords.value[0]?.error) return
  // 做新增但沒有選圖的話也 return
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
    // fd.append(key, value)
    fd.append('name', values.name)
    fd.append('price', values.price)
    fd.append('description', values.description)
    fd.append('category.main', values.category)
    fd.append('category.sub', values.subcategory)
    fd.append('sell', values.sell)
    fd.append('used', values.used)
    fd.append('usedNote', values.usedNote)

    if (fileRecords.value.length > 0) {
      fd.append('image', fileRecords.value[0].file)
    }

    // fileRecords 的長度大於 0 (如果有檔案)
    // 就加入 fileRecords 陣列內
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
      text: error?.response?.data?.message || '發生未知錯誤',
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
