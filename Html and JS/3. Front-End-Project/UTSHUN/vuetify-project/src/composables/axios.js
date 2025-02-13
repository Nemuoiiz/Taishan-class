import axios from "axios"
import { useUserStore } from "@/stores/user"

// https://zh-hk.vuejs.org/guide/reusability/composables
// baseURL 的功用在於可以更加簡寫網址 (組合式)：
// baseURL 有設定的情況🔻
// 1️⃣ baseURL = http://localhost:4000
// axios.post('/user')
// axios.post('/user/login')
// ==============
// baseURL 沒有設定的情況🔻
// 2️⃣
// axios.post('http://localhost:4000/user')
// axios.post('http://localhost:4000/user/login')


// 把原有的 axios 複製一份新的設定檔案
const api = axios.create({
  baseURL: import.meta.env.VITE_API
})

const apiAuth = axios.create({
  baseURL: import.meta.env.VITE_API
})
// 🔻 aixios 攔截器 (幫助自動補上 jwt 後送出)
// 1. axios.get() / axios.post()
// 2. interceptors.request(config 代表請求設定 => {})
// 3. 送出
// 4. interceptors.response(成功處理, 失敗處理)
// 5. .then().catch()
apiAuth.interceptors.request.use(config => {
  const user = useUserStore()
  // 💡 'Bearer ' 一定要加空格！
  config.headers.Authorization = 'Bearer ' + user.token
  return config
})

// res => res 成功時直接送出回應
apiAuth.interceptors.response.use(res => res, async error => {
  // 判斷失敗有沒有收到回應
  // 沒收到回應時可能是網路問題
  // 有收到才需要處理
  if (error.response) {
    // 是登入過期，而且請求登入設定的網址不是舊換新(/user/refresh)
    if (error.response.data.message === '登入過期' && error.config.url !== '/user/refresh') {
      const user = useUserStore()
      try {
        // 傳送舊換新請求
        const { data } = await apiAuth.patch('/user/refresh')
        // 更新 store 的 token
        user.token = data.result
        // 修改發生錯誤的請求設定，換成新的 token
        error.config.headers.Authorization = 'Bearer ' + user.token
        // 用新的設定重新傳送一次原本的請求
        return axios(error.config)
      } catch (error) {
        console.log(error)
        // 舊換新錯誤，登出
        user.logout()
      }
    }
  }
  // 回傳原本的錯誤
  return Promise.reject(error)
})

// 匯出給其他地方使用
export const useAxios = () => {
  return { api, apiAuth }
}
