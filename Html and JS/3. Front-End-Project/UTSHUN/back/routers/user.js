// 負責路由的檔案

import { Router } from 'express'
import * as user from '../controllers/user.js'
import * as auth from '../middlewares/auth.js'

const router = Router()

router.post('/', user.create)
// auth.login => auth.js 裡 login 的 function
router.post('/login', auth.login, user.login)
router.get('/profile', auth.jwt, user.profile)
// .patch() 修改
router.patch('/refresh', auth.jwt, user.refresh)
// .delete() 刪除
router.delete('/logout', auth.jwt, user.logout)
// .get 取使用者的購物車
router.get('/cart', auth.jwt, user.getCart)
// .patch 修改使用者的購物車
router.patch('/cart', auth.jwt, user.updateCart)

export default router
