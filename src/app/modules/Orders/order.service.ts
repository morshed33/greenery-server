import { ProductService } from "../Products/product.service"
import { IOrder } from "./order.interface"
import { Order } from "./order.model"

const createOrder = async (orderData: Partial<IOrder>) => {
  if (!orderData.customer || !orderData.products) {
    throw new Error("Invalid order data")
  }

  for (const product of orderData.products) {
    if (!product.productId || !product.quantity || !product.price) {
      throw new Error("Invalid product data")
    }

    const productData = await ProductService.getProductById(product.productId)
    if (!productData) {
      throw new Error("Product not found")
    }

    if (productData.quantity < product.quantity) {
      throw new Error("Insufficient quantity")
    }

    productData.quantity -= product.quantity
    await productData.save()

    product.price = productData.price

    orderData.totalAmount ??= 0
    orderData.totalAmount += productData.price * product.quantity
  }

  const newOrder = await Order.create(orderData)
  return newOrder
}

export const OrderService = {
  createOrder,
}
