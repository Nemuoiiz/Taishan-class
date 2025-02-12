import passport from 'passport'
import passportLocal from 'passport-local'
import User from './models/user.js'
import bcrypt from 'bcrypt'
import passportJWT from 'passport-jwt'

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
          return done(null, null, { message: '查無使用者' })
        } else if (error.message === 'PASSWORD') {
          return done(null, null, { message: '使用者驗證錯誤' })
        } else {
          return done(null, null, { message: '伺服器錯誤' })
        }
      }
    },
  ),
)

// 引用 passportJWT 驗證策略
// 編寫 jwt 驗證方式
passport.use(
  'jwt',
  new passportJWT.Strategy(
    {
      // jwt 的位置(postman 的 header)
      jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
      // secret
      secretOrKey: process.env.JWT_SECRET,
      // 讓後面的 function 能使用 req(request) 的資訊
      passReqToCallback: true,
      // 🔸 允許過期的 jwt 通過（過期例外）
      ignoreExpiration: true,
    },
    // req = 請求資訊，有設定 passReqToCallback 才能用
    // payload = 解碼後的資料
    // done = 下一步
    async (req, payload, done) => {
      try {
        // 因為沒有提供原始的 jwt，所以利用套件語法取得
        const token = passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken()(req)

        // 🔸 手動加入檢查過期的驗證（過期例外）
        // 只有 refresh 和 logout 允許過期的 jwt
        // payload.exp = jwt 過期時間，單位為秒
        // nwe Date().getTime() = 目前時間，單位為毫秒
        const expired = payload.exp * 1000 < new Date().getTime()
        // 請求路徑
        // 例如：http://localhost:4000/user/test?aaa=111&bbb=222
        // req.originUrl = /user/test?aaa=111&bbb=222
        // req.baseUrl = /user
        // req.path = /test
        // req.query = { aaa: 111, bbb: 222 }
        const url = req.baseUrl + req.path
        if (expired && url !== '/user/refresh' && url !== '/user/logout') {
          // EXPIRED 過期
          throw new Error('EXPIRED')
        }

        // 用解碼的資料查詢有沒有使用者
        const user = await User.findById(payload._id).orFail(new Error('USER'))
        // 找到使用者後，檢查資料庫有沒有這個 jwt
        if (!user.tokens.includes(token)) {
          // userTokenInvalid 丟出 TOKEN 無效錯誤
          throw new Error('TOKEN')
        }

        // 都沒問題，下一步
        return done(null, { user, token }, null)
      } catch (error) {
        console.log(error)
        if (error.message === 'USER') {
          return done(null, null, { message: '查無使用者' })
        } else if (error.message === 'TOKEN') {
          return done(null, null, { message: '使用者驗證錯誤' })
        } else if (error.message === 'EXPIRED') {
          return done(null, null, { message: '使用者驗證過期' })
        } else {
          return done(null, null, { message: '伺服器錯誤' })
        }
      }
    },
  ),
)
