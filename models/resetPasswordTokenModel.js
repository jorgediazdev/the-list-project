import mongoose, { models } from "mongoose";

const resetPasswordTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: [true, "Link is required."]
    },
    userId: {
        type: String,
        required: [true, "User is required."]
    },
    expiry: {
        type: Date,
        required: [true, "Expiry is required."]
    }
}, { timestamps: true });

export default models.ResetPasswordToken || mongoose.model("ResetPasswordToken", resetPasswordTokenSchema);