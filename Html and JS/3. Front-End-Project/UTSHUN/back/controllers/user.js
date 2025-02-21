import User from '../models/user.js'
import Product from '../models/product.js'
import { StatusCodes } from 'http-status-codes'
import jwt from 'jsonwebtoken'
import validator from 'validator'

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
        message: '使用者帳號重複',
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
        message: '伺服器錯誤',
      })
    }
  }
}

export const login = async (req, res) => {
  try {
    // jwt.sign(儲存資料, SECRET密鑰, 設定)
    // jwt 可以使用 base64 破解，因此不要放密碼
    // req.user => auth.js > login 存入的資料
    const token = jwt.sign({ _id: req.user._id }, process.env.JWT_SECRET, { expiresIn: '7 days' })
    req.user.tokens.push(token)
    await req.user.save()
    res.status(StatusCodes.OK).json({
      success: true,
      message: '',
      // 回給前端會使用到的資訊
      result: {
        token, // token
        account: req.user.account, // 帳號
        role: req.user.role, // 是否為管理員
        cart: req.user.cartQuantity, // 購物車
      },
    })
  } catch (error) {
    console.log(error)
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: '伺服器錯誤',
    })
  }
}

export const profile = async (req, res) => {
  res.status(StatusCodes.OK).json({
    success: true,
    message: '',
    result: {
      account: req.user.account,
      role: req.user.role,
      cart: req.user.cartQuantity,
    },
  })
}

// token 舊換新來延長驗證通過資格
export const refresh = async (req, res) => {
  try {
    // 以使用者的 token 去找索引，來看看有沒有請求的 token
    const idx = req.user.tokens.findIndex((token) => token === req.token)
    // 再簽一組新的 token
    const token = jwt.sign({ _id: req.user._id }, process.env.JWT_SECRET, { expiresIn: '7 days' })
    // 新的直接換掉舊的
    req.user.tokens[idx] = token
    await req.user.save()
    res.status(StatusCodes.OK).json({
      success: true,
      message: '',
      // 新的 token
      result: token,
    })
  } catch (error) {
    console.log(error)
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: '伺服器錯誤',
    })
  }
}

// 登出後把 token 刪除
export const logout = async (req, res) => {
  try {
    // 找索引
    const idx = req.user.tokens.findIndex((token) => token === req.token)
    // 從索引開始刪除一個 token
    req.user.tokens.splice(idx, 1)
    // 刪除後保存狀態
    await req.user.save()
    res.status(StatusCodes.OK).json({
      success: true,
      message: '',
      // 登出不需要回復 result
    })
  } catch (error) {
    console.log(error)
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: '伺服器錯誤',
    })
  }
}

// 取購物車 (getCart 函式)
// 1. 從資料庫中查詢指定用戶的購物車資訊
// 2. 使用 .populate() 方法填充購物車中的產品詳細資訊（關聯查詢）
// 3. 將結果以 JSON 格式回應給前端
export const getCart = async (req, res) => {
  try {
    // .populate() 進行關聯查詢，可以輕鬆地將關聯的資料一起拉出
    const result = await User.findById(req.user._id, 'cart').populate('cart.product')
    res.status(StatusCodes.OK).json({
      success: true,
      message: '',
      result: result.cart,
    })
  } catch (error) {
    console.log(error)
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: '伺服器錯誤',
    })
  }
}

// 把東西放回購物車
export const updateCart = async (req, res) => {
  try {
    // 檢查傳入的商品 ID 格式
    if (!validator.isMongoId(req.body.product)) throw new Error('ID')
    // 檢查購物車內有沒有商品
    const idx = req.user.cart.findIndex((item) => item.product.toString() === req.body.product)
    if (idx > -1) {
      // 有商品，修改數量
      const quantity = req.user.cart[idx].quantity + parseInt(req.body.quantity)
      // 修改後大於 0，修改數量
      if (quantity > 0) {
        req.user.cart[idx].quantity = quantity
      } else {
        // 修改後小於等於 0，刪除商品
        req.user.cart.splice(idx, 1)
      }
    } else {
      // 沒有商品，檢查商品是否存在
      const product = await Product.findById(req.body.product).orFail(new Error('NOT FOUND'))
      // 商品沒有上架，錯誤
      if (!product.sell) throw new Error('SELL')

      req.user.cart.push({ product: req.body.product, quantity: req.body.quantity })
    }

    await req.user.save()

    res.status(StatusCodes.OK).json({
      success: true,
      message: '',
      result: req.user.cartQuantity,
    })
  } catch (error) {
    console.log(error)
    if (error.name === 'CastError' || error.message === 'ID') {
      res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        // productIdInvalid
        message: '商品 ID 錯誤',
      })
    } else if (error.message === 'NOT FOUND') {
      res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        // productNotFound
        message: '查無商品',
      })
    } else if (error.message === 'SELL') {
      res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        // productNotOnSell
        message: '商品未上架',
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
        // serverError
        message: '伺服器錯誤',
      })
    }
  }
}
