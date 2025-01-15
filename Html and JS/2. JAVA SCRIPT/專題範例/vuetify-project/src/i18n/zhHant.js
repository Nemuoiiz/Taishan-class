import { zhHant } from 'vuetify/locale'

export default {
  $vuetify: zhHant,
  nav: {
    register: '註冊',
    login: '登入',
    cart: '購物車',
    orders: '訂單',
    admin: '管理',
    logout: '登出',
    adminProducts: '商品管理',
    adminOrders: '訂單管理',
    home: '首頁',
    product: '商品',
  },
  register: {
    submit: '建立帳號',
    success: '註冊成功'
  },
  login: {
    submit: '登入',
    success: '登入成功'
  },
  logout: {
    success: '登出成功',
  },
  user: {
    account: '帳號',
    email: '信箱',
    password: '密碼',
    passwordConfirm: '確認密碼'
  },
  cart: {
    checkout: '結帳',
  },
  order: {
    createdAt: '訂單時間',
    cart: '商品',
    price: '訂單金額',
    account: '帳號'
  },
  admin: {
    index: '選擇管理項目'
  },
  adminProduct: {
    new: '新增商品',
    edit: '編輯商品',
    cancel: '取消',
    submit: '確認',
    newSuccess: '新增成功',
    editSuccess: '編輯成功',
  },
  product: {
    image: '圖片',
    name: '名稱',
    description: '說明',
    price: '價格',
    category: '分類',
    sell: '上下架',
    createdAt: '新增時間',
    updatedAt: '更新時間',
    onSell: '上架',
    notOnSell: '下架',
    addCart: '加入購物車',
    addCartQuantityInvalid: '數量格式不符',
    addCartSuccess: '加入購物車成功',
  },
  productCategory: {
    food: '食品',
    drink: '飲料',
    music: '音樂',
    phone: '手機'
  },
  fileAgent: {
    helpText: '點擊或拖曳檔案至此',
    errorType: '檔案類型錯誤',
    errorSize: '檔案大小超過限制',
  },
  api: {
    userAccountRequired: '使用者帳號必填',
    userAccountTooShort: '使用者帳號太短',
    userAccountTooLong: '使用者帳號太長',
    userAccountInvalid: '使用者帳號格式不符',
    userAccountDuplicate: '使用者帳號重複',
    userPasswordRequired: '使用者密碼必填',
    userPasswordTooShort: '使用者密碼太短',
    userPasswordTooLong: '使用者密碼太長',
    userPasswordIncorrect: '密碼錯誤',
    userPasswordNotMatch: '密碼不符',
    userEmailRequired: '使用者信箱必填',
    userEmailInvalid: '使用者信箱格式不符',
    userCartProductRequired: '購物車商品必填',
    userCartQuantityRequired: '購物車數量必填',
    userCartQuantityTooSmall: '購物車數量不符',
    userNotFound: '查無使用者',
    userPermissionDenied: '使用者權限不足',
    userTokenInvalid: '使用者驗證錯誤',
    userTokenExpired: '登入過期',
    productIdInvalid: '商品 ID 錯誤',
    productNameRequired: '商品名稱必填',
    productPriceRequired: '商品價格必填',
    productPriceTooSmall: '商品價格不符',
    productImageRequired: '商品圖片必填',
    productDescriptionRequired: '商品說明必填',
    productCategoryRequired: '商品分類必填',
    productCategoryInvalid: '商品分類不符',
    productSellRequired: '商品上下架必填',
    requestFormatError: '請求格式錯誤',
    productNotOnSell: '商品未上架',
    productNotFound: '查無商品',
    orderCartProductRequired: '訂單商品必填',
    orderCartQuantityRequired: '訂單數量必填',
    orderCartQuantityTooSmall: '訂單數量不符',
    orderUserRequired: '訂單使用者必填',
    orderCartRequired: '訂單購物車必填',
    orderCartEmpty: '訂單購物車為空',
    serverError: '伺服器錯誤',
    unknownError: '未知錯誤',
    uploadFailed: '上傳失敗',
  },
}

