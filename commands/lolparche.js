import { SlashCommandBuilder } from "discord.js";

const lolparcheCommand = new SlashCommandBuilder()
    .setName("lolparche")
    .setDescription("Mostrar notas del parche");

export default lolparcheCommand.toJSON();
