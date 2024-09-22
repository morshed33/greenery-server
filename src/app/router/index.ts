import { Router } from "express"
import { ProductRoutes } from "../modules/Products/product.routes"
import { OrderRoutes } from "../modules/Orders/order.routes"
const router = Router()

router.use("/products", ProductRoutes)
router.use("/orders", OrderRoutes)

export default router
