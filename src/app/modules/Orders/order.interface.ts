export interface IOrderProduct {
  productId: string
  quantity: number
  price: number
}

export interface ICustomer {
  name: string
  phone: string
  address: string
  email?: string
}

export interface IStripePaymentIntent {
  stripePaymentIntentId: string
  status: string
  clientSecret: string
}

export interface IOrder {
  customer: ICustomer
  products: Array<IOrderProduct>
  totalAmount?: number
  paymentMethod?: "Stripe" | "Cash on Delivery"
  isPaid?: boolean
  status?: "Pending" | "Processing" | "Shipped" | "Delivered"
  stripePaymentIntent?: IStripePaymentIntent
}
