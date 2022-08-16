import mongoose from "mongoose";

const twitch = new mongoose.Schema({
    user: {
        type: String,
        required: true,
    },
    titulo: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
});

export default mongoose.model("twitch", twitch);
