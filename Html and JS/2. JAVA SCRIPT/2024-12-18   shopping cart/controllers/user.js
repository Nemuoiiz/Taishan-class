import User from '../models/user.js'
import Product from '../models/product.js'
import validator from 'validator'
import { StatusCodes } from 'http-status-codes'

// 新增使用者
export const create = async (req, res) => {
  try {
    const user = await User.create(req.body)
    res.status(StatusCodes.OK).json({
      succese: true,
      message: '',
      result: user,
    })
  } catch (error) {
    console.log(error)
    if (error.name === 'MongoServerError' && error.code === 11000) {
      res.status(StatusCodes.CONFLICT).json({
        success: false,
        message: '帳號重複',
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
        message: '未知錯誤',
      })
    }
  }
}

// 加入購物車
export const cart = async (req, res) => {
  try {
    console.log(req.params)
    console.log(req.body)
    // 檢查網址指定的使用者 ID 格式
    if (!validator.isMongoId(req.params.id)) throw new Error('User ID')
    // 檢查商品的 ID 格式
    if (!validator.isMongoId(req.body.product)) throw new Error('PRODUCT ID')
    // 使用 .orFail 檢查商品是否存在
    await Product.findById(req.body.product).orFail(new Error('PRODUCT NOT FOUND'))

    // 取出指定使用者的資料 (使用者可能不存在，所以要加 .orFail)
    const user = await User.findById(req.params.id).orFail(new Error('USER NOT FOUND'))
    // 檢查指定商品是否在購物車 (資料型態為 ObjectId 需要加上.toString() 做轉換)
    const i = user.cart.findIndex((item) => item.product.toString() === req.body.product)
    if (i > -1) {
      // 在購物車，修改數量
      user.cart[i].quantity += req.body.quantity
      // 如果數量 <= 0，則移除
      if (user.cart[i].quantity <= 0) {
        user.cart.splice(i, 1)
      }
    } else if (req.body.quantity > 0) {
      // 不在購物車，且修改數量 > 0，則新增
      user.cart.push({
        product: req.body.product,
        quantity: req.body.quantity,
      })
    }
    // 保存
    await user.save()

    res.status(StatusCodes.OK).json({
      success: true,
      message: '',
    })
  } catch (error) {
    console.log(error)

    if (
      error.name === 'CastError' ||
      error.message === 'PRODUCT ID' ||
      error.message === 'USER ID'
    ) {
      res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: '資料格式錯誤',
      })
    } else if (error.message === 'PRODUCT NOT FOUND' || error.message === 'USER NOT FOUND') {
      res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: '找不到使用者或商品',
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
        message: '未知錯誤',
      })
    }
  }
}

// 用 id 取單筆使用者資料
export const getId = async (req, res) => {
  try {
    if (!validator.isMongoId(req.params.id)) throw new Error('USER ID')

    // 'email account'   ---> 只取 email 和 account
    // '-password'       ---> 除了 password 以外的欄位
    // '-password -cart' ---> 除了 password 和 cart 以外的欄位
    const user = await User.findById(req.params.id, '-cart -password')
      // 💡.populate()
      // 關聯 ref 指定的外部資料 (要去看 ref 寫在哪)
      // 屬於 mongoose 的功能，mongoDB 本身寫法太過困難
      .populate('cart.product', 'name price')
      .orFail(new Error('USER NOT FOUND'))

    res.status(StatusCodes.OK).json({
      succese: true,
      message: '',
      result: user,
    })
  } catch (error) {
    console.log(error)

    if (error.name === 'CastError' || error.message === 'USER ID') {
      res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: '資料格式錯誤',
      })
    } else if (error.message === 'USER NOT FOUND') {
      res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: '找不到使用者或商品',
      })
    } else {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: '未知錯誤',
      })
    }
  }
}
