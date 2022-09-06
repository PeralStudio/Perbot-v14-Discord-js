// import config from "./config.js";
// const {
//     prefix,
//     lolApi,
//     youtubeKey,
//     mongoUrl,
//     CLIENT_ID,
//     GUILD_ID,
//     token,
//     tmdbApi,
//     email,
//     gmailToken,
// } = config;

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
import nodemailer from "nodemailer";
import chalk from "chalk";

import mongoose from "mongoose";

import red from "reddit-fetch";
import Minesweeper from "discord.js-minesweeper";
import akinator from "discord.js-akinator";

import translate from "node-google-translate-skidz";
import YouTube from "youtube-node";

import cherio from "cherio";
import request from "request";

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
import helpCommand from "./commands/help.js";
import carteleracineCommand from "./commands/carteleracine.js";
import enviarmdCommand from "./commands/adminCommands/enviarmd.js";
import borrarCommand from "./commands/adminCommands/borrar.js";
import emailCommand from "./commands/adminCommands/email.js";

import setIntervalTwitch from "./functions/twitch.js";
import setIntervalYoutube from "./functions/youtube.js";
import usersDiscord from "./Schemas/usersDiscord.js";

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
    carteleracineCommand,
    helpCommand,
    emailCommand,
];

let currentVersion;
let imgPatch;
const imgEzreal = require("./assets/images/ezreal-logo.png");

const versionbot = "PerBot v2.0 Peralstudio.com";
const {
    prefix,
    lolApi,
    youtubeKey,
    mongoUrl,
    CLIENT_ID,
    GUILD_ID,
    token,
    tmdbApi,
    email,
    gmailToken,
} = process.env;

mongoose
    .connect(mongoUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("Conectado a MongoDB"))
    .catch((err) => console.log(err));

const rest = new REST({ version: "10" }).setToken(token);

(async () => {
    try {
        console.log(chalk.blue("Started refreshing application (.) commands."));

        await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
            body: commands,
        });

        console.log(
            chalk.blue("Successfully reloaded application (.) commands.")
        );
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
        IntentsBitField.Flags.GuildMembers,
        GatewayIntentBits.GuildVoiceStates,
    ],
});

const usersToAlertTwitch = [
    "illojuan",
    "ibai",
    "viviendoenlacalle",
    "knekro",
    "eldelabarrapan",
    "elojoninja",
    "elyoyalol",
    "kxmi",
    "kerios",
    "adertyh",
    "duendepablo",
];
const usersToAlertYoutube = [
    "Willyrex",
    "vegetta777",
    "xFaRgAnxYTube",
    "RideMeFive",
    "CenandoconPablo",
    "esttikSP",
    "JDalmau",
    "LordDraugr",
    "SeVenJungle",
    "UCg1c09_sFOd-TVPCNgHw8qg", // Kerios
    "UCEx9whgAgQPG7e4dAXIq1VQ", // ElOjoNinja - Gameplays Completos
    "UCmcBZPvWyXBKw0d6XE5XDOQ", // elyoya
    "UCwXh0iKPlI4hXNntPECFSbg", // Zazza el italiano
];

client.on("ready", async () => {
    console.log(
        chalk.green(
            `Bot conectado como ${
                client.user.tag
            }! (${new Date().toLocaleTimeString("es-ES", {
                timeZone: "Europe/Madrid",
            })})`
        )
    );

    const statusArray = [
        {
            name: `Achant | /help`,
            type: ActivityType.Playing,
            status: "online",
        },
        {
            name: `Double Dragon | /help`,
            type: ActivityType.Playing,
            status: "online",
        },
        {
            name: `Golden Axe | /help`,
            type: ActivityType.Playing,
            status: "dnd",
        },
        {
            name: `El Fary | /help`,
            type: ActivityType.Listening,
            status: "online",
        },
        {
            name: `Gat y Gos | /help`,
            type: ActivityType.Watching,
            status: "idle",
        },
        {
            name: `Vaca y Pollo | /help`,
            type: ActivityType.Watching,
            status: "online",
        },
    ];

    const pickPresence = async () => {
        const option = Math.floor(Math.random() * statusArray.length);

        try {
            await client.user.setPresence({
                activities: [
                    {
                        name: statusArray[option].name,
                        type: statusArray[option].type,
                    },
                ],
                status: statusArray[option].status,
            });
        } catch (error) {
            console.log(error);
        }
    };

    setInterval(pickPresence, 60 * 1000);

    for (const user of usersToAlertTwitch) {
        setIntervalTwitch(client, user);
    }
    for (const user of usersToAlertYoutube) {
        setIntervalYoutube(client, user);
    }

    await fetch(`https://ddragon.leagueoflegends.com/api/versions.json`)
        .then((res) => res.json())
        .then((version) => {
            currentVersion = version[0];
        })
        .catch((err) => {
            console.log(err);
        });

    const currentVersionWithDash = currentVersion
        .slice(0, -2)
        .replace(".", "-");

    await request(
        `https://www.leagueoflegends.com/es-es/news/game-updates/patch-${currentVersionWithDash}-notes/`,
        (err, res, html) => {
            if (!err && res.statusCode == 200) {
                const $ = cherio.load(html);
                // console.log("request ok", $(".cboxElement")[0]?.attribs?.href);
                imgPatch = $(".cboxElement")[0]?.attribs?.href;
            } else {
                console.log("request failed");
            }
        }
    );
});

client.on("guildMemberAdd", async (member) => {
    const embed = new EmbedBuilder()
        .setDescription(`¡ Bienvenido <@${member.id}> !`)
        .setThumbnail(member.user.displayAvatarURL())
        .setImage(
            "https://pa1.narvii.com/7134/e55a690bf6acab74324da299e923af2c30cd544br1-500-500_hq.gif"
        )
        .setColor("#008f39")
        .setTimestamp()
        .setFooter({
            text: versionbot,
            iconURL: client.user.displayAvatarURL(),
        });

    client.channels.cache.get("1008006156712677433").send({ embeds: [embed] });

    // AÑADIR USUARIO A LA BASE DE DATOS CUANDO INGRESA AL SERVIDOR
    let dataUserDB = await usersDiscord.findOne({
        id: member.user.id,
        user: member.user.username,
        discriminator: member.user.discriminator,
    });

    if (!dataUserDB) {
        dataUserDB = new usersDiscord({
            id: member.user.id,
            user: member.user.username,
            discriminator: member.user.discriminator,
            date: new Date().toLocaleString("es-ES", {
                timeZone: "Europe/Madrid",
            }),
        });
        dataUserDB.save();
    }
});

client.on("guildMemberRemove", async (member) => {
    const embed = new EmbedBuilder()
        .setDescription(`¡ Adios <@${member.id}> !`)
        .setThumbnail(member.user.displayAvatarURL())
        .setImage(
            "https://media1.tenor.com/images/59af6d17fa7477ae2379697aa8df134c/tenor.gif"
        )
        .setColor("#f10029")
        .setTimestamp()
        .setFooter({
            text: versionbot,
            iconURL: client.user.displayAvatarURL(),
        });

    client.channels.cache.get("1008006156712677433").send({ embeds: [embed] });

    // ELIMINAR USUARIO DE LA BASE DE DATOS CUANDO ABANDONA EL SERVIDOR

    // let dataUserDB = await usersDiscord.findOne({
    //     id: member.user.id,
    //     user: member.user.username,
    //     discriminator: member.user.discriminator,
    // });

    // if (dataUserDB) {
    //     dataUserDB.remove();
    // }
});

const player = new Player(client);

let queueToList = [];
// add the trackStart event so when a song will be played this message will be sent
player.on("trackStart", async (queue, track) =>
    queue.metadata.channel.send(`▶️ Reproduciendo **${track.title}**!`)
);

player.on("queueEnd", async (queue, track) => {
    queueToList = [];
});

client.on("interactionCreate", async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    //COMANDO EMAIL
    if (interaction.commandName === "email") {
        if (interaction.user.id !== "209338137346834433") {
            interaction.reply({
                ephemeral: true,
                embeds: [
                    new EmbedBuilder()
                        .setDescription(
                            "⛔ No tienes permisos para enviar emails."
                        )
                        .setColor("#EA3939"),
                ],
            });
            return;
        }

        const destinatario = interaction.options.get("destinatario").value;
        const asunto = interaction.options.get("asunto").value;
        const contenido = interaction.options.get("contenido").value;

        const validEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

        if (validEmail.test(destinatario)) {
            var transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: email,
                    pass: gmailToken,
                },
            });

            var mailOptions = {
                from: email,
                to: destinatario,
                subject: asunto,
                text: contenido,
            };

            transporter.sendMail(mailOptions, async function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log("Email sent: " + info.response);
                    await interaction.reply({
                        embeds: [
                            new EmbedBuilder()
                                .setTitle(`✅ Email enviado`)
                                .addFields([
                                    {
                                        name: "Destinatario",
                                        value: destinatario,
                                        inline: true,
                                    },
                                    {
                                        name: "Asunto",
                                        value: asunto,
                                        inline: true,
                                    },
                                    {
                                        name: "Contenido",
                                        value: contenido,
                                    },
                                ])
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
            });
        } else {
            interaction.reply({
                ephemeral: true,
                embeds: [
                    new EmbedBuilder()
                        .setDescription("❌ Introduce un email valido.")
                        .setColor("#EA3939"),
                ],
            });
            return;
        }
    }

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
                                    iconURL: `https://ddragon.leagueoflegends.com/cdn/${currentVersion}/img/profileicon/${datasumm.profileIconId}.png`,
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
                                    `https://ddragon.leagueoflegends.com/cdn/${currentVersion}/img/profileicon/${datasumm.profileIconId}.png`
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
                                    iconURL: `https://ddragon.leagueoflegends.com/cdn/${currentVersion}/img/profileicon/${datasumm.profileIconId}.png`,
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
                                    `https://ddragon.leagueoflegends.com/cdn/${currentVersion}/img/profileicon/${datasumm.profileIconId}.png`
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
                                    iconURL: `https://ddragon.leagueoflegends.com/cdn/${currentVersion}/img/profileicon/${datasumm.profileIconId}.png`,
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
                                    `https://ddragon.leagueoflegends.com/cdn/${currentVersion}/img/profileicon/${datasumm.profileIconId}.png`
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
        let currentVersionPatch;
        await fetch(`https://ddragon.leagueoflegends.com/api/versions.json`)
            .then((res) => res.json())
            .then((version) => {
                currentVersionPatch = version[0].slice(0, -2);
            })
            .catch((err) => {
                console.log(err);
            });

        const patchVersionWithDash = currentVersionPatch.replace(".", "-");
        const patchVersionWithDot = currentVersionPatch;

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
                    .setThumbnail(imgEzreal)
                    .setImage(imgPatch)
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

    //COMANDO CARTELERA CINE
    if (interaction.commandName === "carteleracine") {
        const author = interaction.user.id;

        await fetch(
            `https://api.themoviedb.org/3/movie/now_playing?api_key=${tmdbApi}&language=es-ES&page=1`
        )
            .then((res) => res.json())
            .then(async (data) => {
                data.results.length = data.results.length - 10;

                const embed1 = new EmbedBuilder()
                    .setColor("#FF0000")
                    .setTitle(data.results[0].title)
                    .setDescription(
                        `${
                            data.results[0].overview.length > 1000
                                ? data.results[0].overview.substring(0, 1000) +
                                  "..."
                                : data.results[0].overview
                        }`
                    )
                    .addFields(
                        {
                            name: "Fecha Estreno",
                            value: moment(data.results[0].release_date).format(
                                "DD-MM-YYYY"
                            ),
                            inline: true,
                        },
                        {
                            name: "Puntuación",
                            value: `⠀⠀${data.results[1].vote_average.toString()}`,
                            inline: true,
                        }
                    )
                    .setThumbnail(
                        `https://image.tmdb.org/t/p/w500/${data.results[0].poster_path}`
                    )
                    .setTimestamp()
                    .setFooter({
                        text: versionbot,
                        iconURL: client.user.displayAvatarURL(),
                    });

                const embed2 = new EmbedBuilder()
                    .setColor("#FF0000")
                    .setTitle(data.results[1].title)
                    .setDescription(
                        `${
                            data.results[1].overview.length > 1000
                                ? data.results[1].overview.substring(0, 1000) +
                                  "..."
                                : data.results[1].overview
                        }`
                    )
                    .addFields(
                        {
                            name: "Fecha Estreno",
                            value: moment(data.results[1].release_date).format(
                                "DD-MM-YYYY"
                            ),
                            inline: true,
                        },
                        {
                            name: "Puntuación",
                            value: `⠀⠀${data.results[1].vote_average.toString()}`,
                            inline: true,
                        }
                    )
                    .setThumbnail(
                        `https://image.tmdb.org/t/p/w500/${data.results[1].poster_path}`
                    )
                    .setTimestamp()
                    .setFooter({
                        text: versionbot,
                        iconURL: client.user.displayAvatarURL(),
                    });

                const embed3 = new EmbedBuilder()
                    .setColor("#FF0000")
                    .setTitle(data.results[2].title)
                    .setDescription(
                        `${
                            data.results[2].overview.length > 1000
                                ? data.results[2].overview.substring(0, 1000) +
                                  "..."
                                : data.results[2].overview
                        }`
                    )
                    .addFields(
                        {
                            name: "Fecha Estreno",
                            value: moment(data.results[2].release_date).format(
                                "DD-MM-YYYY"
                            ),
                            inline: true,
                        },
                        {
                            name: "Puntuación",
                            value: `⠀⠀${data.results[2].vote_average.toString()}`,
                            inline: true,
                        }
                    )
                    .setThumbnail(
                        `https://image.tmdb.org/t/p/w500/${data.results[2].poster_path}`
                    )
                    .setTimestamp()
                    .setFooter({
                        text: versionbot,
                        iconURL: client.user.displayAvatarURL(),
                    });

                const embed4 = new EmbedBuilder()
                    .setColor("#FF0000")
                    .setTitle(data.results[3].title)
                    .setDescription(
                        `${
                            data.results[3].overview.length > 1000
                                ? data.results[3].overview.substring(0, 1000) +
                                  "..."
                                : data.results[3].overview
                        }`
                    )
                    .addFields(
                        {
                            name: "Fecha Estreno",
                            value: moment(data.results[3].release_date).format(
                                "DD-MM-YYYY"
                            ),
                            inline: true,
                        },
                        {
                            name: "Puntuación",
                            value: `⠀⠀${data.results[3].vote_average.toString()}`,
                            inline: true,
                        }
                    )
                    .setThumbnail(
                        `https://image.tmdb.org/t/p/w500/${data.results[3].poster_path}`
                    )
                    .setTimestamp()
                    .setFooter({
                        text: versionbot,
                        iconURL: client.user.displayAvatarURL(),
                    });

                const embed5 = new EmbedBuilder()
                    .setColor("#FF0000")
                    .setTitle(data.results[4].title)
                    .setDescription(
                        `${
                            data.results[4].overview.length > 1000
                                ? data.results[4].overview.substring(0, 1000) +
                                  "..."
                                : data.results[4].overview
                        }`
                    )
                    .addFields(
                        {
                            name: "Fecha Estreno",
                            value: moment(data.results[4].release_date).format(
                                "DD-MM-YYYY"
                            ),
                            inline: true,
                        },
                        {
                            name: "Puntuación",
                            value: `⠀⠀${data.results[4].vote_average.toString()}`,
                            inline: true,
                        }
                    )
                    .setThumbnail(
                        `https://image.tmdb.org/t/p/w500/${data.results[4].poster_path}`
                    )
                    .setTimestamp()
                    .setFooter({
                        text: versionbot,
                        iconURL: client.user.displayAvatarURL(),
                    });

                const embed6 = new EmbedBuilder()
                    .setColor("#FF0000")
                    .setTitle(data.results[5].title)
                    .setDescription(
                        `${
                            data.results[5].overview.length > 1000
                                ? data.results[5].overview.substring(0, 1000) +
                                  "..."
                                : data.results[5].overview
                        }`
                    )
                    .addFields(
                        {
                            name: "Fecha Estreno",
                            value: moment(data.results[5].release_date).format(
                                "DD-MM-YYYY"
                            ),
                            inline: true,
                        },
                        {
                            name: "Puntuación",
                            value: `⠀⠀${data.results[5].vote_average.toString()}`,
                            inline: true,
                        }
                    )
                    .setThumbnail(
                        `https://image.tmdb.org/t/p/w500/${data.results[5].poster_path}`
                    )
                    .setTimestamp()
                    .setFooter({
                        text: versionbot,
                        iconURL: client.user.displayAvatarURL(),
                    });

                const embed7 = new EmbedBuilder()
                    .setColor("#FF0000")
                    .setTitle(data.results[6].title)
                    .setDescription(
                        `${
                            data.results[6].overview.length > 1000
                                ? data.results[6].overview.substring(0, 1000) +
                                  "..."
                                : data.results[6].overview
                        }`
                    )
                    .addFields(
                        {
                            name: "Fecha Estreno",
                            value: moment(data.results[6].release_date).format(
                                "DD-MM-YYYY"
                            ),
                            inline: true,
                        },
                        {
                            name: "Puntuación",
                            value: `⠀⠀${data.results[6].vote_average.toString()}`,
                            inline: true,
                        }
                    )
                    .setThumbnail(
                        `https://image.tmdb.org/t/p/w500/${data.results[6].poster_path}`
                    )
                    .setTimestamp()
                    .setFooter({
                        text: versionbot,
                        iconURL: client.user.displayAvatarURL(),
                    });

                const embed8 = new EmbedBuilder()
                    .setColor("#FF0000")
                    .setTitle(data.results[7].title)
                    .setDescription(
                        `${
                            data.results[7].overview.length > 1000
                                ? data.results[7].overview.substring(0, 1000) +
                                  "..."
                                : data.results[7].overview
                        }`
                    )
                    .addFields(
                        {
                            name: "Fecha Estreno",
                            value: moment(data.results[7].release_date).format(
                                "DD-MM-YYYY"
                            ),
                            inline: true,
                        },
                        {
                            name: "Puntuación",
                            value: `⠀⠀${data.results[7].vote_average.toString()}`,
                            inline: true,
                        }
                    )
                    .setThumbnail(
                        `https://image.tmdb.org/t/p/w500/${data.results[7].poster_path}`
                    )
                    .setTimestamp()
                    .setFooter({
                        text: versionbot,
                        iconURL: client.user.displayAvatarURL(),
                    });

                const embed9 = new EmbedBuilder()
                    .setColor("#FF0000")
                    .setTitle(data.results[8].title)
                    .setDescription(
                        `${
                            data.results[8].overview.length > 1000
                                ? data.results[8].overview.substring(0, 1000) +
                                  "..."
                                : data.results[8].overview
                        }`
                    )
                    .addFields(
                        {
                            name: "Fecha Estreno",
                            value: moment(data.results[8].release_date).format(
                                "DD-MM-YYYY"
                            ),
                            inline: true,
                        },
                        {
                            name: "Puntuación",
                            value: `⠀⠀${data.results[8].vote_average.toString()}`,
                            inline: true,
                        }
                    )
                    .setThumbnail(
                        `https://image.tmdb.org/t/p/w500/${data.results[8].poster_path}`
                    )
                    .setTimestamp()
                    .setFooter({
                        text: versionbot,
                        iconURL: client.user.displayAvatarURL(),
                    });

                const embed10 = new EmbedBuilder()
                    .setColor("#FF0000")
                    .setTitle(data.results[9].title)
                    .setDescription(
                        `${
                            data.results[9].overview.length > 1000
                                ? data.results[9].overview.substring(0, 1000) +
                                  "..."
                                : data.results[9].overview
                        }`
                    )
                    .addFields(
                        {
                            name: "Fecha Estreno",
                            value: moment(data.results[9].release_date).format(
                                "DD-MM-YYYY"
                            ),
                            inline: true,
                        },
                        {
                            name: "Puntuación",
                            value: `⠀⠀${data.results[9].vote_average.toString()}`,
                            inline: true,
                        }
                    )
                    .setThumbnail(
                        `https://image.tmdb.org/t/p/w500/${data.results[9].poster_path}`
                    )
                    .setTimestamp()
                    .setFooter({
                        text: versionbot,
                        iconURL: client.user.displayAvatarURL(),
                    });

                await client.users.fetch(author).then((user) => {
                    user.send({
                        embeds: [
                            embed1,
                            embed2,
                            embed3,
                            embed4,
                            embed5,
                            embed6,
                            embed7,
                            embed8,
                            embed9,
                            embed10,
                        ],
                    });
                });
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                interaction.reply({
                    content:
                        ":white_check_mark: ¡ Se ha enviado la cartelera a tu DM !",
                    ephemeral: true,
                });
            });
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
                    name: `*${prefix}carteleracine*`,
                    value: "`Cartelera de cine.`",
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
                    name: `*${prefix}ping*`,
                    value: "`Ping del bot.`",
                    inline: true,
                },
                {
                    name: `*${prefix}enviarmd + usuario*`,
                    value: "`Enviar mensajes privados. (Admin/Mods)`",
                    inline: true,
                },
                {
                    name: `*${prefix}borrar + nº*`,
                    value: "`Borrar mensajes. (Admin/Mods)`",
                    inline: true,
                },
                {
                    name: `*${prefix}email*`,
                    value: "`Enviar email. (Admin)`",
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

client.login(token);
