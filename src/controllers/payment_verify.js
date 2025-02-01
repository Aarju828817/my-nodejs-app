import SignAPI from "../helpers/sign_api";
import SignUtil from "../helpers/sign_util";

const verifyPayment = async (req, res) => {
  const {
    tradeResult,
    mchId,
    mchOrderNo,
    oriAmount,
    amount,
    orderDate,
    orderNo,
    sign,
    signType,
  } = req.body;

  const params = {
    tradeResult,
    mchId,
    mchOrderNo,
    oriAmount,
    amount,
    orderDate,
    orderNo,
    amount,
  };

  const signStr = SignUtil.sortData(params);
  const signInfo = signStr;

  let result = false;

  if (signType === "MD5") {
    result = SignAPI.validateSignByKey(signInfo, merchantKey, sign);
  } else {
    console.log("Invalid signType");
    return res.send("Invalid signType!");
  }

  if (result) {
    // call api and store logs
    return res.send("success");
  } else {
    console.log("Signature Error");
    //store logs
    return res.send("Signature Error");
  }
};

export default verifyPayment;
