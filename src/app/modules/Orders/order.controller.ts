import { ApiResponse } from "../../../utils/ApiResponse"
import { catchAsync } from "../../../utils/catchAsync"
import { OrderService } from "./order.service"

const createOrder = catchAsync(async (req, res) => {
  const dataFromUser = req.body
  dataFromUser.totalAmount = 0
  const orderData = await OrderService.createOrder(dataFromUser)

  return res
    .status(201)
    .json(new ApiResponse(true, 201, "Order Created", orderData))
})

export const OrderController = {
  createOrder,
}
