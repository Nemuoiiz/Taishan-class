// 讀取 env 檔內容
import 'dotenv/config'
// 引用 line 機器人
import linebot from 'linebot'

const bot = linebot({
  // MSLint 的規範關係，只能空兩格
  channelId: process.env.CHANNEL_ID,
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
})

bot.on('message', async (event) => {
  // 🔻機器人回覆使用者相同文字訊息
  if (event.message.type !== 'text') return
  try {
    // event.replay 是 promise
    const result = await event.reply(event.message.text)
    console.log(result)
  } catch (error) {
    console.log(error)
  }

  // 🔻終端機顯示觸發事件
  // console.log(event)

  // 🔻機器人回應圖片
  // event.reply({
  //   type: 'image',
  //   originalContentUrl: 'https://cafe24img.poxo.com/dinotaeng/web/product/tiny/stories_2.jpg',
  //   previewImageUrl: 'https://cafe24img.poxo.com/dinotaeng/web/product/tiny/stories_2.jpg'
  // })
})

// 設定機器人監聽路徑和 port
bot.listen('/', process.env.PORT || 3000, () => {
  // 動到 .env 檔要重開 => ctrl + c 終止機器人
  console.log('機器人啟動')
})
