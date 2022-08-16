import { EmbedBuilder } from "discord.js";
import nodeSuperFetch from "node-superfetch";
import twitch from "../Schemas/twitchSchema.js";

const setIntervalTwitch = async (client, user) => {
    const versionbot = "PerBot v2.0 Peralstudio.com";
    setInterval(async () => {
        const firstLetter = user.charAt(0);
        const firstLetterCap = firstLetter.toUpperCase();
        const remainingLetters = user.slice(1);
        const capitalizedUser = firstLetterCap + remainingLetters;

        console.log(
            `Comprobando Twitch ${capitalizedUser} - (${new Date().toLocaleTimeString(
                "es-ES",
                {
                    timeZone: "Europe/Madrid",
                }
            )})`
        );

        const httpHeaders = {
            "User-Agent": "PerBot",
        };

        const uptime = await nodeSuperFetch.get(
            `https://decapi.me/twitch/uptime/${user}`,
            { headers: httpHeaders }
        );
        const avatar = await nodeSuperFetch.get(
            `https://decapi.me/twitch/avatar/${user}`,
            { headers: httpHeaders }
        );
        const viewers = await nodeSuperFetch.get(
            `https://decapi.me/twitch/viewercount/${user}`,
            { headers: httpHeaders }
        );
        const title = await nodeSuperFetch.get(
            `https://decapi.me/twitch/title/${user}`,
            { headers: httpHeaders }
        );
        const game = await nodeSuperFetch.get(
            `https://decapi.me/twitch/game/${user}`,
            { headers: httpHeaders }
        );

        if (uptime.text !== `${user} is offline`) {
            let data = await twitch.findOne({
                user: user,
                titulo: title.body,
            });

            const embed = new EmbedBuilder()
                .setAuthor({
                    name: `${capitalizedUser}`,
                    iconURL: `${avatar.body}`,
                })
                .setTitle(`${title.body}`)
                .setThumbnail(`${avatar.body}`)
                .setURL(`https://twitch.tv/${user}`)
                .addFields(
                    {
                        name: "Jugando a",
                        value: `${game.body}`,
                        inline: true,
                    },
                    {
                        name: "Viewers",
                        value: `${viewers.body}`,
                        inline: true,
                    }
                )
                .setImage(
                    `https://static-cdn.jtvnw.net/previews-ttv/live_user_${user}-1920x1080.jpg`
                )
                .setTimestamp()
                .setFooter({
                    text: versionbot,
                    iconURL: client.user.displayAvatarURL(),
                })
                .setColor("#AA70F8");

            if (!data) {
                const newData = new twitch({
                    user: user,
                    titulo: `${title.body}`,
                    date: new Date().toLocaleString("es-ES", {
                        timeZone: "Europe/Madrid",
                    }),
                });

                await client.channels.cache.get("1009104666849726625").send({
                    content: `<@209338137346834433> - ${capitalizedUser} esta en directo jugando a **${game.body}** \n https://twitch.tv/${user}`,
                    embeds: [embed],
                });

                return await newData.save();
            }

            if (data.titulo === `${title.body}`) {
                return;
            }

            if (parseInt(uptime.text[0]) > 0) {
                return;
            } else {
                await client.channels.cache.get("1009104666849726625").send({
                    content: `<@209338137346834433> - ${capitalizedUser} esta en directo jugando a **${game.body}** \n https://twitch.tv/${user}`,
                    embeds: [embed],
                });

                await twitch.findOneAndUpdate(
                    { user: user },
                    { titulo: title.body }
                );
            }
        }
    }, 120000);
};

export default setIntervalTwitch;
