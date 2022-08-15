import { SlashCommandBuilder } from "discord.js";

const lolCommand = new SlashCommandBuilder()
    .setName("lol")
    .setDescription("Mostrar información de un Invocador.")

    .addStringOption((option) =>
        option
            .setName("invocador")
            .setDescription("Invocador a mostrar la información.")
            .setRequired(true)
    );

export default lolCommand.toJSON();
