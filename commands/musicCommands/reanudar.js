import { SlashCommandBuilder } from "discord.js";

const reanudarCommand = new SlashCommandBuilder()
    .setName("reanudar")
    .setDescription("Reanudar Canción");
// .addChannelOption((option) =>
//     option
//         .setName("modal")
//         .setDescription("Modal command")
//         .setRequired(true)
// )
// .addBooleanOption((option) =>
//     option.setName("opc1").setDescription("Opcion 1").setRequired(true)
// )
// .addIntegerOption((option) =>
//     option.setName("opc2").setDescription("Opcion 2")
// )
// .addIntegerOption((option) =>
//     option.setName("file").setDescription("file")
// );
// .addStringOption((option) =>
//     option.setName("text").setDescription("text").setRequired(true)
// );

export default reanudarCommand.toJSON();
