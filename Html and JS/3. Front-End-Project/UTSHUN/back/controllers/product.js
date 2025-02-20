import { StatusCodes } from 'http-status-codes'
import Product from '../models/product.js'
import validator from 'validator'

// 商品新增
export const create = async (req, res) => {
  // models > product.js
  try {
    // https://www.npmjs.com/package/multer-storage-cloudinary
    // req.file 會有三個資料可以取得：filename (檔案id)、path (檔案網址)、size
    req.body.image = req.file?.path || ''
    console.log('req.body', req.body)
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

// 取商品資料
// 1. 大家都看的到的商品頁 (沒有登入的人看的)
export const get = async (req, res) => {
  try {
    // sell: true 在架上的
    const result = await Product.find({ sell: true })
    res.status(StatusCodes.OK).json({
      success: true,
      message: '',
      result,
    })
  } catch (error) {
    console.log(error)
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: '伺服器錯誤',
    })
  }
}

// 2. 給管理員看的商品頁 (包含未上架)
export const getAll = async (req, res) => {
  try {
    // 上架未上架都要顯示
    const result = await Product.find()
    res.status(StatusCodes.OK).json({
      success: true,
      message: '',
      result,
    })
  } catch (error) {
    console.log(error)
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: '伺服器錯誤',
    })
  }
}

// 3. 單個商品頁面，沒有登入也可以看
export const getId = async (req, res) => {
  try {
    // 驗證不是該 isMogoId 就拋錯誤
    if (!validator.isMongoId(req.params.id)) throw new Error('ID')

    const result = await Product.findById(req.params.id).orFail(new Error('NOT FOUND'))
    // 有 id 就回傳狀態碼
    res.status(StatusCodes.OK).json({
      success: true,
      message: '',
      result,
    })
  } catch (error) {
    console.log('controller product getId', error)
    if (error.name === 'CastError' || error.message === 'ID') {
      res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: '商品 ID 錯誤',
      })
    } else if (error.message === 'NOT FOUND') {
      res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: '查無商品',
      })
    } else {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: '伺服器錯誤',
      })
    }
  }
}

// 4. 編輯商品
export const edit = async (req, res) => {
  try {
    // 驗證商品 id
    if (!validator.isMongoId(req.params.id)) throw new Error('ID')

    // 不用加 || '' ，不然商品圖片會變成空的文字，造成編輯錯誤
    req.body.image = req.file?.path

    const result = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        category: {
          main: req.body['category.main'],
          sub: req.body['category.sub'],
        },
        sell: req.body.sell,
        used: req.body.used,
        usedNote: req.body.usedNote,
      },
      {
        runValidators: true,
        // 回傳新東西
        new: true,
      },
    ).orFail(new Error('NOT FOUND'))

    res.status(StatusCodes.OK).json({
      success: true,
      message: '',
      result,
    })
  } catch (error) {
    console.log('controller product edit', error)
    if (error.name === 'CastError' || error.message === 'ID') {
      res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        // productIdInvalid
        message: '商品 ID 錯誤',
      })
    } else if (error.message === 'NOT FOUND') {
      res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        // productNotFound
        message: '查無商品',
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
