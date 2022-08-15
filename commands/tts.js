import { SlashCommandBuilder } from "discord.js";

const ttsCommand = new SlashCommandBuilder()
    .setName("tts")
    .setDescription("Texto a voz.")
    .addStringOption((option) =>
        option
            .setName("texto")
            .setDescription("Texto a convertir en voz.")
            .setRequired(true)
    );

export default ttsCommand.toJSON();
