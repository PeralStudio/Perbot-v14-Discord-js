import mongoose from "mongoose";

const playListYoutubeSchema = new mongoose.Schema({
    playListAuthor: {
        type: String,
    },
    playListAuthorID: {
        type: String,
    },
    playListTitle: {
        type: String,
    },
    playlistUrl: {
        type: String,
    },
    playListCount: {
        type: Number,
    },
});

export default mongoose.model("playListYoutube", playListYoutubeSchema);
