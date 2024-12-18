import { Schema, model } from 'mongoose'

const schema = new Schema(
  {
    name: {
      type: String,
      required: [true, '商品名稱必填'],
    },
    price: {
      type: Number,
      require: [true, '商品價格必填'],
      min: [0, '商品價格格式不正確'],
    },
    category: {
      type: String,
      enum: {
        // 限制欄位只能有陣列內的值
        values: ['遊戲', '音樂', '手機', '衣服'],
        // 錯誤訊息的 {VALUE} 會自動替換成傳入的值
        message: '商品分類錯誤，查無{VALUE}分類',
      },
    },
  },
  {
    // 停用資料內的 "__v" 紀錄 (停用 Mongoose 的版本控制功能)
    versionKey: false,
    // 建立 createdAt 和 updateAt (自動追蹤文件的創建和更新時間)
    timestamps: true,
  },
)

export default model('products', schema)
