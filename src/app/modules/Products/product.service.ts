/* eslint-disable no-console */
import { QueryBuilder } from "../../../builder/QueryBuilder"
import { TProduct } from "./product.interface"
import { Product } from "./product.model"

const createProduct = async (product: TProduct) => {
  try {
    const newProduct = await Product.create(product)
    return newProduct
  } catch (error) {
    console.error("Error creating product:", error)
    throw new Error("Failed to create product")
  }
}

export const getAllProducts = async (payload: Record<string, unknown>) => {
  try {
    console.log(payload)

    // Initialize QueryBuilder with base query and payload
    const queryBuilder = new QueryBuilder(Product.find(), payload)

    // Apply search and filter criteria for products
    queryBuilder.search(["title", "description"]).filter()

    // Count total number of documents matching the search/filter criteria
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
  } catch (error) {
    console.error("Error fetching products:", error)
    throw new Error("Failed to fetch products")
  }
}

const getProductById = async (id: string) => {
  try {
    const product = await Product.findById(id)
    if (!product) {
      throw new Error("Product not found")
    }
    return product
  } catch (error) {
    console.error(`Error fetching product with ID ${id}:`, error)
    throw new Error("Failed to fetch product")
  }
}

const updateProduct = async (id: string, product: Partial<TProduct>) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, {
      new: true,
      runValidators: true,
    })
    if (!updatedProduct) {
      throw new Error("Product not found")
    }
    return updatedProduct
  } catch (error) {
    console.error(`Error updating product with ID ${id}:`, error)
    throw new Error("Failed to update product")
  }
}

const deleteProduct = async (id: string) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(id)
    if (!deletedProduct) {
      throw new Error("Product not found")
    }
    return deletedProduct
  } catch (error) {
    console.error(`Error deleting product with ID ${id}:`, error)
    throw new Error("Failed to delete product")
  }
}

// New method to decrease the quantity of a product
const decreaseQuantity = async (id: string, quantity: number) => {
  try {
    const product = await Product.findById(id)
    if (!product) {
      throw new Error("Product not found")
    }

    // Ensure the product has enough quantity
    if (product.quantity < quantity) {
      throw new Error("Insufficient quantity")
    }

    // Decrease the quantity
    product.quantity -= quantity
    await product.save()

    return product
  } catch (error) {
    console.error(`Error decreasing quantity for product with ID ${id}:`, error)
    throw new Error("Failed to decrease quantity")
  }
}

export const ProductService = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  decreaseQuantity,
}
