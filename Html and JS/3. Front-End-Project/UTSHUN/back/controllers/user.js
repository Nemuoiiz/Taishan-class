import User from '../models/user.js'
import { StatusCodes } from 'http-status-codes'

// 處理使用者註冊（創建帳號）的 controller 函式
// 1. 接收前端送來的請求（包含使用者的註冊資訊）
// 2. 嘗試將資料寫入 MongoDB
// 3. 根據成功或失敗回應不同的 HTTP 狀態碼與訊息
export const create = async (req, res) => {
  try {
    await User.create(req.body)
    res.status(StatusCodes.OK).json({
      success: true,
      message: '',
    })
  } catch (error) {
    console.log(error)
    if (error.name === 'MongoServerError' && error.code === 11000) {
      res.status(StatusCodes.CONFLICT).json({
        success: false,
        message: 'userAccountDuplicate',
      })
    } else if (error.name === 'ValidationError') {
      const key = Object.keys(error.errors)[0]
      res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: error.errors[key].message,
      })
    } else {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'serverError',
      })
    }
  }
}
