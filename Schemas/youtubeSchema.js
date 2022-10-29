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
    video_ID: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    playListAuthorID: {
        type: String,
    },
    playListCount: {
        type: Number,
    },
    playlistUrl: {
        type: String,
    },
});

export default mongoose.model("youtube", youtube);
