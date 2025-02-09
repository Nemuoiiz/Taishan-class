import { zhHant } from 'vuetify/locale'

export default {
  $vuetify:zhHant,
  api: {
    // back > models > user.js
    userAccountRequired: '使用者帳號必填',
    userAccountTooShort: '使用者帳號太短',
    userAccountTooLong: '使用者帳號太長',
    userAccountInvalid: '使用者帳號格式不符',
    userPasswordRequired: '使用者密碼必填',
    userPasswordTooShort: '使用者密碼太短',
    userPasswordTooLong: '使用者密碼太長',
    userEmailRequired: '使用者信箱必填',
    userEmailInvalid: '使用者信箱格式不符',
    userCartProductRequired: '使用者購物車商品必填',
    userCartQuantityRequired: '使用者購物車數量必填',
    userCartQuantityTooSmall: '使用者購物車數量不符',
    // back > controllers > user.js
    userAccountDuplicate: '使用者帳號重複',
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
    userNotFound: '查無使用者',
    userTokenInvalid: '使用者驗證錯誤',
  },
}
