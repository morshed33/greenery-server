import { Router } from "express"
import { ProductRoutes } from "../modules/Products/product.routes"
const router = Router()

router.use("/products", ProductRoutes)

export default router
