import { isEmpty } from "lodash";

class SignUtil {
  static sortData(sourceMap, link = "&") {
    if (isEmpty(link)) {
      link = "&";
    }

    const sortedMap = new Map([...sourceMap.entries()].sort());
    let returnStr = "";

    for (const [key, value] of sortedMap) {
      if (value !== null && value.toString().trim() !== "") {
        returnStr += `${key}=${value}${link}`;
      }
    }

    if (returnStr.endsWith(link)) {
      returnStr = returnStr.slice(0, -link.length);
    }

    return returnStr;
  }

  /**
   * Parse the string parameters into a Map
   * @param {string} strParams - The string parameters in the format: key1=value1&key2=value2....&keyN=valueN
   * @returns {Map<string, string>}
   */
  static parseParams(strParams) {
    const map = new Map();

    if (strParams !== "") {
      const list = strParams.split("&");
      for (const param of list) {
        const [key, value] = param.split("=");
        map.set(key, value);
      }
    }

    return map;
  }
}

export default SignUtil;
