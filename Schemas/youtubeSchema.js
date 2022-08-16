import mongoose from "mongoose";

const youtube = new mongoose.Schema({
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

export default mongoose.model("youtube", youtube);
