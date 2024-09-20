export class ApiResponse<T = unknown> {
  public success: boolean
  public statusCode: number
  public message: string
  public data: T | null

  constructor(
    success: boolean,
    statusCode: number,
    message: string,
    data: T | null = null,
  ) {
    this.success = success
    this.statusCode = statusCode
    this.message = message
    this.data = data
  }
}
