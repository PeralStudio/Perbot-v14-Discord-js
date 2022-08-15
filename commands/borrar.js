import { SlashCommandBuilder } from "discord.js";

const borrarCommand = new SlashCommandBuilder()
    .setName("borrar")
    .setDescription("Borrar mensajes.")
    .addNumberOption((option) =>
        option
            .setName("nº-mensajes")
            .setDescription("Nº de mensajes a borrar.")
            .setRequired(true)
    );

export default borrarCommand.toJSON();
