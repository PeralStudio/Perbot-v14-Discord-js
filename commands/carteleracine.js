import { SlashCommandBuilder } from "discord.js";

const carteleracineCommand = new SlashCommandBuilder()
    .setName("carteleracine")
    .setDescription("Ver la cartelera de cine de hoy.");

export default carteleracineCommand.toJSON();
