import { SlashCommandBuilder } from "discord.js";

const serverinfoCommand = new SlashCommandBuilder()
    .setName("serverinfo")
    .setDescription("Información del servidor.");

export default serverinfoCommand.toJSON();
