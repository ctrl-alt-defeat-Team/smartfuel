const express = require("express");
var router = express.Router();
var verifyToken = require("./verifyToken");
var Product = require("../models/product");
var getUser = require("../functions/getUser");

router.post("/accept", verifyToken, async (req, res) => {
  try {
    const user = await getUser(req);
    //  console.log("user:", user);
    if (user.admin !== true) {
      return res.status(403).json({ error: "Forbidden" });
    }
    const product = await Product.findOneAndUpdate(
      { barcode: req.body.barcode },
      { $set: { approved: true } },
      { new: true }
    );
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    } else {
      res.json({ message: "Product approved successfully" });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/reject", verifyToken, async (req, res) => {
  try {
    const user = await getUser(req);
    if (user.admin !== true) {
      return res.status(403).json({ error: "Forbidden" });
    }
    const product = await Product.findOneAndDelete({
      barcode: req.body.barcode,
    });
    if (product === null) {
      return res.status(404).json({ error: "Product not found" });
    } else {
      res.json({ message: "Product rejected successfully" });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
