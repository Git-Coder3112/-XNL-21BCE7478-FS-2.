 
const Diet = require("../models/Diet");


const getAllDiets = async (req, res) => {
  try {
    const diets = await Diet.find();
    res.status(200).json(diets);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};


const getDietById = async (req, res) => {
  try {
    const diet = await Diet.findById(req.params.id);
    if (!diet) return res.status(404).json({ message: "Diet not found" });
    res.status(200).json(diet);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const createDiet = async (req, res) => {
  try {
    const newDiet = new Diet(req.body);
    const savedDiet = await newDiet.save();
    res.status(201).json(savedDiet);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};


const updateDiet = async (req, res) => {
  try {
    const updatedDiet = await Diet.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(updatedDiet);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};


const deleteDiet = async (req, res) => {
  try {
    await Diet.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Diet deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = {
  getAllDiets,
  getDietById,
  createDiet,
  updateDiet,
  deleteDiet,
};
