// 本體
import 'dotenv/config'
import express from 'express'
import mongoose from 'mongoose'
import { StatusCodes } from 'http-status-codes'
// 引入路由
import routerUser from './routers/user.js'
import routerProduct from './routers/product.js'
import routerOrder from './routers/order.js'
// 引入登入驗證檔案
import './passport.js'
// 引入 cors 處理跨網域的請求
import cors from 'cors'

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log('資料庫連線成功')
    // 啟用'查詢過濾器的消毒功能'
    // 若傳入的查詢條件可能包含一些特別的操作符，例如 $gt(大於)、$lt(小於) 等
    // 惡意用戶可能利用這些操作符進行 NoSQL 注入攻擊，實現未授權的數據訪問或操作
    mongoose.set('sanitizeFilter', true)
  })
  .catch((error) => {
    console.log('資料庫連線失敗')
    console.log(error)
  })

const app = express()

// 跨域全開 (最簡單的寫法)
app.use(cors())

app.use(express.json())
app.use((error, req, res, next) => {
  res.status(StatusCodes.BAD_REQUEST).json({
    success: false,
    message: '請求格式錯誤',
  })
})

// 路由
app.use('/user', routerUser)
app.use('/product', routerProduct)
app.use('/order', routerOrder)

// 連接埠
app.listen(process.env.PORT || 4000, () => {
  console.log('伺服器啟動')
})
