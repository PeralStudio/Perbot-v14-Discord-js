import { SlashCommandBuilder } from "discord.js";

const ytCommand = new SlashCommandBuilder()
    .setName("yt")
    .setDescription("Buscar un video en youtube.")
    .addStringOption((option) =>
        option
            .setName("texto")
            .setDescription("Texto a buscar en youtube.")
            .setRequired(true)
    );

export default ytCommand.toJSON();
