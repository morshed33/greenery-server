import { Router } from "express"
import { OrderController } from "./order.controller"

const router = Router()

// test
router.get("/", (req, res) => {
  res.send("Hello from Orders!")
})
router.post("/", OrderController.createOrder)

export const OrderRoutes = router
