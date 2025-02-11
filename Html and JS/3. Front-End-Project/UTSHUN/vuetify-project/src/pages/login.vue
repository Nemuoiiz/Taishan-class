<!-- 帳號登入頁面 -->
<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12">
        <h1 class="text-center">登入帳號</h1>
      </v-col>

      <v-divider></v-divider>

      <v-col cols="6">
        <!-- 表單 -->
        <!-- :disabled="isSubmitting" 送出時停止送出鈕 -->
        <v-form :disabled="isSubmitting" @submit.prevent="submit">
          <v-text-field
            v-model="account.value.value"
            :error-messages="account.errorMessage.value"
            label="帳號"
            minlength="4" maxlength="20"
            counter
          />

          <!-- 密碼 -->
          <v-text-field
            v-model="password.value.value"
            type="password"
            :error-messages="password.errorMessage.value"
            label="密碼"
            minlength="4" maxlength="20" counter
          />

            <!-- btn 的 display 為 inline，不可直接下 tac -->
            <div class="text-center">
              <!-- :loading="isSumbmitting" 如果送出中就顯示 loading -->
              <v-btn :loading="isSubmitting" type="submit" color="primary">登入</v-btn>
            </div>
          </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>


<script setup>
  import { useForm, useField } from 'vee-validate'
  import * as yup from 'yup'
  import validator from 'validator'
  import { useAxios } from '@/composables/axios'
  import { useSnackbar } from 'vuetify-use-dialog'
  import { useRouter } from 'vue-router'
  import { useUserStore } from '@/stores/user'

const { api } = useAxios()
const createSnackbar = useSnackbar()
const router = useRouter()
const user = useUserStore()

  // 使用 yup 執行物件的驗證
  const schema = yup.object({
    // 驗證規則要寫的跟後端寫 model 一樣
    // 🔻帳號：文字、必填、最小值4、最大值20、判斷是否為英數字
    account: yup
      // 資料型態需為文字
      .string()
      // 必填
      .required('帳號必填')
      // 最短長度
      .min(4,'帳號長度不足')
      // 最長長度
      .max(20, '帳號長度超出限制')
      //  自訂驗證(自訂驗證名稱, 錯誤訊息, function)
      .test(
        'isAlphanumeric', '帳號格式不符',
      value => validator.isAlphanumeric(value))
    ,

    // 🔻 密碼
    password: yup
      .string()
      .required('密碼必填')
      .min(4, '密碼長度不足')
      .max(20, '密碼長度超出限制'),
  })

  // 💡 一定要先建立 From 再建立 Field，順序不可變動
  // 🔻 建立表單
  // handleSubmit => 讓 vee-validate 的表單去送出
  // isSubmitting => 判斷表單是否在送出中
  const { handleSubmit, isSubmitting } = useForm({
    validationSchema: schema
  })

  // 🔻 建立欄位
  // 要跟 account: yup 設定的名稱一樣
  const account = useField('account')
  const password = useField('password')

// 驗證是否表單內容都 OK，確認完成後才會執行 function
const submit = handleSubmit(async (values) => {
  try {
    // axios 的東西會在 data 內
    const { data } = await api.post('/user/login', {
      account: values.account,
      password: values.password
    })
    user.login(data.result)
    createSnackbar({
      text: '登入成功',
      snackbarProps: {
        color: 'green'
      }
    })
    router.push('/')
  }catch (error) {
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
