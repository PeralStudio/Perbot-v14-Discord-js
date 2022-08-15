import { SlashCommandBuilder } from "discord.js";

const helpCommand = new SlashCommandBuilder()
    .setName("help")
    .setDescription("Lista de comandos disponibles.");

export default helpCommand.toJSON();
