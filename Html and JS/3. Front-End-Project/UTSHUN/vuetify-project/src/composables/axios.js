import axios from "axios"

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

// 匯出給其他地方使用
export const useAxios = () => {
  return { api }
}
