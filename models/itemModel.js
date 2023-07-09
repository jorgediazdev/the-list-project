import mongoose, { models } from "mongoose";

const itemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title field is required."]
    },
    link: {
        type: String,
    },
    description: {
        type: String,
        default: null
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Owner field is required."]
    },
    obtained: {
        type: Boolean,
        default: false
    },
    obtainedBy: {
        type: mongoose.Schema.Types.ObjectId,
        default: null
    },
    obtainedDate: {
        type: Date,
        default: null
    }
}, {
    timestamps: true
});

export default models.Item || mongoose.model("Item", itemSchema);