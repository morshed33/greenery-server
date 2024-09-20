export class ApiResponse<T = unknown> {
  public success: boolean
  public statusCode: number
  public message: string
  public data: T | null
  public token?: string

  constructor(
    success: boolean,
    statusCode: number,
    message: string,
    token: string | null = null,
    data: T | null = null,
  ) {
    this.success = success
    this.statusCode = statusCode
    this.message = message
    if (token) {
      this.token = token
    }
    this.data = data
  }
}
