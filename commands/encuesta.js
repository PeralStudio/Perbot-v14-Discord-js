import { SlashCommandBuilder } from "discord.js";

const encuestaCommand = new SlashCommandBuilder()
    .setName("encuesta")
    .setDescription("Meme random reddit.")
    .addStringOption((option) =>
        option
            .setName("pregunta")
            .setDescription("Pregunta de la encuesta.")
            .setRequired(true)
    )
    .addStringOption((option) =>
        option
            .setName("opción-1")
            .setDescription("Respuesta 1 de la encuesta.")
            .setRequired(true)
    )
    .addStringOption((option) =>
        option
            .setName("opción-2")
            .setDescription("Respuesta 2 de la encuesta.")
            .setRequired(true)
    );

export default encuestaCommand.toJSON();
