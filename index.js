import config from "./config.js";
import {
    REST,
    Routes,
    ActivityType,
    EmbedBuilder,
    IntentsBitField,
    Client,
    GatewayIntentBits,
} from "discord.js";

import fetch from "node-fetch";
import figlet from "figlet";
import dayjs from "dayjs";

// import mongoose from "mongoose";
// import nodeSuperFetch from "node-superfetch";
// import twitch from "./schemas/twitchSchema.js";

import red from "reddit-fetch";
import Minesweeper from "discord.js-minesweeper";
import akinator from "discord.js-akinator";

import translate from "node-google-translate-skidz";
import YouTube from "youtube-node";

import moment from "moment";
// require("moment-duration-format")
// require("moment/min/locales.min")

import { Player } from "discord-player";

//Commands
import playCommand from "./commands/musicCommands/play.js";
import pauseCommand from "./commands/musicCommands/pause.js";
import reanudarCommand from "./commands/musicCommands/reanudar.js";
import siguienteCommand from "./commands/musicCommands/siguiente.js";
import anteriorCommand from "./commands/musicCommands/anterior.js";
import colaCommand from "./commands/musicCommands/cola.js";
import stopCommand from "./commands/musicCommands/stop.js";
import volumeCommand from "./commands/musicCommands/volumen.js";

import akinatorCommand from "./commands/akinator.js";
import lolCommand from "./commands/lol.js";
import lolparcheCommand from "./commands/lolparche.js";
import memeCommand from "./commands/meme.js";
import encuestaCommand from "./commands/encuesta.js";
import ytCommand from "./commands/yt.js";
import asciCommand from "./commands/asci.js";
import avatarCommand from "./commands/avatar.js";
import arderCommand from "./commands/arder.js";
import usuarioCommand from "./commands/usuario.js";
import tiempoCommand from "./commands/tiempo.js";
import bigtextCommand from "./commands/bigtext.js";
import morseCommand from "./commands/morse.js";
import ttsCommand from "./commands/tts.js";
import minasCommand from "./commands/minas.js";
import serverinfoCommand from "./commands/serverinfo.js";
import coronaCommand from "./commands/corona.js";
import traducirCommand from "./commands/traducir.js";
import pingCommand from "./commands/ping.js";
import borrarCommand from "./commands/borrar.js";
import enviarmdCommand from "./commands/enviarmd.js";
import helpCommand from "./commands/help.js";

const commands = [
    playCommand,
    pauseCommand,
    reanudarCommand,
    siguienteCommand,
    anteriorCommand,
    colaCommand,
    stopCommand,
    volumeCommand,
    akinatorCommand,
    lolCommand,
    lolparcheCommand,
    memeCommand,
    encuestaCommand,
    ytCommand,
    asciCommand,
    avatarCommand,
    arderCommand,
    usuarioCommand,
    tiempoCommand,
    bigtextCommand,
    morseCommand,
    ttsCommand,
    minasCommand,
    serverinfoCommand,
    coronaCommand,
    traducirCommand,
    pingCommand,
    borrarCommand,
    enviarmdCommand,
    helpCommand,
];

const versionbot = "PerBot v2.0 Peralstudio.com";
const { prefix, lolApi, youtubeKey, mongoUrl } = config;

// mongoose
//     .connect(
//         mongoUrl,
//         {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//         }
//     )
//     .then(() => console.log("Conectado a MongoDB"))
//     .catch((err) => console.log(err));

const rest = new REST({ version: "10" }).setToken(config.token);

(async () => {
    try {
        console.log("Started refreshing application (.) commands.");

        await rest.put(
            Routes.applicationGuildCommands(config.CLIENT_ID, config.GUILD_ID),
            {
                body: commands,
            }
        );

        console.log("Successfully reloaded application (.) commands.");
    } catch (error) {
        console.error(error);
    }
})();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildPresences,
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
        GatewayIntentBits.GuildVoiceStates,
    ],
});

client.on("ready", async () => {
    console.log(`Bot conectado como ${client.user.tag}!`);
    client.user.setPresence({
        activities: [{ name: `Achant | /help`, type: ActivityType.Playing }],
        status: "online",
    });

    // setInterval(async function () {
    //     console.log("Comprobando Twitch Streams");
    //     let userStrem = "illojuan";

    // const uptime = await nodeSuperFetch.get(
    //     `https://decapi.me/twitch/uptime/${userStrem}`
    // );
    //     const avatar = await nodeSuperFetch.get(
    //         `https://decapi.me/twitch/avatar/${userStrem}`
    //     );
    //     const viewers = await nodeSuperFetch.get(
    //         `https://decapi.me/twitch/viewercount/${userStrem}`
    //     );
    //     const title = await nodeSuperFetch.get(
    //         `https://decapi.me/twitch/title/${userStrem}`
    //     );
    //     const game = await nodeSuperFetch.get(
    //         `https://decapi.me/twitch/game/${userStrem}`
    //     );

    //     let data = await twitch.findOne({ user, titulo: title.body });

    //     if (uptime.body !== `${userStrem} is offline`) {
    //         const embed = new EmbedBuilder()
    //             .setAuthor({
    //                 name: `${userStrem}`,
    //                 iconURL: `${avatar.body}`,
    //             })
    //             .setTitle(`${title.body}`)
    //             .setThumbnail(`${avatar.body}`)
    //             .setURL(`https://twitch.tv/${userStrem}`)
    //             .addFields(
    //                 {
    //                     name: "Jugando a",
    //                     value: `${game.body}`,
    //                     inline: true,
    //                 },
    //                 {
    //                     name: "Viewers",
    //                     value: `${viewers.body}`,
    //                     inline: true,
    //                 }
    //             )
    //             .setImage(
    //                 `https://static-cdn.jtvnw.net/previews-ttv/live_user_${userStrem}-320x180.jpg`
    //             )
    //             .setColor(0x00ff00);

    //         if (!data) {
    //             const newData = new twitch({
    //                 user,
    //                 titulo: `${title.body}`,
    //             });

    //             await client.channels.cache.get("1008006504244334722").send({
    //                 content: `${userStrem} esta en directo jugando a **${game.body}** \n https://twitch.tv/${userStrem}`,
    //                 embeds: [embed],
    //             });

    //             return await newData.save();
    //         }

    //         if (data.titulo === `${title.body}`) {
    //             return;
    //         }

    //         await client.channels.cache.get("1008006504244334722").send({
    //             content: `${userStrem} esta en directo jugando a **${game.body}** \n https://twitch.tv/${userStrem}`,
    //             embeds: [embed],
    //         });

    //         await twitch.findOneAndUpdate({ user }, { titulo: title.body });
    //     }
    // }, 3000);
});

const player = new Player(client);

let queueToList = [];
// add the trackStart event so when a song will be played this message will be sent
player.on("trackStart", async (queue, track) =>
    queue.metadata.channel.send(`▶️ Reproduciendo **${track.title}**!`)
);

client.on("interactionCreate", async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    //COMANDO PLAY
    if (interaction.commandName === "play") {
        if (!interaction.member.voice.channelId)
            return await interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setTitle(`¡No estás en un canal de voz!`)
                        .setColor("#EA3939")
                        .setTimestamp()
                        .setFooter({
                            text: versionbot,
                            iconURL: client.user.displayAvatarURL(),
                        }),
                ],
                ephemeral: true,
            });
        if (
            interaction.guild.members.me.voice.channelId &&
            interaction.member.voice.channelId !==
                interaction.guild.members.me.voice.channelId
        )
            return await interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setTitle(`¡No estás en mi canal de voz!`)
                        .setColor("#EA3939")
                        .setTimestamp()
                        .setFooter({
                            text: versionbot,
                            iconURL: client.user.displayAvatarURL(),
                        }),
                ],
                ephemeral: true,
            });

        const query = interaction.options.get("canción").value;
        const queue = player.createQueue(interaction.guild, {
            metadata: {
                channel: interaction.channel,
            },
            leaveOnEmptyCooldown: 60000,
        });

        // verify vc connection
        try {
            if (!queue.connection)
                await queue.connect(interaction.member.voice.channel);
        } catch {
            queue.destroy();
            return await interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setTitle(`¡No se pudo unir a tu canal de voz!`)
                        .setColor("#EA3939")
                        .setTimestamp()
                        .setFooter({
                            text: versionbot,
                            iconURL: client.user.displayAvatarURL(),
                        }),
                ],
                ephemeral: true,
            });
        }

        await interaction.deferReply();
        const track = await player
            .search(query, {
                requestedBy: interaction.user,
            })
            .then((x) => x.tracks[0]);
        if (!track)
            return await interaction.followUp({
                embeds: [
                    new EmbedBuilder()
                        .setTitle(`❌ ¡Canción **${query}** no encontrada!`)
                        .setColor("#EA3939")
                        .setTimestamp()
                        .setFooter({
                            text: versionbot,
                            iconURL: client.user.displayAvatarURL(),
                        }),
                ],
            });

        queue.play(track);
        queueToList.push(track.title);

        if (queueToList.length > 1) {
            return await interaction.followUp({
                embeds: [
                    new EmbedBuilder()
                        .setTitle(
                            `⏱️ ¡Canción añadida a la cola: **${track.title}**!`
                        )
                        .setDescription(
                            "**" +
                                queueToList.length +
                                "** canciones en la cola. \nComando: `/cola` para ver la cola de reproducción."
                        )
                        .setColor("#EA3939")
                        .setTimestamp()
                        .setFooter({
                            text: versionbot,
                            iconURL: client.user.displayAvatarURL(),
                        }),
                ],
            });
        } else {
            return await interaction.followUp({
                embeds: [
                    new EmbedBuilder()
                        .setTitle(`⏱️ ¡Cargando canción **${track.title}**!`)
                        .addFields([
                            {
                                name: "Comando: `/cola`",
                                value: "Ver la cola de reproducción.",
                            },
                            {
                                name: "Comando: `/anterior`",
                                value: "Reproducir la canción anterior.",
                            },
                            {
                                name: "Comando: `/siguiente`",
                                value: "Reproducir la canción siguiente.",
                            },
                            {
                                name: "Comando: `/pause`",
                                value: "Pausar la reproducción.",
                            },
                            {
                                name: "Comando: `/reanudar`",
                                value: "Reanudar la canción actual.",
                            },
                            {
                                name: "Comando: `/stop` ",
                                value: "Detener la reproducción.",
                            },
                        ])
                        .setColor("#EA3939")
                        .setTimestamp()
                        .setFooter({
                            text: versionbot,
                            iconURL: client.user.displayAvatarURL(),
                        }),
                ],
            });
        }
    }

    //COMANDO PAUSE
    if (interaction.commandName === "pause") {
        const queue = player.getQueue(interaction.guild);
        if (!queue)
            return await interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setTitle(`¡No hay ninguna canción reproduciendose!`)
                        .setColor("#EA3939")
                        .setTimestamp()
                        .setFooter({
                            text: versionbot,
                            iconURL: client.user.displayAvatarURL(),
                        }),
                ],
                ephemeral: true,
            });
        queue.setPaused(true);
        return await interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setTitle(`⏸️ ¡Canción pausada!`)
                    .setColor("#EA3939")
                    .setTimestamp()
                    .setFooter({
                        text: versionbot,
                        iconURL: client.user.displayAvatarURL(),
                    }),
            ],
        });
    }

    //COMANDO REANUDAR
    if (interaction.commandName === "reanudar") {
        const queue = player.getQueue(interaction.guild);
        if (!queue)
            return await interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setTitle(`¡No hay ninguna canción reproduciendose!`)
                        .setColor("#EA3939")
                        .setTimestamp()
                        .setFooter({
                            text: versionbot,
                            iconURL: client.user.displayAvatarURL(),
                        }),
                ],
                ephemeral: true,
            });
        queue.setPaused(false);
        return await interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setTitle(` ▶️ ¡Cancion reanudada!`)
                    .setColor("#EA3939")
                    .setTimestamp()
                    .setFooter({
                        text: versionbot,
                        iconURL: client.user.displayAvatarURL(),
                    }),
            ],
        });
    }

    //COMANDO SIGUIENTE
    if (interaction.commandName === "siguiente") {
        const queue = player.getQueue(interaction.guild);
        if (!queue)
            return await interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setTitle(`¡No hay ninguna canción reproduciendose!`)
                        .setColor("#EA3939")
                        .setTimestamp()
                        .setFooter({
                            text: versionbot,
                            iconURL: client.user.displayAvatarURL(),
                        }),
                ],
                ephemeral: true,
            });
        if (queueToList.length > 1) {
            queue.skip();
            return await interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setTitle(`⏭️ ¡Canción saltada!`)
                        .setColor("#EA3939")
                        .setTimestamp()
                        .setFooter({
                            text: versionbot,
                            iconURL: client.user.displayAvatarURL(),
                        }),
                ],
            });
        } else {
            return await interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setTitle(`¡No hay mas canciones!`)
                        .setColor("#EA3939")
                        .setTimestamp()
                        .setFooter({
                            text: versionbot,
                            iconURL: client.user.displayAvatarURL(),
                        }),
                ],
                ephemeral: true,
            });
        }
    }

    //COMANDO ANTERIOR
    if (interaction.commandName === "anterior") {
        const queue = player.getQueue(interaction.guild);
        if (!queue)
            return await interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setTitle(`¡No hay ninguna canción reproduciendose!`)
                        .setColor("#EA3939")
                        .setTimestamp()
                        .setFooter({
                            text: versionbot,
                            iconURL: client.user.displayAvatarURL(),
                        }),
                ],
                ephemeral: true,
            });
        if (queue.previousTracks.length > 1) {
            queue.back();
            return await interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setTitle(`⏮️ ¡Canción anterior!`)
                        .setColor("#EA3939")
                        .setTimestamp()
                        .setFooter({
                            text: versionbot,
                            iconURL: client.user.displayAvatarURL(),
                        }),
                ],
            });
        } else {
            return await interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setTitle(`¡No hay mas canciones!`)
                        .setColor("#EA3939")
                        .setTimestamp()
                        .setFooter({
                            text: versionbot,
                            iconURL: client.user.displayAvatarURL(),
                        }),
                ],
                ephemeral: true,
            });
        }
    }

    //COMANDO COLA
    if (interaction.commandName === "cola") {
        const queue = player.getQueue(interaction.guild);
        if (!queue)
            return await interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setTitle(`¡No hay ninguna canción en cola!`)
                        .setColor("#EA3939")
                        .setTimestamp()
                        .setFooter({
                            text: versionbot,
                            iconURL: client.user.displayAvatarURL(),
                        }),
                ],
                ephemeral: true,
            });
        const numList = 0;
        const embed = new EmbedBuilder()
            .setTitle(`Cola de canciones [${queueToList.length}]`)
            .setThumbnail(client.user.displayAvatarURL())
            .setDescription(
                queueToList.map((x, i) => `[${i + 1}] - ${x}`).join("\n\n")
            )
            .setColor("#0099ff")
            .setTimestamp()
            .setFooter({
                text: versionbot,
                iconURL: client.user.displayAvatarURL(),
            });
        return await interaction.reply({ embeds: [embed] });
    }

    //COMANDO STOP
    if (interaction.commandName === "stop") {
        const queue = player.getQueue(interaction.guild);
        if (!queue)
            return await interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setTitle(`¡No hay ninguna canción reproduciendose!`)
                        .setColor("#EA3939")
                        .setTimestamp()
                        .setFooter({
                            text: versionbot,
                            iconURL: client.user.displayAvatarURL(),
                        }),
                ],
                ephemeral: true,
            });
        queue.destroy();
        queueToList = [];
        return await interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setTitle(`⏹️ ¡Canción detenida!`)
                    .setColor("#EA3939")
                    .setTimestamp()
                    .setFooter({
                        text: versionbot,
                        iconURL: client.user.displayAvatarURL(),
                    }),
            ],
        });
    }

    //COMANDO VOLUME
    if (interaction.commandName === "volumen") {
        const queue = player.getQueue(interaction.guild);
        if (!queue)
            return await interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setTitle(`¡No hay ninguna canción reproduciendose!`)
                        .setColor("#EA3939")
                        .setTimestamp()
                        .setFooter({
                            text: versionbot,
                            iconURL: client.user.displayAvatarURL(),
                        }),
                ],
                ephemeral: true,
            });
        const volume = interaction.options.get("volumen").value;
        queue.setVolume(volume);
        return await interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setTitle(`🔉 Volumen: ${volume}%`)
                    .setColor("#EA3939")
                    .setTimestamp()
                    .setFooter({
                        text: versionbot,
                        iconURL: client.user.displayAvatarURL(),
                    }),
            ],
        });
    }

    //COMANDO AKINATOR
    if (interaction.commandName === "akinator") {
        akinator(interaction, {
            language: "es", // Defaults to "en"
            childMode: false, // Defaults to "false"
            gameType: "character", // Defaults to "character"
            useButtons: true, // Defaults to "false"
            embedColor: "#1F1E33", // Defaults to "Random"
        });
    }

    //INFORMACIÓN DE INVOCADOR LOL
    if (interaction.commandName === "lol") {
        let embed1;
        let embed2;
        fetch(
            `https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${
                interaction.options.get("invocador").value
            }?api_key=${lolApi}`
        )
            .then((res) => res.json())
            .then((datasumm) => {
                if (datasumm?.status?.status_code === 404) {
                    interaction.reply({
                        ephemeral: true,
                        embeds: [
                            new EmbedBuilder()
                                .setDescription(
                                    `⚠️ No se ha encontrado a **${
                                        interaction.options.get("invocador")
                                            .value
                                    }** , comprueba que has escrito correctamente el nombre.`
                                )
                                .setColor("#EA3939"),
                        ],
                    });
                    return;
                }
                fetch(
                    `https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/${datasumm.id}?api_key=${lolApi}`
                )
                    .then((response) => response.json())
                    .then((data) => {
                        if (data.length === 0) {
                            interaction.reply({
                                ephemeral: true,
                                embeds: [
                                    new EmbedBuilder()
                                        .setDescription(
                                            `ℹ️  El invocador **${
                                                interaction.options.get(
                                                    "invocador"
                                                ).value
                                            }** es UNRANKED, no hay datos.`
                                        )
                                        .setColor("#EA3939"),
                                ],
                            });
                            return;
                        }
                        if (data.length > 0 && data.length < 2) {
                            const {
                                queueType,
                                tier,
                                rank,
                                summonerName,
                                leaguePoints,
                                wins,
                                losses,
                            } = data[0];

                            embed1 = new EmbedBuilder()

                                .setAuthor({
                                    name: `${summonerName}`,
                                    iconURL: `https://ddragon.leagueoflegends.com/cdn/12.14.1/img/profileicon/${datasumm.profileIconId}.png`,
                                })
                                .addFields(
                                    // { name: "\u200B", value: "\u200B" },
                                    {
                                        name: "Tipo de cola",
                                        value: queueType,
                                    },
                                    { name: "\u200B", value: "\u200B" },
                                    {
                                        name: "📈 División:",
                                        value: `⠀⠀⠀${tier}`,
                                        inline: true,
                                    },
                                    {
                                        name: "🏅 Rango:",
                                        value: `⠀⠀⠀${rank}`,
                                        inline: true,
                                    },
                                    {
                                        name: "💯 League Points:",
                                        value: `⠀⠀⠀${leaguePoints} LP`,
                                        inline: true,
                                    },
                                    { name: "\u200B", value: "\u200B" },
                                    {
                                        name: "✅ Victorias:",
                                        value: `⠀⠀⠀${wins}`,
                                        inline: true,
                                    },
                                    {
                                        name: "❌ Derrotas:",
                                        value: `⠀⠀⠀${losses}`,
                                        inline: true,
                                    },
                                    {
                                        name: "🏆 Winrate:",
                                        value:
                                            `⠀⠀⠀` +
                                            (
                                                (wins / (wins + losses)) *
                                                100
                                            ).toFixed(0) +
                                            "%",
                                        inline: true,
                                    },
                                    { name: "\u200B", value: "\u200B" }
                                )
                                .setThumbnail(
                                    `https://ddragon.leagueoflegends.com/cdn/12.14.1/img/profileicon/${datasumm.profileIconId}.png`
                                )
                                .setTimestamp()
                                .setColor("#0099ff")
                                .setFooter({
                                    text: versionbot,
                                    iconURL: client.user.displayAvatarURL(),
                                });

                            return interaction.reply({ embeds: [embed1] });
                        }

                        if (data.length > 1) {
                            embed1 = new EmbedBuilder()

                                .setAuthor({
                                    name: `${data[0].summonerName}`,
                                    iconURL: `https://ddragon.leagueoflegends.com/cdn/12.14.1/img/profileicon/${datasumm.profileIconId}.png`,
                                })
                                .addFields(
                                    // { name: "\u200B", value: "\u200B" },
                                    {
                                        name: "Tipo de cola",
                                        value: data[0].queueType,
                                    },
                                    { name: "\u200B", value: "\u200B" },
                                    {
                                        name: "📈 División:",
                                        value: `⠀⠀⠀${data[0].tier}`,
                                        inline: true,
                                    },
                                    {
                                        name: "🏅 Rango:",
                                        value: `⠀⠀⠀${data[0].rank}`,
                                        inline: true,
                                    },
                                    {
                                        name: "💯 League Points:",
                                        value: `⠀⠀⠀${data[0].leaguePoints} LP`,
                                        inline: true,
                                    },
                                    { name: "\u200B", value: "\u200B" },
                                    {
                                        name: "✅ Victorias:",
                                        value: `⠀⠀⠀${data[0].wins}`,
                                        inline: true,
                                    },
                                    {
                                        name: "❌ Derrotas:",
                                        value: `⠀⠀⠀${data[0].losses}`,
                                        inline: true,
                                    },
                                    {
                                        name: "🏆 Winrate:",
                                        value:
                                            `⠀⠀⠀` +
                                            (
                                                (data[0].wins /
                                                    (data[0].wins +
                                                        data[0].losses)) *
                                                100
                                            ).toFixed(0) +
                                            "%",
                                        inline: true,
                                    },
                                    { name: "\u200B", value: "\u200B" }
                                )
                                .setThumbnail(
                                    `https://ddragon.leagueoflegends.com/cdn/12.14.1/img/profileicon/${datasumm.profileIconId}.png`
                                )
                                .setTimestamp()
                                .setColor("#0099ff")
                                .setFooter({
                                    text: versionbot,
                                    iconURL: client.user.displayAvatarURL(),
                                });

                            embed2 = new EmbedBuilder()
                                .setAuthor({
                                    name: `${data[1].summonerName}`,
                                    iconURL: `https://ddragon.leagueoflegends.com/cdn/12.14.1/img/profileicon/${datasumm.profileIconId}.png`,
                                })
                                .addFields(
                                    // { name: "\u200B", value: "\u200B" },
                                    {
                                        name: "Tipo de cola",
                                        value: data[1].queueType,
                                    },
                                    { name: "\u200B", value: "\u200B" },
                                    {
                                        name: "📈 División:",
                                        value: `⠀⠀⠀${data[1].tier}`,
                                        inline: true,
                                    },
                                    {
                                        name: "🏅 Rango:",

                                        value: `⠀⠀⠀${data[1].rank}`,
                                        inline: true,
                                    },
                                    {
                                        name: "💯 League Points:",
                                        value: `⠀⠀⠀${data[1].leaguePoints} LP`,
                                        inline: true,
                                    },
                                    { name: "\u200B", value: "\u200B" },
                                    {
                                        name: "✅ Victorias:",
                                        value: `⠀⠀⠀${data[1].wins}`,
                                        inline: true,
                                    },
                                    {
                                        name: "❌ Derrotas:",

                                        value: `⠀⠀⠀${data[1].losses}`,
                                        inline: true,
                                    },
                                    {
                                        name: "🏆 Winrate:",

                                        value:
                                            `⠀⠀⠀` +
                                            (
                                                (data[1].wins /
                                                    (data[1].wins +
                                                        data[1].losses)) *
                                                100
                                            ).toFixed(0) +
                                            "%",
                                        inline: true,
                                    },
                                    { name: "\u200B", value: "\u200B" }
                                )
                                .setThumbnail(
                                    `https://ddragon.leagueoflegends.com/cdn/12.14.1/img/profileicon/${datasumm.profileIconId}.png`
                                )
                                .setTimestamp()

                                .setColor("#0099ff")
                                .setFooter({
                                    text: versionbot,
                                    iconURL: client.user.displayAvatarURL(),
                                });

                            return interaction.reply({
                                embeds: [embed1, embed2],
                            });
                        }
                    })
                    .catch((err) => {
                        interaction.reply(`🔴 Error: ${err}`);
                    });
            });
    }

    //COMANDO VER ULTIMO PARCHE LOL
    if (interaction.commandName === "lolparche") {
        let currentVersion;
        await fetch(`https://ddragon.leagueoflegends.com/api/versions.json`)
            .then((res) => res.json())
            .then((version) => {
                currentVersion = version[0].slice(0, -2);
            })
            .catch((err) => {
                console.log(err);
            });

        const patchVersionWithDash = currentVersion.replace(".", "-");
        const patchVersionWithDot = currentVersion;

        return interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setColor("#ffffff")
                    .setTitle(
                        `🗒️ NOTAS DE LA VERSIÓN **${patchVersionWithDot}**`
                    )
                    .setDescription(
                        `https://www.leagueoflegends.com/es-es/news/game-updates/patch-${patchVersionWithDash}-notes/`
                    )
                    .setImage(
                        `https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/bltc8855795f63b5551/62f2332d2a66d4760f0107af/LOL_${patchVersionWithDot}-PatchNotes-Infographic_1920x1080_TTan_v01_ES.jpg`
                    )
                    .setTimestamp()
                    .setFooter({
                        text: versionbot,
                        iconURL: client.user.displayAvatarURL(),
                    }),
            ],
        });
    }

    //MEME RANDOM REDDIT
    if (interaction.commandName === "meme") {
        red({
            //hay que pasarle unas opciones
            subreddit: "SpanishMeme", //se puede poner cualquier subreddit, yo pongo SpanishMeme porque es el unico que conozco xd
            sort: "hot",
            allowNSFW: false, //por si queremos que tambien entren posts con la etiqueta de NSFW, yo le pongo false
            allowModPost: false, // ni idea que es esto pero el comando funciona, asi que pongamoslo en false xd
            allowCrossPost: false, //tampoco se que es
            allowVideo: false, // si queremos que salga videos, como es un embed pues hay que ponerle que no
        })
            .then((post) => {
                const embed = new EmbedBuilder()
                    .setColor("#ffffff")
                    .setTitle(post.title)
                    .setImage(post.url)
                    .setFooter({
                        text: versionbot,
                        iconURL: client.user.displayAvatarURL(),
                    });
                if (!post.url) {
                    return interaction.reply({
                        embeds: [
                            new EmbedBuilder()
                                .setColor("#ffffff")
                                .setTitle("No hay memes disponibles")
                                .setDescription(
                                    "Por favor, intentalo de nuevo mas tarde."
                                )
                                .setTimestamp()
                                .setFooter({
                                    text: versionbot,
                                    iconURL: client.user.displayAvatarURL(),
                                }),
                        ],
                        ephemeral: true,
                    });
                } else {
                    return interaction.reply({ embeds: [embed] });
                }
            })
            .catch((err) => interaction.reply(`🔴 Error: ${err}`));
    }

    //ENCUESTA
    if (interaction.commandName === "encuesta") {
        const pregunta = interaction.options.get("pregunta").value; //Definimos que "Pregunta, opcion1, opcion2" equivale a test, el .split de test fue para separar estas definiciones
        const opcion1 = interaction.options.get("opción-1").value;
        const opcion2 = interaction.options.get("opción-2").value;

        let [react1, react2] = ["1️⃣", "2️⃣"];

        const embedEncuesta = new EmbedBuilder() //Creamos el embed con el nombre encuesta

            .setTitle(`${pregunta} \n`)
            .addFields(
                {
                    name: react1,
                    value: opcion1,
                    inline: true,
                },
                {
                    name: react2,
                    value: opcion2,
                    inline: true,
                }
            )
            .setFooter({
                text: `${interaction.member.user.tag} \n`,
                iconURL: interaction.member.user.displayAvatarURL(),
            })
            .setThumbnail(
                "https://upload.wikimedia.org/wikipedia/commons/d/dd/Strawpoll-logo-large.png"
            )
            .setTimestamp()
            .setColor("#0099ff");

        const msg = await interaction.reply({
            embeds: [embedEncuesta],
            fetchReply: true,
        }); //Mandamos el embed y lo guardamos en una variable msg

        await msg.react(`${react1}`), await msg.react(`${react2}`);
    }

    //COMANDO BUSCAR VIDEO YOUTUBE
    if (interaction.commandName === "yt") {
        const search = interaction.options.get("texto").value;
        const url = `https://www.youtube.com/results?search_query=${search}`;
        let youTube = new YouTube();

        youTube.setKey(youtubeKey);

        youTube.search(search, 2, function (err, result) {
            if (err) {
                return console.log(err);
            }
            if (result.items[1]["id"].videoId == undefined) {
                return interaction.reply({
                    ephemeral: true,
                    embeds: [
                        new EmbedBuilder()
                            .setDescription(
                                "⚠️ No se han encontrado resultados."
                            )
                            .setColor("#EA3939"),
                    ],
                });
            } else {
                let link = `https://www.youtube.com/watch?v=${result.items[1]["id"].videoId}`;
                interaction.reply(link);
            }
        });
    }

    //CONVERTIR TEXT ASCII
    if (interaction.commandName === "asci") {
        if (interaction.options.get("texto").value.slice(1).length > 15) {
            interaction.reply({
                ephemeral: true,
                embeds: [
                    new EmbedBuilder()
                        .setDescription(
                            "⚠️ El texto no puede superar los **15** caracteres."
                        )
                        .setColor("#EA3939"),
                ],
            });
            return;
        }
        figlet(
            interaction.options
                .get("texto")
                .value.slice(prefix.length - 1)
                .split(" ")
                .join(" "),
            (err, data) => interaction.reply("```" + data + "```")
        );
    }

    //AVATAR DE USUARIO Y/O @MENCIONADO
    if (interaction.commandName === "avatar") {
        const userAvatar = interaction.options
            .get("usuario")
            .user.displayAvatarURL({
                format: "png",
                dynamic: true,
                size: 1024,
            });

        const embed = new EmbedBuilder()
            .setColor("#ffffff")
            .setDescription(`<@${interaction.options.get("usuario").value}>`)
            .setImage(userAvatar)
            .setTimestamp()
            .setFooter({
                text: versionbot,
                iconURL: client.user.displayAvatarURL(),
            });
        await interaction.reply({ embeds: [embed] });
    }

    //ARDIENDO
    if (interaction.commandName === "arder") {
        const arderEmbed = new EmbedBuilder()
            .setDescription(
                `! <@${
                    interaction.options.get("usuario").user.id
                }> esta ardiendo en pasión ! :hot_face: :fire::flame:`
            )
            .setColor("#ffffff")
            .setImage(
                "https://pa1.narvii.com/6175/9cc89d4baca1ce2779798b5930ab3ddf832a0eee_00.gif"
            )
            .setTimestamp()
            .setFooter({
                text: versionbot,
                iconURL: client.user.displayAvatarURL(),
            });
        await interaction.reply({ embeds: [arderEmbed] });
    }

    //USUARIO INFO
    if (interaction.commandName === "usuario") {
        const userAvatar = interaction.options
            .get("usuario")
            .user.displayAvatarURL({
                format: "png",
                dynamic: true,
                size: 1024,
            });

        const userInfoEmbed = new EmbedBuilder()
            .setThumbnail(userAvatar)
            .setAuthor({
                name:
                    interaction.options.get("usuario").user.username +
                    "#" +
                    interaction.options.get("usuario").user.discriminator,
                iconURL: userAvatar,
            })
            .addFields(
                {
                    name: "Jugando a",
                    value:
                        interaction.options.get("usuario").member?.presence
                            ?.activities[0]?.name || "Nada",
                },
                {
                    name: "Creado",
                    value: dayjs(
                        interaction.options.get("usuario").user.createdAt
                    ).format("DD/MM/YYYY"),
                    inline: true,
                },
                {
                    name: "Estado",
                    value:
                        interaction.options.get("usuario").member.presence
                            ?.status == "online"
                            ? "En linea"
                            : interaction.options.get("usuario").member.presence
                                  ?.status == "idle"
                            ? "Ausente"
                            : interaction.options.get("usuario").member.presence
                                  ?.status == "dnd"
                            ? "No molestar"
                            : "Desconectado",
                    inline: true,
                }
            )
            .setColor("#ffffff")
            .setTimestamp()
            .setFooter({
                text: versionbot,
                iconURL: client.user.displayAvatarURL(),
            });
        await interaction.reply({ embeds: [userInfoEmbed] });
    }

    //TIEMPO ACTUAL
    if (interaction.commandName === "tiempo") {
        fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${
                interaction.options.get("ciudad").value
            }&units=metric&appid=40efccd434eefd0344923485b60fbda7&lang=es`
        )
            .then((res) => res.json())
            .then((data) => {
                const embedTiempo = new EmbedBuilder()

                    .setColor("#ffffff")
                    // .setAuthor({
                    //     name:
                    //         interaction.options.get("ciudad").user.username +
                    //         "#" +
                    //         interaction.options.get("ciudad").user.discriminator,
                    //     iconURL: userAvatar,
                    // })
                    .setTitle(
                        ` **${data.main.temp}\u00B0C** en ${data.name}, ${data.sys.country}`
                    )
                    .addFields(
                        {
                            name: "Máxima",
                            value: `${data.main.temp_max}\u00B0C`,
                            inline: true,
                        },
                        {
                            name: "Mínima",
                            value: `${data.main.temp_min}\u00B0C`,
                            inline: true,
                        },
                        {
                            name: "Humedad",
                            value: `${data.main.humidity}%`,
                            inline: true,
                        },
                        {
                            name: "Viento",
                            value: `${data.wind.speed} m/s`,
                            inline: true,
                        },
                        {
                            name: "Presión",
                            value: `${data.main.pressure} hPa`,
                            inline: true,
                        },
                        {
                            name: "Nubes",
                            value: `${data.weather[0].description}`,
                            inline: true,
                        }
                    )

                    // .addField(`Máxima:`, `${data.main.temp_max}\u00B0C`, true)
                    // .addField(`Míninima:`, `${data.main.temp_min}\u00B0C`, true)
                    // .addField(`Humedad:`, `${data.main.humidity} %`, true)
                    // .addField(`Viento:`, `${data.wind.speed} m/s`, true)
                    // .addField(`Presión:`, `${data.main.pressure} hpa`, true)
                    // .addField(`Nubes:`, `${data.weather[0].description}`, true)
                    .setThumbnail(
                        `http://openweathermap.org/img/w/${data.weather[0].icon}.png`
                    )
                    .setTimestamp()
                    .setFooter({
                        text: versionbot,
                        iconURL: client.user.displayAvatarURL(),
                    });

                interaction.reply({ embeds: [embedTiempo] });
            })
            .catch((err) => console.log(err));
    }

    //TEXTO A BIGTEXT
    if (interaction.commandName === "bigtext") {
        const args = interaction.options.get("texto").value;

        // BigText('Palabra') => Llamamos a la función y en los parametros colocamos el texto (Para convertirlo en "Grande")
        BigText(args);

        function BigText(args) {
            // AquÃ­ es donde guardaremos la palabra
            const array = [];
            for (letra of Array.from(args)) {
                // Sacamos letra a letra y vericamos con los if lo siguiente...
                if (/\d/g.test(letra)) {
                    // Si la letra es un numero
                    switch (letra) {
                        case "0":
                            // si la letra es 0 => emoji
                            array.push(":zero:");
                            break;
                        case "1":
                            // si la letra es 1 => emoji
                            array.push(":one:");
                            break;
                        case "2":
                            // si la letra es 2 => emoji
                            array.push(":two:");
                            break;
                        case "3":
                            // ...
                            array.push(":three:");
                            break;
                        case "4":
                            // ...
                            array.push(":four:");
                            break;
                        case "5":
                            // ...
                            array.push(":five:");
                            break;
                        case "6":
                            // ...
                            array.push(":six:");
                            break;
                        case "7":
                            // ...
                            array.push(":seven:");
                            break;
                        case "8":
                            // ...
                            array.push(":eight:");
                            break;
                        case "9":
                            // ...
                            array.push(":nine:");
                            break;
                    }
                } else if (/[^a-z]/gi.test(letra)) {
                    // Si no es una letra ni numero
                    // lo pusheamos tal cual esta
                    array.push(letra);
                } else {
                    // Si no es un numero o otro caracter
                    // pusheamos el emoji de la letra
                    array.push(`:regional_indicator_${letra.toLowerCase()}:`);
                    // Si la letra esta en mayuscula la convertiremos a minuscula con toLowerCase()
                }
            }
            // Borramos el mensaje original
            // interaction.message.delete();
            // Unimos el array y lo separamos un poco
            return interaction.reply(array.join(" "));
        }
    }

    //TEXTO A MORSE
    if (interaction.commandName === "morse") {
        let alpha = " ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split("");
        let morse =
            "/,.-,-...,-.-.,-..,.,..-.,--.,....,..,.---,-.-,.-..,--,-.,---,.--.,--.-,.-.,...,-,..-,...-,.--,-..-,-.--,--..,.----,..---,...--,....-,.....,-....,--...,---..,----.,-----".split(
                ","
            );

        let textToConvert = interaction.options
            .get("texto")
            .value.toUpperCase();

        if (textToConvert.startsWith(".") || textToConvert.startsWith("-")) {
            //Separar el texto morse en array
            textToConvert = textToConvert.split(" ");
            //Longitud
            let length = textToConvert.length;
            //Convertir a texto normal usando un loop
            for (let i = 0; i < length; i++) {
                textToConvert[i] = alpha[morse.indexOf(textToConvert[i])];
            }
            //Volver a unir
            textToConvert = textToConvert.join("");
        } else {
            //Lo mismo. Separar
            textToConvert = textToConvert.split("");
            let length = textToConvert.length;
            //Convertir a morse
            for (let i = 0; i < length; i++) {
                textToConvert[i] = morse[alpha.indexOf(textToConvert[i])];
            }
            textToConvert = textToConvert.join(" ");
        }

        interaction.reply({
            // tts: true, //Habilitar que el bot diga el mensaje
            content: "```" + textToConvert + "```",
        });
    }

    //TTS (Text to speech)
    if (interaction.commandName === "tts") {
        interaction.reply({
            tts: true,
            content: interaction.options.get("texto").value,
        });
    }

    //BUSCAMINAS
    if (interaction.commandName === "minas") {
        const rows = 9;
        const columns = 9;
        const mines = 12;
        const minesweeper = new Minesweeper({ rows, columns, mines });
        const matrix = minesweeper.start();

        return interaction.reply(matrix);
    }

    //SERVER INFO
    if (interaction.commandName === "serverinfo") {
        const total = interaction.member.guild.memberCount;

        const membersOnline = interaction.member.guild.members.cache.filter(
            (member) => member.presence?.status === "online"
        ).size;

        const memberAusente = interaction.member.guild.members.cache.filter(
            (member) => member.presence?.status === "idle"
        ).size;

        const memberDnd = interaction.member.guild.members.cache.filter(
            (member) => member.presence?.status === "dnd"
        ).size;

        const memberOfline = total - membersOnline - memberAusente - memberDnd;

        const serverInfoEmbed = new EmbedBuilder()
            .setThumbnail(
                interaction.member.guild.iconURL({
                    format: "png",
                    dynamic: true,
                    size: 1024,
                })
            )
            .setAuthor({
                name: interaction.member.guild.name,
                iconURL: interaction.member.guild.iconURL({
                    format: "png",
                    dynamic: true,
                    size: 1024,
                }),
            })
            .addFields(
                { name: "\u200B", value: "\u200B" },
                {
                    name: "©️ Creado",
                    value: dayjs(interaction.member.guild.createdAt).format(
                        "DD/MM/YYYY"
                    ),
                    inline: true,
                },
                {
                    name: "💬 Canales",
                    value: `⠀⠀⠀⠀${interaction.member.guild.channels.cache.size.toString()}`,
                    inline: true,
                },
                {
                    name: "👨 Miembros",
                    value: `⠀⠀⠀⠀${total.toString()}`,
                    inline: true,
                },
                { name: "\u200B", value: "\u200B" },
                {
                    name: "🟢 En linea",
                    value: `⠀⠀⠀⠀${membersOnline.toString()}`,
                    inline: true,
                },
                {
                    name: "🟡 Ausentes",
                    value: `⠀⠀⠀⠀⠀${memberAusente.toString()}`,
                    inline: true,
                },
                {
                    name: "🔴 No molestar",
                    value: `⠀⠀⠀⠀⠀${memberDnd.toString()}`,
                    inline: true,
                },
                { name: "\u200B", value: "\u200B" },
                {
                    name: "❌ Offline",
                    value: `⠀⠀⠀${memberOfline.toString()}`,
                    inline: true,
                },
                {
                    name: "👮 Roles",
                    value: `⠀⠀⠀${interaction.member.guild.roles.cache.size.toString()}`,
                    inline: true,
                },
                {
                    name: "🌎 Region",
                    value: `⠀⠀⠀${interaction.member.guild.preferredLocale}`,
                    inline: true,
                },
                { name: "\u200B", value: "\u200B" },
                {
                    name: "📒 Roles",
                    value: `${interaction.member.guild.roles.cache
                        .map((role) => role.name)
                        .sort()
                        .join(", ")}`,
                    inline: true,
                },
                { name: "\u200B", value: "\u200B" }
            )
            .setColor("#ffffff")
            .setTimestamp()
            .setFooter({
                text: versionbot,
                iconURL: client.user.displayAvatarURL(),
            });
        await interaction.reply({ embeds: [serverInfoEmbed] });
    }

    //COMANDO PARA TRADUCIR AL INGLES
    if (interaction.commandName === "traducir") {
        const text = interaction.options.get("texto").value;
        translate(
            {
                text: text,
                source: "es", // Este es la fuente, es decir el idioma que queremos pasar a el idioma puesto en target, ya saben con codigo i18n.
                target: "en", // El idioma en i18n al que queremos traducir
            },
            function (result) {
                const embedTraductor = new EmbedBuilder() //Creamos el embed con el nombre encuesta

                    // .setTitle(`${question} \n`)
                    .setThumbnail(
                        "https://cdn-icons-png.flaticon.com/512/281/281776.png"
                    )
                    .addFields(
                        {
                            name: "Original",
                            value: result.sentences[0].orig,
                        },
                        {
                            name: "Traducción",
                            value: result.sentences[0].trans,
                        }
                    )
                    // .setFooter(`Encuesta realizada por: ${message.author.tag}`)
                    .setColor("#ffffff");

                interaction.reply({ embeds: [embedTraductor] });
            }
        );
    }

    //CORONAVIRUS INFO
    if (interaction.commandName === "corona") {
        fetch(
            `https://covid19.mathdro.id/api/countries/${
                interaction.options.get("país").value
            }`
        )
            .then((response) => response.json())
            .then((data) => {
                let confirmed = data.confirmed.value.toString();
                let recovered = data.recovered.value.toString();
                let deaths = data.deaths.value.toString();
                const d = data.lastUpdate;
                moment.locale("es");
                const date = moment(d).format("L");

                const coronaEmbed = new EmbedBuilder()
                    .setColor("#FF0000")
                    .setTitle(
                        `País: ${interaction.options
                            .get("país")
                            .value.toUpperCase()}`
                    )
                    .setThumbnail(
                        "https://aso-apia.org/wp-content/uploads/2022/02/coronavirus-4947717_1280_2.png"
                    )
                    .addFields(
                        {
                            name: "Casos confirmados",
                            value: new Intl.NumberFormat("es-ES").format(
                                confirmed
                            ),

                            inline: true,
                        },
                        {
                            name: "Recuperados",
                            value: new Intl.NumberFormat("es-ES").format(
                                recovered
                            ),
                            inline: true,
                        },
                        {
                            name: "Fallecidos",
                            value: new Intl.NumberFormat("es-ES").format(
                                deaths
                            ),
                            inline: true,
                        },
                        {
                            name: "Última actualización",
                            value: date,
                        }
                    )
                    .setTimestamp()
                    .setFooter({
                        text: versionbot,
                        iconURL: client.user.displayAvatarURL(),
                    });

                interaction.reply({ embeds: [coronaEmbed] });
            })
            .catch((err) => {
                interaction.reply({
                    ephemeral: true,
                    embeds: [
                        new EmbedBuilder()
                            .setDescription(
                                "⚠️ Escribe un País(Ingles) valido."
                            )
                            .setColor("#EA3939"),
                    ],
                });
            });
    }

    //CALCULAR PING
    if (interaction.commandName === "ping") {
        const embed = new EmbedBuilder()
            .setColor("#FF0000")
            .setTitle(
                ":regional_indicator_p: :regional_indicator_i: :regional_indicator_n: :regional_indicator_g:"
            )
            .setThumbnail(
                "https://cdn-icons-png.flaticon.com/512/3883/3883802.png"
            )
            .setDescription(`Ping PerBot: ${client.ws.ping}ms`)
            .setTimestamp()
            .setFooter({
                text: versionbot,
                iconURL: client.user.displayAvatarURL(),
            });

        interaction.reply({ embeds: [embed] });
    }

    //BORRAR MENSAJES
    if (interaction.commandName === "borrar") {
        if (
            interaction.user.id !== "209338137346834433" &&
            interaction.user.id !== "254135921144758273" &&
            interaction.user.id !== "298585122519908364" &&
            interaction.user.id !== "179686774895935489"
        ) {
            interaction.reply({
                ephemeral: true,
                embeds: [
                    new EmbedBuilder()
                        .setDescription(
                            "⛔ No tienes permisos para borrar mensajes."
                        )
                        .setColor("#EA3939"),
                ],
            });
            return;
        }

        const amountToDelete = interaction.options.get("nº-mensajes").value;
        const textMsgSingularOrPlural =
            amountToDelete === 1 ? "mensaje" : "mensajes";
        const textMsg2SingularOrPlural = amountToDelete === 1 ? "ha" : "han";

        if (amountToDelete > 100) {
            interaction.reply({
                ephemeral: true,
                embeds: [
                    new EmbedBuilder()
                        .setDescription(
                            "⚠️  No puedes borrar más de 100 mensajes."
                        )
                        .setColor("#EA3939"),
                ],
            });
            return;
        } else {
            interaction.channel.messages
                .fetch({ limit: amountToDelete })
                .then((messages) => {
                    messages.forEach((message) => {
                        message.delete();
                    });
                })
                .catch((err) => {
                    interaction.reply({
                        ephemeral: true,
                        embeds: [
                            new EmbedBuilder()
                                .setDescription(
                                    `⚠️  No se pudo borrar mensajes. error: ${err}`
                                )
                                .setColor("#EA3939"),
                        ],
                    });
                })
                .finally(() => {
                    interaction.reply(
                        `✅ Se ${textMsg2SingularOrPlural} borrado ${amountToDelete} ${textMsgSingularOrPlural}.`
                    );

                    setTimeout(() => interaction.deleteReply(), 2000);
                });
        }
    }

    //ENVIAR MD A UN USUARIO
    if (interaction.commandName === "enviarmd") {
        if (
            interaction.user.id !== "209338137346834433" &&
            interaction.user.id !== "254135921144758273" &&
            interaction.user.id !== "298585122519908364" &&
            interaction.user.id !== "179686774895935489"
        ) {
            interaction.reply({
                ephemeral: true,
                embeds: [
                    new EmbedBuilder()
                        .setDescription(
                            "⛔ No tienes permisos para enviar mensajes privados."
                        )
                        .setColor("#EA3939"),
                ],
            });
            return;
        }
        const textToSend = interaction.options.get("mensaje").value;
        const userToSend = interaction.options.get("usuario").value;

        //send md to user
        client.users
            .fetch(userToSend)
            .then((user) => {
                user.send(textToSend);
            })
            .catch((err) => {
                interaction.reply({
                    ephemeral: true,
                    embeds: [
                        new EmbedBuilder()
                            .setDescription(
                                `⚠️  No se pudo enviar el mensaje. Error: ${err}`
                            )
                            .setColor("#EA3939"),
                    ],
                });
            });

        interaction.reply({
            ephemeral: false,
            embeds: [
                new EmbedBuilder()
                    .setDescription(
                        `✅  Mensaje enviado correctamente a **${
                            client.users.cache.get(userToSend).username
                        }#${
                            client.users.cache.get(userToSend).discriminator
                        }** .`
                    )
                    .setColor("#EA3939"),
            ],
        });
        setTimeout(() => interaction.deleteReply(), 3000);
    }

    //COMANDO HELP
    if (interaction.commandName === "help") {
        const embed = new EmbedBuilder()
            .setColor("#ffffff")
            .setThumbnail(client.user.displayAvatarURL())
            .setTitle(
                `COMANDOS DISPONIBLES *${client.user.username.toUpperCase()}* \n`
            )
            .addFields(
                {
                    name: `*${prefix}play + canción*`,
                    value: "`Reproduce una canción.`",
                    inline: true,
                },
                {
                    name: `*${prefix}lol + Invocador*`,
                    value: "`Información Invocador.`",
                    inline: true,
                },
                {
                    name: `*${prefix}lolparche*`,
                    value: "`Notas parche Lol`",
                    inline: true,
                },
                {
                    name: `*${prefix}akinator*`,
                    value: "`Jugar a Akinator.`",
                    inline: true,
                },
                {
                    name: `*${prefix}meme*`,
                    value: "`Meme random reddit.`",
                    inline: true,
                },
                {
                    name: `*${prefix}encuesta*`,
                    value: "`Crear una encuesta.`",
                    inline: true,
                },
                {
                    name: `*${prefix}yt + texto*`,
                    value: "`Buscar video youtube.`",
                    inline: true,
                },
                {
                    name: `*${prefix}asci + texto*`,
                    value: "`Texto a ASCII.`",
                    inline: true,
                },
                {
                    name: `*${prefix}avatar + @usuario*`,
                    value: "`Avatar de un usuario.`",
                    inline: true,
                },
                {
                    name: `*${prefix}arder + @usuario*`,
                    value: "`Ardiendo en pasión.`",
                    inline: true,
                },
                {
                    name: `*${prefix}usuario + @usuario*`,
                    value: "`Información sobre un usuario.`",
                    inline: true,
                },
                {
                    name: `*${prefix}tiempo + ciudad*`,
                    value: "`Información del tiempo.`",
                    inline: true,
                },
                {
                    name: `*${prefix}bigtext + texto*`,
                    value: "`Texto grande con numeros y letras.`",
                    inline: true,
                },
                {
                    name: `*${prefix}morse + texto*`,
                    value: "`Convertir texto a morse.`",
                    inline: true,
                },
                {
                    name: `*${prefix}tts + texto*`,
                    value: "`Texto a voz.`",
                    inline: true,
                },
                {
                    name: `*${prefix}minas*`,
                    value: "`Jugar al buscaminas.`",
                    inline: true,
                },
                {
                    name: `*${prefix}serverinfo*`,
                    value: "`Información del servidor.`",
                    inline: true,
                },
                {
                    name: `*${prefix}traducir + texto*`,
                    value: "`Traducir texto a Ingles.`",
                    inline: true,
                },
                {
                    name: `*${prefix}corona + país*`,
                    value: "`Información sobre el coronavirus.`",
                    inline: true,
                },
                {
                    name: `*${prefix}enviarmd + usuario*`,
                    value: "`Enviar mensajes privados. (Admin)`",
                    inline: true,
                },
                {
                    name: `*${prefix}borrar + nº*`,
                    value: "`Borrar mensajes. (Admin)`",
                    inline: true,
                },
                {
                    name: `*${prefix}ping*`,
                    value: "`Ping del bot.`",
                    inline: true,
                }
            )
            .setTimestamp()
            .setFooter({
                text: versionbot,
                iconURL: client.user.displayAvatarURL(),
            });

        await interaction.reply({ embeds: [embed] });
    }
});

client.login(config.token);
