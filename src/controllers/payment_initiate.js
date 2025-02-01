import SignAPI from "../helpers/sign_api";
import SignUtil from "../helpers/sign_util";
import SunpayHelper from "../helpers/sunpay_helpers";
import qs from "qs";

const initiatePayment = async (req, res) => {
  let timeNow = Date.now();
  const minimumMoneyAllowed = parseInt(process.env.MINIMUM_MONEY);

  const queryParams = {
    money: parseInt(req.query.am),
    username: req.query.us || "",
    publickey: req.query.pk || "",
  };

  if (!queryParams.money || !(queryParams.money >= minimumMoneyAllowed)) {
    return res.status(400).json({
      message: `Money is Required and it should be ₹${minimumMoneyAllowed} or above!`,
      status: false,
      timeStamp: timeNow,
    });
  }

  if (!queryParams.username) {
    return res.status(400).json({
      message: `Query key us is required!`,
      status: false,
      timeStamp: timeNow,
    });
  }

  try {
    /*---- Code for publickey verification and internal key extraction ----*/

    const accountInfo = {
      internalKey: "kasksh32hhkasfc78dsfhkas89",
    };

    /*-------------------------------------------------------------------- */

    const orderId = ["MEM", queryParams.username, accountInfo.internalKey].join(
      "xx"
    );
    const date = SunpayHelper.getCurrentDate();

    const params = {
      version: "1.0",
      mch_id: process.env.SUNPAY_MERCHANT_ID,
      merchant_key: process.env.SUNPAY_MERCHANT_KEY,
      mch_order_no: orderId,
      pay_type: "102",
      trade_amount: queryParams.money,
      order_date: date,
      goods_name: "Deposit",
      notify_url: `${process.env.BASE_URL}/api/internal/payment_verify`,
      sign_type: SignAPI.signType,
      mch_return_msg: "",
      page_url: "https://www.google.com",
    };

    const signInfo = SignUtil.sortData(params);
    const sign = SignAPI.sign(signInfo, merchantKey);
    params.sign = sign;

    const result = await axios({
      method: "POST",
      url: "https://pay.sunpayonline.com/pay/web",
      data: qs.stringify(params),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    return res.send(result);
  } catch (error) {
    return res.status(500).send("An error occurred");
  }
};

export default initiatePayment;
