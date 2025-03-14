 
const mongoose = require("mongoose");

const DietSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  meals: [
    {
      name: { type: String, required: true },
      calories: { type: Number, required: true },
      proteins: { type: Number, required: true },
      carbs: { type: Number, required: true },
      fats: { type: Number, required: true },
      time: { type: String, required: true },
    },
  ],
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Diet", DietSchema);
