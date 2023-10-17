import { Router } from "express";
import cartRouter from "./cart.routes.js";
import productRouter from "./products.routes.js";
import sessionRouter from "./session.routes.js";
import userRouter from "./user.routes.js";

const router = Router()

router.use('/api/product', productRouter)
router.use('/api/user', userRouter)
router.use('/api/carts', cartRouter)
router.use('/api/sessions', sessionRouter)

export default router