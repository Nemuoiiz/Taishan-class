import 'dotenv/config'
import linebot from 'linebot'
import fetchData from './commands/fetchData.js'
import replyCard from './commands/replyCard.js'

// 設定並建立機器人
const bot = linebot({
  channelId: process.env.CHANNEL_ID,
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
})

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
            {
              type: 'action',
              action: { type: 'message', label: '貓', text: '查詢貓' }
            },
            {
              type: 'action',
              action: { type: 'message', label: '狗', text: '查詢狗' }
            }
          ]
        }
      })
    } else if (userMessage === '查詢貓' || userMessage === '查詢狗') {
      const animalType = userMessage === '查詢貓' ? '貓' : '狗'
      const shelters = ['63', '62'] // 新竹市 & 新竹縣的 shelter_pkid
      const data = await fetchData(animalType, shelters)

      if (data.length > 0) {
        const flexMessages = data.map(replyCard) // 建立卡片訊息
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
