import mongoose from "mongoose";

const VerificationSchema = new mongoose.Schema(
  {
    trustScore: Number,
    hasWatermark: Boolean,
    source: String,
    creator: String,
    modifications: Number,
    layers: [
      {
        name: String,
        status: String,
        confidence: Number
      }
    ],
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);


const Verification =
  mongoose.models.Verification ||
  mongoose.model("Verification", VerificationSchema);

export default Verification;
