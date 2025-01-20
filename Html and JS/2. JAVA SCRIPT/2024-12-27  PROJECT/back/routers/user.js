import { Router } from 'express'
// 記得自己是使用 CUser，下面 router.post() 也要指向 CUser
import * as CUser from '../controllers/user.js'
import * as auth from '../middlewares/auth.js'

const router = Router()

router.post('/', CUser.create)
// auth.login => auth.js 裡 login 的 function
router.post('/login', auth.login, CUser.login)
router.get('/profile', auth.jwt, CUser.profile)
router.patch('/refresh', auth.jwt, CUser.refresh)
router.delete('/logout', auth.jwt, CUser.logout)
// 取購物車
router.get('/cart', auth.jwt, CUser.getCart)
// 把東西放回購物車
router.patch('/cart', auth.jwt, CUser.updateCart)

export default router
