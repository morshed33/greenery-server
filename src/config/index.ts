import dotenv from "dotenv"
import path from "path"

dotenv.config({ path: path.join(process.cwd(), ".env") })

export default {
  port: process.env.PORT,
  origin: process.env.ORIGIN,
  nodeEnv: process.env.NODE_ENV,
  dbUrl: process.env.DB_URL,
  dbName: process.env.DB_NAME || "",
}
