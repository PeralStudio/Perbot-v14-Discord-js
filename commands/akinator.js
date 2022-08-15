import { SlashCommandBuilder } from "discord.js";

const akinatorCommand = new SlashCommandBuilder()
    .setName("akinator")
    .setDescription("Jugar a Akinator");

export default akinatorCommand.toJSON();
