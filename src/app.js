import "dotenv/config"
import express from "express"
import initRootRouter from "./routes"

const app = express()

const port = process.env.PORT || 3000

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

initRootRouter(app)

app.listen(port, () => {
   console.log("Connected success port: " + port)
})
