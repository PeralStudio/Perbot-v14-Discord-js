import { SlashCommandBuilder } from "discord.js";

const playCommand = new SlashCommandBuilder()
    .setName("play")
    .setDescription("Escuchar música")
    .addStringOption((option) =>
        option
            .setName("canción")
            .setDescription("Nombre de la canción")
            .setRequired(true)
    );
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

export default playCommand.toJSON();
