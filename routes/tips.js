const express = require("express");
const router = express.Router();
const tipController = require("./controllers/tip.controller");
const { authenticate } = require("./middlewares/auth.middleware");

router.get("/", authenticate, tipController.getTips);
router.get("/top10", authenticate, tipController.getTopTenTips);
router.post("/", authenticate, tipController.createTip);
router.get("/:recipe_id", authenticate, tipController.getTipsByRecipeId);
router.patch("/:tip_id", authenticate, tipController.updateTip);
router.patch("/:tip_id/likes", authenticate, tipController.updateTipLike);
router.patch("/:tip_id/unlikes", authenticate, tipController.cancelTipLike);
router.delete("/:tip_id", authenticate, tipController.deleteTip);

module.exports = router;
