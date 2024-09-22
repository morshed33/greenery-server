import { model, Schema } from "mongoose"
import {
  ICustomer,
  IOrder,
  IOrderProduct,
  IStripePaymentIntent,
} from "./order.interface"

const CustomerSchema = new Schema<ICustomer>({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  email: { type: String },
})

const OrderProductSchema = new Schema<IOrderProduct>({
  productId: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
})

const StripePaymentIntentSchema = new Schema<IStripePaymentIntent>({
  stripePaymentIntentId: { type: String, required: true },
  status: { type: String, required: true },
  clientSecret: { type: String, required: true },
})

const OrderSchema = new Schema<IOrder>({
  customer: { type: CustomerSchema, required: true },
  products: [OrderProductSchema],
  totalAmount: { type: Number, default: 0 },
  paymentMethod: { type: String },
  isPaid: { type: Boolean },
  status: { type: String },
  stripePaymentIntent: { type: StripePaymentIntentSchema },
})

export const Order = model<IOrder>("Order", OrderSchema)
