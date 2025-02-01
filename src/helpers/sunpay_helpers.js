import moment from "moment";
import crypto from "crypto";

/**
 * MD5 encryption
 * @param {string} signSource
 * @returns {string}
 */
function calculate(signSource) {
  const md5 = crypto.createHash("md5");
  md5.update(signSource, "utf8");
  const buffer = md5.digest();
  return buffer.toString("hex");
}

/**
 * Sign the signSource with the given key
 * @param {string} signSource
 * @param {string} key
 * @returns {string}
 */
function sign(signSource, key) {
  if (key) {
    signSource += `&key=${key}`;
  }
  return calculate(signSource);
}

/**
 * Validate the signature using the signSource, key, and returnedSignature
 * @param {string} signSource
 * @param {string} key
 * @param {string} returnedSignature
 * @returns {boolean}
 */
function validateSignByKey(signSource, key, returnedSignature) {
  if (key) {
    signSource += `&key=${key}`;
  }
  const signKey = calculate(signSource);
  console.log(`signKey=${signKey}`);
  return signKey === returnedSignature;
}

/**
 * A function to get the current date and time in the format "YYYY-MM-DD H:mm:ss".
 *
 * @module utils/dateUtils
 * @requires moment
 *
 * @returns {string} The current date and time in the format "YYYY-MM-DD H:mm:ss".
 *
 * @example
 * const currentDateTime = getCurrentDate();
 * console.log(currentDateTime); // Output: "2023-05-10 14:30:00"
 */
const getCurrentDate = () => {
  return moment().format("YYYY-MM-DD H:mm:ss");
};

const SunpayHelper = {
  sign,
  validateSignByKey,
  getCurrentDate,
};

export default SunpayHelper;
