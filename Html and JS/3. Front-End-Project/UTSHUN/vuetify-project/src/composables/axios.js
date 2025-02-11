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

// 匯出給其他地方使用
export const useAxios = () => {
  return { api, apiAuth }
}
