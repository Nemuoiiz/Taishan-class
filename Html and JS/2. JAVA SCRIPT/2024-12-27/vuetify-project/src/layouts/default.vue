<template>
  <v-app-bar>
    <v-container class="d-flex align-center">
      <!-- :active="false" 關閉連結 -->
      <v-btn to="/" :active="false">購物網站</v-btn>
      <v-spacer/>
      <!-- v-for、v-if 不能同時出現，因此使用 template 包住 -->
      <template v-for="nav of navs" :key="nav.to">
        <v-btn v-if="nav.show" :to="nav.to" :prepend-icon="nav.icon">
          {{ nav.text }}
          <!-- 購物車的數量顯示：https://vuetifyjs.com/en/components/badges -->
          <v-badge v-if="nav.to === '/cart'" :content="user.cart" floating color="red"></v-badge>
        </v-btn>
      </template>
      <!-- 登入 -->
      <v-btn v-if="user.isLoggedIn" prepend-icon="mdi-account-arrow-right" @click="logout">{{ $t('nav.logout') }}</v-btn>
      <!-- 語系切換 -->
      <v-menu>
        <template #activator="{ props }">
          <v-btn v-bind="props">
            <!-- 包 v-icon 才會是方形圖案，不包直接寫在 v-btn 則是圓形 -->
            <v-icon icon="mdi-translate"></v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="lang in langs" :key="lang.value"
            @click="$i18n.locale = lang.value"
          >
            {{ lang.text }}
          </v-list-item>
        </v-list>
      </v-menu>
    </v-container>
  </v-app-bar>
  <!-- 補 v-main、router-view 才看的到頁面內容 -->
  <v-main>
    <router-view></router-view>
  </v-main>
</template>

<script setup>
// 導覽列文字是動態的，因此需使用 computed
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useUserStore } from '@/stores/user'
import { useAxios } from '@/composables/axios'
import { useSnackbar } from 'vuetify-use-dialog'
import { useRouter } from 'vue-router'

const { t } = useI18n()
const user = useUserStore()
const { apiAuth } = useAxios()
const createSnackbar = useSnackbar()
const router = useRouter()

// 導覽列項目
const navs = computed(() => {
  return [
    // 使用 text: t() 去接 zhHant.js 的 export default 內容
    { to: '/register', text: t('nav.register'), icon: 'mdi-account-plus', show: !user.isLoggedIn },
    { to: '/login', text: t('nav.login'), icon: 'mdi-account-arrow-left', show: !user.isLoggedIn },
    { to: '/cart', text: t('nav.cart'), icon: 'mdi-cart', show: user.isLoggedIn },
    { to: '/orders', text: t('nav.orders'), icon: 'mdi-format-list-bulleted', show: user.isLoggedIn },
    { to: '/admin', text: t('nav.admin'), icon: 'mdi-cog', show: user.isLoggedIn && user.isAdmin },
    ]
})

// 多語言
const langs = [
  { text: '繁體中文', value: 'zhHant' },
  { text: 'English', value: 'en' },
]

const logout = async () => {
  try {
    await apiAuth.delete('/user/logout')
  } catch (error) {
    console.log(error)
  }
  user.logout()
  createSnackbar({
    text: t('logout.success'),
    snackbarProps: {
      color: 'green'
    }
  })
  // 在購物車頁面登出後回首頁
  router.push('/')
}
</script>
