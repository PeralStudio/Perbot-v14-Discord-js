import { SlashCommandBuilder } from "discord.js";

const bigtextCommand = new SlashCommandBuilder()
    .setName("bigtext")
    .setDescription("Texto en BigText.")
    .addStringOption((option) =>
        option
            .setName("texto")
            .setDescription("Texto a convertir en bigtext.")
            .setRequired(true)
    );

export default bigtextCommand.toJSON();
