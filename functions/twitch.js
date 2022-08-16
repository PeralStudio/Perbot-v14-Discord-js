import { EmbedBuilder } from "discord.js";
import nodeSuperFetch from "node-superfetch";
import twitch from "../Schemas/twitchSchema.js";

const setIntervalTwitch = async (client, user) => {
    const versionbot = "PerBot v2.0 Peralstudio.com";
    setInterval(async () => {
        const firstLetter = user.charAt(0);
        const firstLetterCap = firstLetter.toUpperCase();
        const remainingLetters = user.slice(1);
        const capitalizedUserStream = firstLetterCap + remainingLetters;

        let userStream = user;

        console.log(
            `Comprobando Twitch ${capitalizedUserStream} - ${new Date().toLocaleTimeString()}`
        );

        const httpHeaders = {
            "User-Agent": "PerBot",
        };

        const uptime = await nodeSuperFetch.get(
            `https://decapi.me/twitch/uptime/${userStream}`,
            { headers: httpHeaders }
        );
        const avatar = await nodeSuperFetch.get(
            `https://decapi.me/twitch/avatar/${userStream}`,
            { headers: httpHeaders }
        );
        const viewers = await nodeSuperFetch.get(
            `https://decapi.me/twitch/viewercount/${userStream}`,
            { headers: httpHeaders }
        );
        const title = await nodeSuperFetch.get(
            `https://decapi.me/twitch/title/${userStream}`,
            { headers: httpHeaders }
        );
        const game = await nodeSuperFetch.get(
            `https://decapi.me/twitch/game/${userStream}`,
            { headers: httpHeaders }
        );

        if (uptime.text !== `${userStream} is offline`) {
            let data = await twitch.findOne({
                user: userStream,
                titulo: title.body,
                date: new Date().toLocaleString(),
            });

            const embed = new EmbedBuilder()
                .setAuthor({
                    name: `${capitalizedUserStream}`,
                    iconURL: `${avatar.body}`,
                })
                .setTitle(`${title.body}`)
                .setThumbnail(`${avatar.body}`)
                .setURL(`https://twitch.tv/${userStream}`)
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
                    `https://static-cdn.jtvnw.net/previews-ttv/live_user_${userStream}-1920x1080.jpg`
                )
                .setTimestamp()
                .setFooter({
                    text: versionbot,
                    iconURL: client.user.displayAvatarURL(),
                })
                .setColor(0x00ff00);

            if (!data) {
                const newData = new twitch({
                    user: userStream,
                    titulo: `${title.body}`,
                });

                await client.channels.cache.get("1009104666849726625").send({
                    content: `<@209338137346834433> - ${capitalizedUserStream} esta en directo jugando a **${game.body}** \n https://twitch.tv/${userStream}`,
                    embeds: [embed],
                });

                return await newData.save();
            }

            if (data.titulo === `${title.body}`) {
                return;
            }

            await client.channels.cache.get("1009104666849726625").send({
                content: `<@209338137346834433> - ${capitalizedUserStream} esta en directo jugando a **${game.body}** \n https://twitch.tv/${userStream}`,
                embeds: [embed],
            });

            await twitch.findOneAndUpdate(
                { user: userStream },
                { titulo: title.body }
            );
        }
    }, 120000);
};

export default setIntervalTwitch;
