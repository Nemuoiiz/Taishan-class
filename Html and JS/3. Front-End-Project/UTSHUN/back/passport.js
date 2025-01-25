import passport from 'passport'
import passportLocal from 'passport-local'
import User from '../models/user.js'
import bcrypt from 'bcrypt'

// 引用 passportLocal 驗證策略 (local 的功用在於驗證欄位有無資料)
// 編寫 login 驗證方式
// new 策略(執行驗證策略的設定, 完成後執行的 function)
passport.use(
  'login',
  new passportLocal.Strategy(
    {
      // 指定讀取的 req.body 的帳號欄位，預設是 username，改為 account
      usernameField: 'account',
      // 指定讀取的 req.body 的密碼欄位，預設是 password
      passwordField: 'password',
    },
    // 帳號、密碼、宣告東西完成(done)
    async (account, password, done) => {
      try {
        // 查詢有沒有符合帳號的使用者
        // (!) 只能先找帳號，密碼被加密過不能直接驗證
        const user = await User.findOne({ account: account }).orFail(new Error('ACCOUNT'))
        // 找到帳號後、檢查密碼，如果不符合就丟出錯誤
        if (!bcrypt.compareSync(password, user.password)) {
          throw new Error('PASSWORD')
        }
        // 完成驗證方式，將資料帶入下一步處理
        // done(錯誤, 資料, info)
        return done(null, user, null)
      } catch (error) {
        console.log(error)
        if (error.message === 'ACCOUNT') {
          return done(null, null, { message: 'userNotFound' })
        } else if (error.message === 'PASSWORD') {
          return done(null, null, { message: 'userPasswordIncorrect' })
        } else {
          return done(null, null, { message: 'serverError' })
        }
      }
    },
  ),
)
