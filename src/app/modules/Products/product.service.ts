/* eslint-disable no-console */
import { QueryBuilder } from "../../../builder/QueryBuilder"
import { TProduct } from "./product.interface"
import { Product } from "./product.model"

const createProduct = async (product: TProduct) => {
  const newProduct = await Product.create(product)
  return newProduct
}
export const getAllProducts = async (payload: Record<string, unknown>) => {
  console.log(payload)

  // Initialize QueryBuilder
  const queryBuilder = new QueryBuilder(Product.find(), payload)

  // Apply search and filter criteria for products
  queryBuilder.search(["title", "description"]).filter()

  // Count the total number of documents matching the search/filter criteria
  const total = await Product.countDocuments(
    queryBuilder.modelQuery.getFilter(),
  )

  // Apply pagination, sorting, and fields selection
  const products = await queryBuilder
    .paginate()
    .sort()
    .fields()
    .modelQuery.exec()

  return {
    products,
    pagination: {
      total,
      limit: Number(payload.limit || 10),
      page: Number(payload.page || 1),
    },
  }
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
