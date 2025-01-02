import 'dotenv/config'
import linebot from 'linebot'
import fetchData from './commands/fetchData.js'
import replyCard from './commands/replyCard.js'
import fs from 'fs'
import path from 'path'

// 設定並建立機器人
const bot = linebot({
  channelId: process.env.CHANNEL_ID,
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
})

// 確保 dump 資料夾存在
const dumpFolderPath = './dump'
if (!fs.existsSync(dumpFolderPath)) {
  fs.mkdirSync(dumpFolderPath)
}

// 處理收到的訊息
bot.on('message', async (event) => {
  if (event.message.type === 'text') {
    const userMessage = event.message.text
    if (userMessage === '我要認養') {
      event.reply({
        type: 'text',
        text: '請選擇動物類型：',
        quickReply: {
          items: [
            { type: 'action', action: { type: 'message', label: '貓', text: '查詢貓' } },
            { type: 'action', action: { type: 'message', label: '狗', text: '查詢狗' } }
          ]
        }
      })
    } else if (userMessage === '查詢貓' || userMessage === '查詢狗') {
      const animalType = userMessage === '查詢貓' ? '貓' : '狗'
      const shelters = ['48', '49', '50', '51', '53', '55', '56', '58', '59', '61', '62', '63', '78', '92'] // shelter_pkid
      const data = await fetchData(animalType, shelters)

      if (data.length > 0) {
        const flexMessages = data.map(replyCard) // 建立卡片訊息

        // 檢查是否啟用 DEBUG 模式
        if (process.env.DEBUG === 'true') {
          // 在 DEBUG 模式下，將結果寫入 dump/fe.json
          fs.writeFileSync(
            path.join(dumpFolderPath, 'fe.json'),
            JSON.stringify(flexMessages, null, 2) // 格式化為 JSON 格式並縮排 2 個空格
          )
        }

        event.reply({ type: 'flex', altText: `查詢${animalType}結果`, contents: { type: 'carousel', contents: flexMessages } })
      } else {
        event.reply('查無資料，請稍後再試。')
      }
    }
  }
})

// 設定機器人監聽路徑和 port
bot.listen('/', process.env.PORT || 3000, () => {
  console.log('寵物認養機器人啟動')
})
