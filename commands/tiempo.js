import { SlashCommandBuilder } from "discord.js";

const tiempoCommand = new SlashCommandBuilder()
    .setName("tiempo")
    .setDescription("Mostrar el tiempo actual.")
    .addStringOption((option) =>
        option
            .setName("ciudad")
            .setDescription("Ciudad a mostrar el tiempo.")
            .setRequired(true)
    );

export default tiempoCommand.toJSON();
