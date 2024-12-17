import { Schema, model } from 'mongoose'
import validator from 'validator' // 信箱驗證用

const schema = new Schema({
  // 資料欄位名稱
  account: {
    // 資料型態
    type: String,
    // 必填
    required: [true, '帳號必填'],
    // 限制長度
    minLength: [4, '帳號最少 4 個字'],
    maxLength: [20, '帳號最多 20 個字'],
    // 欄位資料不能重複
    unique: true,
    // 🔻 Regex 正則表達式
    // ^ : 表示字串的開頭
    // []: 字符集，設定的字符範圍 (大寫小寫英文、數字)
    // + : 量詞，表示前面的字符集必須至少出現一次，且可以重複多次
    // $ : 表示字串的結尾
    match: [/^[A-Za-z0-9]+$/, '帳號只能是英數字'],
    // 自動使用 .trim() 去除空白
    trim: true,
  },
  email: {
    type: String,
    required: [true, '信箱必填'],
    unique: true,
    // 自訂驗證，使用 validator 套件
    validate: {
      // mongoose 自訂驗證的套件剛好叫做 validator
      validator(value) {
        return validator.isEmail(value)
      },
      message: '信箱格式錯誤',
    },
  },
})

// 把結構轉成可以操作的 model 匯出
// model(collection 名稱, schema)
// collection 名稱使用英文複數 (取單數名也會自動變複數)
export default model('users', schema)
