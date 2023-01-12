import { SlashCommandBuilder } from "discord.js";

const triviaCommand = new SlashCommandBuilder()
    .setName("trivial")
    .setDescription("Jugar al Trivial");

export default triviaCommand.toJSON();
