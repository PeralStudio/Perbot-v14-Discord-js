import mongoose from "mongoose";

const elrellanoSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    summary: {
        type: String,
    },
    videoUrl: {
        type: String,
    },
    imageUrl: {
        type: String,
    },
    date: {
        type: String,
    },
});

export default mongoose.model("elrellanovideo", elrellanoSchema);
