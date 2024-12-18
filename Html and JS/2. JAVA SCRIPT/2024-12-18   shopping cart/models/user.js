import { Schema, model, ObjectId } from 'mongoose'

// 🔻內層 => 商品、數量
const cartSchema = new Schema(
  {
    product: {
      // 商品資料型態不是文字，而是 ObjectId (mongoDB 的 id)
      type: ObjectId,
      // id 來源是 products
      ref: 'products',
      required: [true, '購物車商品 ID 必填'],
    },
    quantity: {
      type: Number,
      required: [true, '購物車商品數量必填'],
    },
  },
  { versionKey: false },
)

// 🔻外層 => 帳號、購物車
const schema = new Schema(
  {
    account: {
      type: String,
      required: [true, '帳號必填'],
      unique: true,
    },
    cart: {
      type: [cartSchema],
    },
  },
  { versionKey: false },
)

export default model('users', schema)
