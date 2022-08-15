import { SlashCommandBuilder } from "discord.js";

const volumenCommand = new SlashCommandBuilder()
    .setName("volumen")
    .setDescription("Cambiar volumen")
    .addIntegerOption((option) =>
        option
            .setName("volumen")
            .setDescription("Cambiar volumen de la Reproducción")
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
//     option.setName("file").setDescription("file")
// );
// .addStringOption((option) =>
//     option.setName("text").setDescription("text").setRequired(true)
// );

export default volumenCommand.toJSON();
