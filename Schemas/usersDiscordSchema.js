import mongoose from "mongoose";

const usersDiscordSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
    },
    user: {
        type: String,
        required: true,
    },
    discriminator: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
});

export default mongoose.model("user", usersDiscordSchema);
