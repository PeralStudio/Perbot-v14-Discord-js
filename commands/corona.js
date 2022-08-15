import { SlashCommandBuilder } from "discord.js";

const coronaCommand = new SlashCommandBuilder()
    .setName("corona")
    .setDescription("Información sobre el coronavirus.")

    .addStringOption((option) =>
        option
            .setName("país")
            .setDescription("País en Ingles a mostrar la información.")
            .setRequired(true)
    );

export default coronaCommand.toJSON();
