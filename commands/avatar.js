import { SlashCommandBuilder } from "discord.js";

const avatarCommand = new SlashCommandBuilder()
    .setName("avatar")
    .setDescription("Muestra el avatar de un usuario.")
    .addUserOption((option) =>
        option
            .setName("usuario")
            .setDescription("Usuario a mostrar el avatar.")
            .setRequired(true)
    );

export default avatarCommand.toJSON();
