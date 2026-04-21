const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
  title: String,
  location: String,
  price: Number,
  size: String,
  amenities: [String],
  images: [String],
  status: {
    type: String,
    enum: ["Available", "Sold"],
    default: "Available"
  },
  user: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User"
},
  agent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
}, { timestamps: true });

module.exports = mongoose.model("Property", propertySchema);