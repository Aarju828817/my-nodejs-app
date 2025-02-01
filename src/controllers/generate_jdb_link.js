import * as yup from "yup"
import axios from "axios"
import aesUtil from "../helpers/AESEncrypt"
import qs from "querystring"

let bodySchema = yup.object({
   parent: yup.string().required(),
   uid: yup.string().required(),
   balance: yup.string().required(),
   gType: yup.string().required(),
   mType: yup.string().required(),
   windowMode: yup.string().required(),
   key: yup.string().required(),
   iv: yup.string().required(),
   dc: yup.string().required(),
   url: yup.string().required(),
})

const generateJdbLink = async (req, res) => {
   try {
      const body = await bodySchema.validate(req.body)

      const parent = body.parent
      const uid = body.uid
      const balance = body.balance
      const gType = body.gType
      const mType = body.mType
      const windowMode = body.windowMode
      const key = body.key
      const iv = body.iv
      const dc = body.dc
      const url = body.url

      const data = {
         action: 21,
         ts: new Date().getTime(),
         lang: "en",
         parent: parent,
         uid: uid,
         balance: balance,
         //  lobbyURL
         //  isShowDollarSign: false,
         gType: gType,
         mType: mType,
         windowMode: windowMode,
      }

      const x = aesUtil.AESEncrypt(JSON.stringify(data), key, iv)

      const response = await axios({
         method: "POST",
         url: `${url}/apiRequest.do`,
         data: qs.stringify({ dc, x }),
         headers: { "Content-Type": "application/x-www-form-urlencoded" },
      })

      if (response.data.status === "0000") {
         return res.status(200).json({
            status: response.data.status,
            path: response.data.path,
         })
      }

      return res.status(400).json(response.data)
   } catch (error) {
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

export default generateJdbLink
