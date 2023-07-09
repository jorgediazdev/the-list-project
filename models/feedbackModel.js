import mongoose, { models } from "mongoose";

const feedbackSchema = new mongoose.Schema({
  type: {
    type: String,
    require: [true, "Type is required."]
  },
  message: {
    type: String,
    require: [true, "Message is required."]
  }
}, {
  timestamps: true
});

export default models.Feedback || mongoose.model("Feedback", feedbackSchema);