import { Schema, model, ObjectId } from 'mongoose'

const cartSchema = new Schema({
  product: {
    type: ObjectId,
    ref: 'products',
    required: [true, '訂單商品必填'],
  },
  quantity: {
    type: Number,
    required: [true, '訂單數量必填'],
    min: [1, '訂單商品數量不符'],
  },
})

const schema = new Schema(
  {
    user: {
      type: ObjectId,
      ref: 'users',
      required: [true, '訂單使用者必填'],
    },
    cart: {
      type: [cartSchema],
      required: [true, '訂單購物車必填'],
      validate: {
        validator(value) {
          // 驗證購物車是不是空的
          return value.length > 0
        },
        message: '購物車不可為空',
      },
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
)

export default model('orders', schema)
