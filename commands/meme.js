import { SlashCommandBuilder } from "discord.js";

const memeCommand = new SlashCommandBuilder()
    .setName("meme")
    .setDescription("Meme random reddit.");

export default memeCommand.toJSON();
