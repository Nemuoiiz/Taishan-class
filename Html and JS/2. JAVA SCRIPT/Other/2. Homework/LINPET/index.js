// 讀取 env 檔內容
import 'dotenv/config'
// 引用 linebot
import linebot from 'linebot'
import commandCity from './commands/qrCity.js'
import commandShelter from './commands/qrShelter.js'

// 設定並建立機器人
const bot = linebot({
  channelId: process.env.CHANNEL_ID,
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
})

// 處理收到的訊息
bot.on('message', (event) => {
  if (event.message.type === 'text') {
    if (event.message.text === '我要認養') {
      commandCity(event)
    } else if (event.message.text === '3:NewTaipei') {
      commandShelter(event)
    }
  }
})

// 設定機器人監聽路徑和 port
bot.listen('/', process.env.PORT || 3000, () => {
  console.log('寵物認養機器人啟動')
})
