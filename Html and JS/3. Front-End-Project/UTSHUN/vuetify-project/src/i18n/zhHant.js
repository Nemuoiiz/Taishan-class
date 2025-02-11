import { zhHant } from 'vuetify/locale'

export default {
  $vuetify:zhHant,
  api: {
    // back > models > user.js
    userAccountRequired: '帳號必填',
    userAccountTooShort: '帳號太短',
    userAccountTooLong: '帳號太長',
    userAccountInvalid: '帳號格式不符',
    userPasswordRequired: '密碼必填',
    userPasswordTooShort: '密碼太短',
    userPasswordTooLong: '密碼太長',
    userEmailRequired: '信箱必填',
    userEmailInvalid: '信箱格式不符',
    userCartProductRequired: '購物車商品必填',
    userCartQuantityRequired: '購物車數量必填',
    userCartQuantityTooSmall: '購物車數量不符',
    // back > controllers > user.js
    userAccountDuplicate: '帳號重複',
    // back > controllers > user.js
    // back > passport.js
    serverError: '伺服器錯誤',
    // back > index.js
    // back > middleware > auth.js
    requestFormatError: '請求格式錯誤',
    // back > models > product.js
    productNameRequired: '商品名稱必填',
    productPriceRequired: '商品價格必填',
    productPriceTooSmall: '商品價格不符',
    productImageRequired: '商品圖片必填',
    productDescriptionequired: '商品說明必填',
    productCategoryRequired: '商品分類必填',
    productCategoryInvalid: '商品分類不符',
    productSellRequired: '商品上下架必填',
    // back > passport.js
    userNotFound: '查無',
    userTokenInvalid: '驗證錯誤',
  },
}
