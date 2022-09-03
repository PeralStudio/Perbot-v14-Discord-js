import { SlashCommandBuilder } from "discord.js";

const enviarmdCommand = new SlashCommandBuilder()
    .setName("enviarmd")
    .setDescription("Enviar un mensaje privado a un usuario como PerBot")
    .addUserOption((option) =>
        option
            .setName("usuario")
            .setDescription("Usuario al que enviar el mensaje.")
            .setRequired(true)
    )
    .addStringOption((option) =>
        option
            .setName("mensaje")
            .setDescription("Mensaje a enviar.")
            .setRequired(true)
    );

export default enviarmdCommand.toJSON();
