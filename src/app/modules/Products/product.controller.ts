import { ApiResponse } from "../../../utils/ApiResponse"
import { catchAsync } from "../../../utils/catchAsync"
import { ProductService } from "./product.service"

const createProduct = catchAsync(async (req, res) => {
  const product = await ProductService.createProduct(req.body)
  return res
    .status(201)
    .json(new ApiResponse(true, 201, "Product Created", product))
})

const getAllProducts = catchAsync(async (req, res) => {
  const products = await ProductService.getAllProducts(req.query)
  return res
    .status(200)
    .json(
      new ApiResponse(true, 200, "Products retrieved successfully", products),
    )
})

const getProductById = catchAsync(async (req, res) => {
  const product = await ProductService.getProductById(req.params.id)
  return res
    .status(200)
    .json(new ApiResponse(true, 200, "Product retrieved successfully", product))
})

const updateProduct = catchAsync(async (req, res) => {
  const product = await ProductService.updateProduct(req.params.id, req.body)
  return res
    .status(200)
    .json(new ApiResponse(true, 200, "Product updated successfully", product))
})

const deleteProduct = catchAsync(async (req, res) => {
  const product = await ProductService.deleteProduct(req.params.id)
  return res
    .status(200)
    .json(new ApiResponse(true, 200, "Product deleted successfully", product))
})

export const ProductController = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
}
