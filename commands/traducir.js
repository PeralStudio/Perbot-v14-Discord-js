import { SlashCommandBuilder } from "discord.js";

const traducirCommand = new SlashCommandBuilder()
    .setName("traducir")
    .setDescription("Traducir un texto.")

    .addStringOption((option) =>
        option
            .setName("texto")
            .setDescription("Texto a traducir.")
            .setRequired(true)
    );

export default traducirCommand.toJSON();
