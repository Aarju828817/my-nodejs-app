import * as yup from "yup"
import { v4 as uuidv4 } from "uuid"
import db from "../config/connect_db"
import { accounts } from "../../schema"

let accountSchema = yup.object({
   name: yup.string().required(),
   userId: yup.number().required(),
   ipAddress: yup.string().required(),
})

const createAccount = async (req, res) => {
   try {
      const account = await accountSchema.validate(req.body)

      // const secretKey = uuidv4()

      // const accountQ = await db
      //    .select({
      //       id: accounts.id,
      //       name: accounts.name,
      //       userId: accounts.userId,
      //       secretKey: accounts.secretKey,
      //       ipAddress: accounts.ipAddress,
      //       createdAt: accounts.createdAt,
      //    })
      //    .from(accounts)
      //    .where({
      //       name: account.name,
      //       userId: account.userId,
      //    })
      const accountQ = await connection.query("SELECT * FROM users WHERE phone = ? AND password = ? ", [username, md5(pwd)])
      
      console.log(accountQ)

      const response = await db.insert(accounts).values({
         name: account.name,
         userId: account.userId,
         // secretKey: secretKey,
         ipAddress: account.ipAddress,
      })

      console.log(response)

      return res.status(200).json({
         response,
      })
   } catch (error) {
      console.log(error)
      if (error?.name === "ValidationError") {
         return res.status(400).json({
            message: error?.message,
         })
      }

      return res.status(400).json({
         message: "Something went wrong!",
         error,
      })
   }
}

export default createAccount
