import { SlashCommandBuilder } from "discord.js";

const morseCommand = new SlashCommandBuilder()
    .setName("morse")
    .setDescription("Convertir texto a morse.")
    .addStringOption((option) =>
        option
            .setName("texto")
            .setDescription("Texto a convertir en morse.")
            .setRequired(true)
    );

export default morseCommand.toJSON();
