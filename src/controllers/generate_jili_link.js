import moment from "moment"
import md5 from "md5"
import * as yup from "yup"
import QueryString from "qs"
import axios from "axios"

let bodySchema = yup.object({
   gameId: yup.string().required(),
   agentId: yup.string().required(),
   agentKey: yup.string().required(),
   gameBaseUrl: yup.string().required(),
   token: yup.string().required(),
   // secretKey: yup.string().required(),
})

const generateJiliLink = async (req, res) => {
   try {
      const body = await bodySchema.validate(req.body)

      const dateString = moment().utcOffset("-0400").format("YYMMD")
      const agentId = body.agentId
      const agentKey = body.agentKey
      const gameId = body.gameId
      const token = body.token
      const keyG = md5(dateString + agentId + agentKey)

      const gameBaseUrl = body.gameBaseUrl

      const params = QueryString.stringify({
         Token: token,
         GameId: gameId,
         Lang: "en-us",
         AgentId: agentId,
      })

      const initialKey = md5(params + keyG)

      const finalKey = `000000${initialKey}000000`
      const link = `${gameBaseUrl}/singleWallet/LoginWithoutRedirect?${params}&Key=${finalKey}`

      console.log(link)

      const response = await axios({
         method: "GET",
         url: link,
      })

      if (response?.data?.ErrorCode === 0) {
         return res.status(200).json({
            gameLink: response?.data?.Data,
         })
      }

      console.log("response?.data", response?.data)
      console.log("response?.data?.ErrorCode", response?.data?.ErrorCode)

      return res.status(400).json({ message: "Something went wrong!" })
   } catch (error) {
      console.log(error?.response?.data)
      if (error?.name === "ValidationError") {
         return res.status(400).json({
            message: error?.message,
         })
      }

      return res.status(500).json({
         message: "Something went wrong!",
         error,
      })
   }
}

export default generateJiliLink
