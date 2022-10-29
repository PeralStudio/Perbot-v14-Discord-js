import { SlashCommandBuilder } from "discord.js";

const playListYTCommand = new SlashCommandBuilder()
    .setName("playlistyt")
    .setDescription("Playlist Youtube")
    .addStringOption((option) =>
        option.setName("id").setDescription("ID del canal").setRequired(true)
    );

export default playListYTCommand.toJSON();
