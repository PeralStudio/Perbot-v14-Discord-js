import { SlashCommandBuilder } from "discord.js";

const asciCommand = new SlashCommandBuilder()
    .setName("asci")
    .setDescription("Texto en ASCII.")
    .addStringOption((option) =>
        option
            .setName("texto")
            .setDescription("Texto a convertir en ASCII.")
            .setRequired(true)
    );

export default asciCommand.toJSON();
