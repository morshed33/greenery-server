import { QueryBuilder } from "../../../builder/QueryBuilder"
import { TProduct } from "./product.interface"
import { Product } from "./product.model"

const createProduct = async (product: TProduct) => {
  const newProduct = await Product.create(product)
  return newProduct
}

const getAllProducts = async (payload: Record<string, unknown>) => {
  const productQuery = new QueryBuilder(Product.find({}), payload)
  productQuery.search(["title", "description, category"])
  productQuery.paginate()
  productQuery.sort()
  productQuery.fields()
  productQuery.filter()

  const products = await productQuery.modelQuery

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
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
}
