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
    // 🔻 搜尋特定類別的同金額
    // category == 音樂 && price == 200
    // const products = await Product.find({
    //   category: '音樂',
    //   price: 450,
    // })

    // 🔻 $gte => 大於，搜尋特定類別的某段價格範圍 (price >= 500)
    // const products = await Product.find({
    //   category: '音樂',
    //   price: {
    //     $gte: 400,
    //   },
    // })

    // 🔻 $or => category == 遊戲 || price >= 1000
    // const products = await Product.find({
    //   $or: [
    //     { category: '遊戲' },
    //     {
    //       price: {
    //         $gte: 1000,
    //       },
    //     },
    //   ],
    // })

    // 🔻 搜尋 name 有包含 '連帽' (英文不分大小寫)
    // const products = await Product.find({
    //   name: /連帽/i,
    // })

    // 🔻 .find() 可搜尋所有
    // .sort({ 欄位: 順序 }) ( 1 => 小到大 | -1 => 大到小)
    // .limit() => 限制資料筆數，只取 number 筆資料
    // .skip()  => 跳過資料筆數，跳過 number 筆資料
    // const products = await Product.find().sort({ price: 1; name: 1 }).limit(2).skip(3)

    console.log(req.query)
    const products = await Product.find().sort({
      // query 收到的是文字，要 *1 轉數字，沒有收到的話直接給 1
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
