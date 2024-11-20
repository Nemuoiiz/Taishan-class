// 引入
import axios from 'axios'

// 匯出 function
export default async event => {
  try {
    // 串匯率資料
    const { data } = await axios.get('https://tw.rter.info/capi.php')
    // event.reply 是 promise
    // 匯率資料類別為數字，要使用 toString() 轉為字串
    const result = await event.reply(data.USDTWD.Exrate.toString())
    console.log(result)
  } catch (error) {
    console.error(error)
  }
}
