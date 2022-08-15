import { SlashCommandBuilder } from "discord.js";

const minasCommand = new SlashCommandBuilder()
    .setName("minas")
    .setDescription("Jugar al buscaminas.");

export default minasCommand.toJSON();
