import { ProductService } from "../Products/product.service"
import { IOrder } from "./order.interface"
import { Order } from "./order.model"
import Stripe from "stripe"

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
})

const createOrder = async (orderData: Partial<IOrder>) => {
  if (!orderData.customer || !orderData.products || !orderData.paymentMethod) {
    throw new Error("Invalid order data")
  }

  let totalAmount = 0

  for (const product of orderData.products) {
    if (!product.productId || !product.quantity) {
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

    totalAmount += productData.price * product.quantity
    product.price = productData.price // Set price for the order
  }

  // Create a payment intent with Stripe
  let paymentIntent
  if (orderData.paymentMethod === "Stripe") {
    console.log("Entering Stripe payment method")
    paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(totalAmount * 100), // Amount in cents
      currency: "usd", // Change to your currency
      payment_method_types: ["card"],
    })

    console.log("Payment intent created successfully:", paymentIntent)

    // You may want to send the client secret back to the frontend for further processing
    orderData.stripePaymentIntent = {
      stripePaymentIntentId: paymentIntent.id,
      status: paymentIntent.status,
      clientSecret: paymentIntent.client_secret!,
    }
    console.log("Order data with Stripe payment intent:", orderData)
  }

  // Set the total amount and create the order
  orderData.totalAmount = totalAmount // Set calculated total amount
  const newOrder = await Order.create(orderData)
  return newOrder
}

export const OrderService = {
  createOrder,
}
