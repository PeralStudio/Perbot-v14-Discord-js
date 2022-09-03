import { SlashCommandBuilder } from "discord.js";

const emailCommand = new SlashCommandBuilder()
    .setName("email")
    .setDescription("Enviar Correo.")
    .addStringOption((option) =>
        option
            .setName("destinatario")
            .setDescription("Texto a enviar.")
            .setRequired(true)
    )
    .addStringOption((option) =>
        option
            .setName("asunto")
            .setDescription("Texto a enviar.")
            .setRequired(true)
    )
    .addStringOption((option) =>
        option
            .setName("contenido")
            .setDescription("Texto a enviar.")
            .setRequired(true)
    );

export default emailCommand.toJSON();
