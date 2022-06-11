const express = require("express");
const router = express.Router();
const tipController = require("./controllers/tip.controller");

router.get("/", tipController.getTips);
router.post("/", tipController.createTip);
router.get("/:recipe_id", tipController.getTipsByRecipeId);
router.patch("/:tip_id", tipController.updateTip);
router.patch("/:tip_id/likes", tipController.updateTipLike);
router.patch("/:tip_id/unlikes", tipController.cancelTipLike);
router.delete("/:tip_id", tipController.deleteTip);

module.exports = router;
