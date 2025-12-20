import mongoose from "mongoose";

const layerSchema = new mongoose.Schema({
  name: String,
  status: String,
  confidence: Number
});

const verificationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false
  },
  trustScore: Number,
  source: String,
  creator: String,
  modifications: Number,
  layers: [layerSchema],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Verification", verificationSchema);
