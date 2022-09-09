import { SlashCommandBuilder } from "discord.js";

const elrellanoCommand = new SlashCommandBuilder()
    .setName("elrellano")
    .setDescription("Video de Elrellano del 1 al 6")
    .addNumberOption((option) =>
        option
            .setName("1-6")
            .setDescription("Video del 1 al 6 de elrellano.com")
            .setRequired(true)
    );

export default elrellanoCommand.toJSON();
