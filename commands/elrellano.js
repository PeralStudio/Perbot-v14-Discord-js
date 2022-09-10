import { SlashCommandBuilder } from "discord.js";

const elrellanoCommand = new SlashCommandBuilder()
    .setName("elrellano")
    .setDescription("Vídeos de Elrellano")
    .addNumberOption((option) =>
        option
            .setName("página")
            .setDescription("Página a mostrar")
            .setRequired(true)
    );

export default elrellanoCommand.toJSON();
