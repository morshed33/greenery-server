import { TProduct } from "./product.interface"
import { Product } from "./product.model"

const createProduct = async (product: TProduct) => {
  const newProduct = await Product.create(product)
  return newProduct
}

const getProducts = async () => {
  const products = await Product.find()
  return products
}

const getProductById = async (id: string) => {
  const product = await Product.findById(id)
  return product
}

const updateProduct = async (id: string, product: Partial<TProduct>) => {
  const updatedProduct = await Product.findByIdAndUpdate(id, product, {
    new: true,
    runValidators: true,
  })
  return updatedProduct
}

const deleteProduct = async (id: string) => {
  const deletedProduct = await Product.findByIdAndDelete(id)
  return deletedProduct
}

export const ProductService = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
}
