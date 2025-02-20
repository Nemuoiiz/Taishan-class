import { Schema, model, Query } from 'mongoose'

// 商品分類
const validCategories = {
  臉部彩妝: ['粉底', '修容', '打亮', '腮紅'],
  眼部彩妝: ['眼彩', '眉彩'],
  唇部彩妝: [''], // 沒有子分類
  日常保養: ['保養品', '乳液乳霜', '面膜', '化妝水'],
  臉部清潔: ['卸妝品', '洗面乳'], // 沒有子分類
  上妝用具: ['刷具', '粉底刮刀', '美妝蛋'],
}

const schema = new Schema(
  {
    name: {
      type: String,
      // 商品名稱必填
      required: [true, '商品名稱必填'],
    },
    price: {
      type: Number,
      // 商品價格必填
      required: [true, '商品價格必填'],
      // 商品價格不符
      min: [0, '商品價格不符'],
    },
    image: {
      type: String,
      // 商品圖片必填
      required: [true, '商品圖片必填'],
    },
    description: {
      type: String,
      // 商品說明必填
      required: [true, '商品說明必填'],
    },
    category: {
      // 商品主分類
      main: {
        type: String,
        // 商品分類必填
        required: [true, '商品主分類必填'],
        enum: {
          // 商品類別分類
          values: Object.keys(validCategories), // 只允許這些主分類
          // 商品分類不符
          message: '商品主分類不符',
        },
      },
      // 商品子分類
      sub: {
        type: String,
        default: '',
        validate: {
          validator: function (value) {
            // 允許的子分類
            let data = this
            if (this instanceof Query) {
              data = this._update.$set
            }
            const allowedSubCategories = validCategories[data.category.main] || []
            return value === '' || allowedSubCategories.includes(value)
          },
          message: '商品子分類不符',
        },
      },
    },
    // 新舊與否
    used: {
      type: Boolean,
      required: true,
      default: false, // false = 全新，true = 二手
    },
    usedNote: {
      type: String, // 讓賣家補充，例如「僅試色一次」、「包裝有點破損」
      default: '',
    },
    sell: {
      // 是否上下架使用布林值
      type: Boolean,
      // 商品上下架必填
      required: [true, '商品上下架必填'],
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
)

export default model('products', schema)
