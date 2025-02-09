import { Schema, model } from 'mongoose'

const schema = new Schema(
  {
    name: {
      type: String,
      // 商品名稱必填
      required: [true, 'productNameRequired'],
    },
    price: {
      type: Number,
      // 商品價格必填
      required: [true, 'productPriceRequired'],
      // 商品價格不符
      min: [0, 'productPriceTooSmall'],
    },
    image: {
      type: String,
      // 商品圖片必填
      required: [true, 'productImageRequired'],
    },
    description: {
      type: String,
      // 商品說明必填
      required: [true, 'productDescriptionRequired'],
    },
    category: {
      type: String,
      // 商品分類必填
      required: [true, 'productCategoryRequired'],
      enum: {
        // 商品類別分類
        values: ['food', 'drink', 'music', 'game'],
        // 商品分類不符
        message: 'productCategoryInvalid',
      },
    },
    sell: {
      // 是否上下架使用布林值
      type: Boolean,
      // 商品上下架必填
      required: [true, 'productSellRequired'],
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
)

export default model('products', schema)
