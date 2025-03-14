 
const express = require("express");
const { verifyToken } = require("../middlewares/authMiddleware");
const Diet = require("../models/Diet");

const router = express.Router();

router.post("/", verifyToken, async (req, res) => {
  try {
    const diet = new Diet({ user: req.user.userId, meals: req.body.meals });
    await diet.save();
    res.status(201).json({ message: "Diet logged successfully", diet });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/", verifyToken, async (req, res) => {
  try {
    const diets = await Diet.find({ user: req.user.userId });
    res.json(diets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/:id", verifyToken, async (req, res) => {
  try {
    const diet = await Diet.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(diet);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/:id", verifyToken, async (req, res) => {
  try {
    await Diet.findByIdAndDelete(req.params.id);
    res.json({ message: "Diet deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
