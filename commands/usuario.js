import { SlashCommandBuilder } from "discord.js";

const arderCommand = new SlashCommandBuilder()
    .setName("usuario")
    .setDescription("Mostar información de un usuario.")
    .addUserOption((option) =>
        option
            .setName("usuario")
            .setDescription("Usuario a mostrar la información.")
            .setRequired(true)
    );

export default arderCommand.toJSON();
