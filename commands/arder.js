import { SlashCommandBuilder } from "discord.js";

const arderCommand = new SlashCommandBuilder()
    .setName("arder")
    .setDescription("Ardiendo en pasión.")
    .addUserOption((option) =>
        option
            .setName("usuario")
            .setDescription("Usuario que arderá.")
            .setRequired(true)
    );

export default arderCommand.toJSON();
