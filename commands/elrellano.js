import { SlashCommandBuilder } from "discord.js";

const elrellanoCommand = new SlashCommandBuilder()
    .setName("elrellano")
    .setDescription("Último video de Elrellano.com");

export default elrellanoCommand.toJSON();
