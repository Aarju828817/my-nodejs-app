import CryptoJS from "crypto-js"

function AESEncrypt(data, aesKey, aesIv) {
   const key = CryptoJS.enc.Utf8.parse(aesKey)
   const iv = CryptoJS.enc.Utf8.parse(aesIv)
   const encrypted = CryptoJS.AES.encrypt(data.trim(), key, {
      iv,
      padding: CryptoJS.pad.ZeroPadding,
   }).toString()
   return base64EncodeUrl(encrypted)
}

function AesDecrypt(encryptedString, aesKey, aesIv) {
   const key = CryptoJS.enc.Utf8.parse(aesKey)
   const iv = CryptoJS.enc.Utf8.parse(aesIv)
   const decrypted = CryptoJS.AES.decrypt(base64DecodeUrl(encryptedString.trim()), key, {
      iv,
      padding: CryptoJS.pad.ZeroPadding,
   })
   return CryptoJS.enc.Utf8.stringify(decrypted)
}

function base64EncodeUrl(str) {
   return str.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "")
}

function base64DecodeUrl(str) {
   str = (str + "===").slice(0, str.length + (str.length % 4))
   return str.replace(/-/g, "+").replace(/_/g, "/")
}

const aesUtil = {
   AESEncrypt,
   AesDecrypt,
}

export default aesUtil
