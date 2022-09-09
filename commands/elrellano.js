import { SlashCommandBuilder } from "discord.js";

const elrellanoCommand = new SlashCommandBuilder()
    .setName("elrellano")
    .setDescription("Vídeo de Elrellano del 1 al 6")
    .addNumberOption((option) =>
        option
            .setName("1-6")
            .setDescription("Vídeo del 1 al 6 de elrellano.com")
            .setRequired(true)
    );

export default elrellanoCommand.toJSON();
