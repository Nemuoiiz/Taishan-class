import Product from '../models/product.js'
import { StatusCodes } from 'http-status-codes'

export const create = async (req, res) => {
  try {
    const product = await Product.create(req.body)
    res.status(StatusCodes.OK).json({
      success: true,
      message: '',
      result: product,
    })
  } catch (error) {
    if (error.name === 'ValidationError') {
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

export const get = async (req, res) => {
  try {
    // const products = await Product.find()

    // category == 音樂 && price == 200
    // const products = await Product.find({
    //   category: '音樂',
    //   price: 200,
    // })

    // category == 手機 && price >= 50000
    // const products = await Product.find({
    //   category: '手機',
    //   price: {
    //     $gte: 50000,
    //   },
    // })

    // category == 音樂 || price >= 50000
    // const products = await Product.find({
    //   $or: [
    //     { category: '音樂' },
    //     {
    //       price: {
    //         $gte: 50000,
    //       },
    //     },
    //   ],
    // })

    // 搜尋 name 有包含 Phone 不分大小寫
    // const products = await Product.find({
    //   name: /Phone/i,
    // })

    // .sort({ 欄位: 順序 })
    // 1 = 小到大
    // -1 = 大到小
    // .limit() 限制資料筆數
    // .skip()  跳果幾筆資料
    // const products = await Product.find().sort({ price: -1, name: 1 }).limit(2).skip(4)

    console.log(req.query)
    const products = await Product.find().sort({
      [req.query.sortBy || 'createdAt']: req.query.sort * 1 || 1,
    })

    res.status(StatusCodes.OK).json({
      success: true,
      message: '',
      result: products,
    })
  } catch (error) {
    console.log(error)
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: '未知錯誤',
    })
  }
}