const express = require("express");

const router = express.Router();

const { requireSignin } = require("../middlewares");

const {
  createConnectAccount,
  getAccountStatus,
  getAccountBalance,
  payoutSetting,
  stripeSessionId,
  stripeSuccess,
} = require("../controllers/stripeController");

router.post("/create-connect-account", requireSignin, createConnectAccount);
router.post("/get-account-status", requireSignin, getAccountStatus);
router.post("/get-account-balance", requireSignin, getAccountBalance);
router.post("/payout-setting", requireSignin, payoutSetting);
router.post("/stripe-session-id", requireSignin, stripeSessionId);
// order
router.post("/stripe-success", requireSignin, stripeSuccess);

module.exports = router;
