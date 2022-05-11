const express = require("express");
const router = express.Router();

const purchasingController = require("../controllers/PurchasingController");
const verifyToken = require("../middleware/auth");

router.post("/purchase", purchasingController.purchase);
// router.put("/get-credit", verifyToken, enrollingController.getCredit);
router.get("/my-purchase", purchasingController.getMyPurchase);

module.exports = router;
