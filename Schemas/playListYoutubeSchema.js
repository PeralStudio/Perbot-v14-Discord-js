import mongoose from "mongoose";

const playListYoutubeSchema = new mongoose.Schema({
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

export default mongoose.model("playListYoutube", playListYoutubeSchema);
