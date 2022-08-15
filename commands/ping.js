import { SlashCommandBuilder } from "discord.js";

const pingcommand = new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Calcular ping del bot.");

export default pingcommand.toJSON();
