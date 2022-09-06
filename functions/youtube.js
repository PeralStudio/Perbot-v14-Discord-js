// import { EmbedBuilder } from "discord.js";
import ytch from "yt-channel-info";
import youtube from "../Schemas/youtubeSchema.js";

const setIntervalYoutube = async (client, userId) => {
    const versionbot = "PerBot v2.0 Peralstudio.com";
    const payload = {
        channelId: userId,
    };

    const { getChannelVideos, getChannelInfo } = ytch;

    setInterval(async () => {
        const videos = await getChannelVideos(payload, 0);
        const channel = await getChannelInfo(payload, 0);
        const ultimoVideo = videos.items[0];

        console.log(
            `Comprobando youtube ${userId} - (${new Date().toLocaleTimeString(
                "es-ES",
                {
                    timeZone: "Europe/Madrid",
                }
            )})`
        );

        let data = await youtube.findOne({
            user: ultimoVideo.authorId,
        });

        // const embed = new EmbedBuilder()
        //     .setAuthor({
        //         name: `${ultimoVideo.author}`,
        //         iconURL: channel.authorThumbnails[0].url,
        //     })
        //     .setTitle(`${ultimoVideo.title}`)
        //     .setThumbnail(`${channel.authorThumbnails[0].url}`)
        //     .setURL(
        //         `https://www.youtube.com/watch?v=${ultimoVideo.videoId}`
        //     )
        //     .setImage(
        //         `${
        //             ultimoVideo.videoThumbnails[2].url ||
        //             ultimoVideo.videoThumbnails[0].url
        //         }`
        //     )
        //     .setTimestamp()
        //     .setFooter({
        //         text: versionbot,
        //         iconURL: client.user.displayAvatarURL(),
        //     })
        //     .setColor(0x00ff00);

        if (!data) {
            const newData = new youtube({
                user: ultimoVideo.authorId,
                titulo: ultimoVideo.title,
                date: new Date().toLocaleString("es-ES", {
                    timeZone: "Europe/Madrid",
                }),
            });

            if (ultimoVideo.liveNow === true) {
                await client.channels.cache.get("1009141517044166757").send({
                    content:
                        "<@209338137346834433> \n ¡ **`" +
                        ultimoVideo.author +
                        "`** esta en 🔴 `DIRECTO` ! \n https://www.youtube.com/watch?v=" +
                        ultimoVideo.videoId,
                    // content: `<@209338137346834433> \n ¡ **${ultimoVideo.author}** esta en **directo** ! \n https://www.youtube.com/watch?v=${ultimoVideo.videoId} `,
                    // embeds: [embed],
                });

                await newData.save();
            } else {
                // FILTRO SI ES MENOR A 60 SEGUNDOS NO NOTIFICAR
                if (
                    ultimoVideo?.lengthSeconds < 120 &&
                    ultimoVideo.liveNow === false
                ) {
                    return;
                }
                await client.channels.cache.get("1009141517044166757").send({
                    content:
                        "<@209338137346834433> \n ¡ **`" +
                        ultimoVideo.author +
                        "`** ha subido un `NUEVO VÍDEO` ! Duración: (" +
                        ultimoVideo.durationText +
                        ") \n https://www.youtube.com/watch?v=" +
                        ultimoVideo.videoId,
                    // content: `<@209338137346834433> \n ¡ **${ultimoVideo.author}** ha subido un **nuevo video** ! \n https://www.youtube.com/watch?v=${ultimoVideo.videoId}`,
                    // embeds: [embed],
                });

                await newData.save();
            }
        } else {
            if (data.titulo === ultimoVideo.title) {
                return;
            } else {
                // FILTRO SI ES MENOR A 60 SEGUNDOS Y NO ES ¡DIRECTO! NO NOTIFICAR
                if (
                    ultimoVideo?.lengthSeconds < 120 &&
                    ultimoVideo.liveNow === false
                ) {
                    console.log("Video menor a 60 segundos = short");
                    return;
                }

                if (ultimoVideo.liveNow === true) {
                    await client.channels.cache
                        .get("1009141517044166757")
                        .send({
                            content:
                                "<@209338137346834433> \n ¡ **`" +
                                ultimoVideo.author +
                                "`** esta en 🔴 `DIRECTO` ! \n https://www.youtube.com/watch?v=" +
                                ultimoVideo.videoId,
                            // content: `<@209338137346834433> \n ¡ **${ultimoVideo.author}** esta en **directo** ! \n https://www.youtube.com/watch?v=${ultimoVideo.videoId} `,
                            // embeds: [embed],
                        });

                    await youtube.findOneAndUpdate(
                        {
                            user: ultimoVideo.authorId,
                        },
                        {
                            titulo: ultimoVideo.title,
                            date: new Date().toLocaleString("es-ES", {
                                timeZone: "Europe/Madrid",
                            }),
                        }
                    );
                } else {
                    // FILTRO SI ES MENOR A 60 SEGUNDOS NO NOTIFICAR
                    if (
                        ultimoVideo?.lengthSeconds < 120 &&
                        ultimoVideo.liveNow === false
                    ) {
                        return;
                    }
                    await client.channels.cache
                        .get("1009141517044166757")
                        .send({
                            content:
                                "<@209338137346834433> \n ¡ **`" +
                                ultimoVideo.author +
                                "`** ha subido un `NUEVO VÍDEO` ! Duración: (" +
                                ultimoVideo.durationText +
                                ") \n https://www.youtube.com/watch?v=" +
                                ultimoVideo.videoId,
                            // content: `<@209338137346834433> \n ¡ **${ultimoVideo.author}** ha subido un **nuevo video** ! \n https://www.youtube.com/watch?v=${ultimoVideo.videoId} `,
                            // embeds: [embed],
                        });

                    await youtube.findOneAndUpdate(
                        {
                            user: ultimoVideo.authorId,
                        },
                        {
                            titulo: ultimoVideo.title,
                            date: new Date().toLocaleString("es-ES", {
                                timeZone: "Europe/Madrid",
                            }),
                        }
                    );
                }
            }
        }
    }, 240000);
};

export default setIntervalYoutube;
