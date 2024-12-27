import { Router } from 'express'
import * as CUser from '../controllers/user.js'
import * as auth from '../middlewares/auth.js'

const router = Router()

router.post('/', CUser.create)
// auth.login => auth.js 裡 login 的 function
router.post('/login', auth.login, CUser.login)
router.get('/profile', auth.jwt, CUser.profile)

export default router
