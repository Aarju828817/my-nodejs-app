import { Router } from "express"
// import initiatePayment from "../controllers/payment_initiate"
// import verifyPayment from "../controllers/payment_verify"
// import createAccount from "../controllers/account_create"
import generateJiliLink from "../controllers/generate_jili_link"
import getGameList from "../controllers/get_game_list"
import generateJdbLink from "../controllers/generate_jdb_link"

let router = Router()

const initRootRouter = app => {
   // Consumer Main routes
   router.post("/api/neo_jili/generate_link", generateJiliLink)
   router.get("/api/neo_jili/game_list", getGameList)

   router.get("/api/neo_jdb/generate_link", generateJdbLink)
   //  router.post("/api/internal/payment_verify", verifyPayment)

   // Client routes
   //  router.post("/api/create_account", createAccount)
   //  router.post("/api/update_account", createAccount)

   return app.use("/", router)
}

export default initRootRouter
