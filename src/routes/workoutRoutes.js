 
const express = require("express");
const { verifyToken } = require("../middlewares/authMiddleware");
const Workout = require("../models/Workout");

const router = express.Router();

router.post("/", verifyToken, async (req, res) => {
  try {
    const workout = new Workout({ user: req.user.userId, exercises: req.body.exercises });
    await workout.save();
    res.status(201).json({ message: "Workout logged successfully", workout });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/", verifyToken, async (req, res) => {
  try {
    const workouts = await Workout.find({ user: req.user.userId });
    res.json(workouts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/:id", verifyToken, async (req, res) => {
  try {
    const workout = await Workout.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(workout);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/:id", verifyToken, async (req, res) => {
  try {
    await Workout.findByIdAndDelete(req.params.id);
    res.json({ message: "Workout deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
