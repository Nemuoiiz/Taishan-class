```json
{
  "_id": "61e1bcf7e7223d44f3d445dd",
  "account": "john_doe",
  "password": "$2a$10$V1IZc2CgCZdBh5z6RssbdIH8VcQy/2hGz6n94eFb9sHD6zYH9S.m",
  "email": "john_doe@example.com",
  "tokens": [
    "abc123",
    "def456"
  ],
  "role": 1,
  "cart": [
    {
      "product": "61e1bd32e6b7b0a7f8b98a5d",  // 這是 "Product A" 的 ObjectId
      "quantity": 2
    },
    {
      "product": "61e1bd32e6b7b0a7f8b98a5e",  // 這是 "Product B" 的 ObjectId
      "quantity": 1
    }
  ],
  "cartQuantity": 3,  // 計算購物車中商品的總數量
  "createdAt": "2025-01-19T14:00:00.000Z",
  "updatedAt": "2025-01-19T14:00:00.000Z"
}
```
