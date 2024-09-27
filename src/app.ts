import express, { Application, Request, Response } from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import config from "./config"
import { ApiResponse } from "./utils/ApiResponse"
import errorHandler from "./middlewares/errorHandler"
import notFound from "./middlewares/notFound"
import router from "./app/router"

const app: Application = express()

app.use(cors({ origin: "*" }))

// Parsing
app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(express.static("public"))
app.use(cookieParser())

app.use("/api", router)

// PING_TEST Routes
app.get("/", (req: Request, res: Response) => {
  res.status(200).json(new ApiResponse(true, 200, "SERVER Pinging... 📍"))
})

// Global Error Middleware
app.use(errorHandler)

// ALL Catch Route
app.use(notFound)

export default app
