import { Router } from 'express'
import * as user from '../controllers/user.js'

const router = new Router()

router.post('/', user.create)
router.post('/:id/cart', user.cart) // 指定 id 的購物車
router.get('/:id', user.getId)

export default router
