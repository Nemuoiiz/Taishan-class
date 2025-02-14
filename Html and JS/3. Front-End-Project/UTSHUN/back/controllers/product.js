import { StatusCodes } from 'http-status-codes'
import Product from '../models/product.js'

// 商品新增
export const create = async (req, res) => {
  // models > product.js
  try {
    // https://www.npmjs.com/package/multer-storage-cloudinary
    // req.file 會有三個資料可以取得：filename (檔案id)、path (檔案網址)、size
    req.body.image = req.file?.path || ''
    const result = await Product.create(req.body)
    res.status(StatusCodes.OK).json({
      success: true,
      message: '',
      result,
    })
  } catch (error) {
    console.log(error)
    // Mongoose 的驗證錯誤名稱是 'ValidationError'，不需要翻譯！
    if (error.name === 'ValidationError') {
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
