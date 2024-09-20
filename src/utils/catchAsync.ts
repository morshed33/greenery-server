import { NextFunction, Request, RequestHandler, Response } from "express"

export const catchAsync = (fn: RequestHandler) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((error) => {
      console.log(error)
      res.status(500).json({
        success: false,
        message: error.message || "Error occurred while processing async request",
        error,
      })
    })
  }
}
