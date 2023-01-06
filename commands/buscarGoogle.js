import { SlashCommandBuilder } from "discord.js";

const buscarGoogleCommand = new SlashCommandBuilder()
    .setName("google")
    .setDescription("Buscar en Google")
    .addStringOption((option) =>
        option
            .setName("búsqueda")
            .setDescription("Texto para buscar en Google.")
            .setRequired(true)
    );

export default buscarGoogleCommand.toJSON();
