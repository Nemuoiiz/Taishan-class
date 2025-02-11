import { Schema, model, ObjectId, Error } from 'mongoose' // 資料庫資料引用
import validator from 'validator' // 驗證信箱
import bcrypt from 'bcrypt' // 密碼驗證
import UserRole from '../enums/UserRole.js'

// 購物車
const cartSchema = new Schema({
  // 產品
  product: {
    type: ObjectId,
    ref: 'products',
    // 使用者購物車商品必填
    required: [true, 'userCartProductRequired'],
  },
  // 數量
  quantity: {
    type: Number,
    // 使用者購物車數量必填
    required: [true, 'userCartQuantityRequired'],
    // 使用者購物車數量不足
    min: [1, 'userCartQuantityTooSmall'],
  },
})

// 存放資料
const schema = new Schema(
  {
    // 帳號
    account: {
      type: String,
      required: [true, '帳號必填'],
      minlength: [4, '帳號長度不足'],
      maxlength: [20, '帳號長度超出限制'],
      unique: true,
      // 格式驗證
      validate: {
        validator(value) {
          // .isAlphanumeric() 判斷是否為英數字
          return validator.isAlphanumeric(value)
        },
        message: '帳號格式不符',
      },
    },
    // 密碼
    password: {
      type: String,
      // 只要求必填
      // 加密後密碼可能長度不一，故需以其他方式驗證長度
      required: [true, '密碼必填'],
    },
    // 信箱
    email: {
      type: String,
      required: [true, '信箱必填'],
      unique: true,
      validate: {
        validator(value) {
          return validator.isEmail(value)
        },
        // email 格式不對
        message: '信箱格式不符',
      },
    },
    // 保存 jwt
    tokens: {
      // 型態為文字陣列
      // default: [],
      type: [String],
    },
    // 帳號角色
    role: {
      type: Number,
      default: UserRole.USER,
    },
    cart: {
      type: [cartSchema],
    },
  },
  {
    versionKey: false,
    // 註冊時間開啟
    timestamps: true,
  },
)

// 🔗：https://mongoosejs.com/docs/tutorials/virtuals.html
// schema.virtual(欄位名稱).get(資料產生方式)
// 建立不存在的動態虛擬欄位 => 例如狀態列數字
// 資料產生方式 function 內的 this 代表現在要處理的那筆資料
schema.virtual('cartQuantity').get(function () {
  const user = this
  return user.cart.reduce((total, current) => {
    return total + current.quantity
    // 初始值為 0
  }, 0)
})

// 🔗：https://mongoosejs.com/docs/middleware.html#pre
// .pre 為 mongoose 提供之語法
// schema.pre('save') 資料保存之前要做的
// create --> validate -(!)-> saveDB
// 'mongoose 驗證之後，存入資料庫之前' 執行動作 => 偵測到錯誤就不會存入
schema.pre('save', function (next) {
  const user = this
  // 只有當密碼被修改時才進行驗證與加密
  if (user.isModified('password')) {
    // 自己寫驗證
    if (user.password.length < 4) {
      // ValidationError  代表整個物件的驗證錯誤，可以包含多個 ValidatorError
      // ValidatorError   代表單一欄位的驗證錯誤
      const error = new Error.ValidationError()
      // 'password' => 發生錯誤的欄位
      // message    => 發生錯誤的訊息
      error.addError('password', new Error.ValidatorError({ message: '密碼長度不足' }))
      next(error) // 提前返回，避免繼續執行
    } else if (user.password.length > 20) {
      const error = new Error.ValidationError()
      error.addError('password', new Error.ValidatorError({ message: '密碼長度超出限制' }))
      next(error)
    } else {
      // 使用者密碼 = 加密套件 bcrypt.hashSync(密碼, 加鹽次數)
      user.password = bcrypt.hashSync(user.password, 10)
    }
  }
  // 繼續執行 'save()' 很重要要記得寫
  next()
})

export default model('users', schema)
