// signAPI.js
import { isNotBlank } from "lodash";
import crypto from "crypto";

class SignAPI {
  /**
   * MD5 encryption
   * @param {string} signSource
   * @returns {string}
   */

  static signType = "MD5";

  static calculate(signSource) {
    try {
      const md = crypto.createHash("md5");
      md.update(signSource, "utf8");
      const buffer = md.digest();
      let result = "";
      for (let offset = 0; offset < buffer.length; offset++) {
        let i = buffer[offset];
        if (i < 0) i += 256;
        if (i < 16) result += "0";
        result += i.toString(16);
      }
      return result;
    } catch (e) {
      throw new Error(e);
    }
  }

  /**
   * Sign the signSource with the given key
   * @param {string} signSource
   * @param {string} key
   * @returns {string}
   */
  static sign(signSource, key) {
    if (isNotBlank(key)) {
      signSource = `${signSource}&key=${key}`;
    }
    return this.calculate(signSource);
  }

  /**
   * Validate the signature using the signSource, key, and returnedSignature
   * @param {string} signSource
   * @param {string} key
   * @param {string} returnedSignature
   * @returns {boolean}
   */
  static validateSignByKey(signSource, key, returnedSignature) {
    if (isNotBlank(key)) {
      signSource = `${signSource}&key=${key}`;
    }
    const signKey = this.calculate(signSource);
    console.log(`signKey=${signKey}`);
    return signKey === returnedSignature;
  }
}

export default SignAPI;
