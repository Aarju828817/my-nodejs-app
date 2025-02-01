import moment from "moment"
import md5 from "md5"
import * as yup from "yup"
import QueryString from "qs"
import axios from "axios"

let bodySchema = yup.object({
   agentId: yup.string().required(),
   agentKey: yup.string().required(),
   gameBaseUrl: yup.string().required(),
   // secretKey: yup.string().required(),
})

const gameCategories = [
   {
      id: 1,
      name: "Slot",
   },
   {
      id: 2,
      name: "Poker",
   },
   {
      id: 3,
      name: "Lobby",
   },
   {
      id: 5,
      name: "Fishing",
   },
   {
      id: 8,
      name: "Casino (including bingo)",
   },
]

const getGameList = async (req, res) => {
   try {
      const body = await bodySchema.validate(req.body)

      const dateString = moment().utcOffset("-0400").format("YYMMD")
      const agentId = body.agentId
      const agentKey = body.agentKey
      const keyG = md5(dateString + agentId + agentKey)

      const gameBaseUrl = body.gameBaseUrl

      const params = QueryString.stringify({
         AgentId: agentId,
      })

      const initialKey = md5(params + keyG)

      const finalKey = `000000${initialKey}000000`

      const link = `${gameBaseUrl}/GetGameList?${params}&Key=${finalKey}`

      const response = await axios({
         method: "POST",
         url: link,
      })

      const gameData = gameCategories.map(itemA => {
         return {
            ...itemA,
            list: response?.data?.Data.filter(itemB => {
               return itemA?.id === itemB?.GameCategoryId
            }).map(itemC => {
               return {
                  ...itemC,
                  name: itemC?.name?.["en-US"],
                  sqImageSrc: `GAMEID_${itemC.GameId <= 9 ? `0${itemC.GameId}` : itemC.GameId}.png`,
               }
            }),
         }
      })

      if (response?.data?.ErrorCode === 0) {
         return res.status(200).json({
            gameData: gameData,
         })
      }

      console.log("ErrorCode", response?.data)
      console.log("ErrorCode", response?.data?.ErrorCode)

      return res.status(400).json({ message: "Something went wrong!" })
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

export default getGameList
