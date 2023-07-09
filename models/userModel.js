import mongoose, { models } from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name field is required."]
    },
    email: {
        type: String,
        required: [true, "Email field is required."]
    },
    password: {
        type: String,
        required: [true, "Password field is required."],
    },
    lists: {
        type: [mongoose.Schema.Types.ObjectId]
    }
}, { timestamps: true });

export default models.User || mongoose.model("User", userSchema);