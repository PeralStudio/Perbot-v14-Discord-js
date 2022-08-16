import { EmbedBuilder } from "discord.js";
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

        console.log(`Comprobando youtube ${userId}`);

        let data = await youtube.findOne({
            user: videos.items[0].authorId,
            titulo: videos.items[0].title,
        });

        const embed = new EmbedBuilder()
            .setAuthor({
                name: `${videos.items[0].author}`,
                iconURL: channel.authorThumbnails[0].url,
            })
            .setTitle(`${videos.items[0].title}`)
            .setThumbnail(`${channel.authorThumbnails[0].url}`)
            .setURL(
                `https://www.youtube.com/watch?v=${videos.items[0].videoId}`
            )
            .setImage(
                `${
                    videos.items[0].videoThumbnails[2].url ||
                    videos.items[0].videoThumbnails[0].url
                }`
            )
            .setTimestamp()
            .setFooter({
                text: versionbot,
                iconURL: client.user.displayAvatarURL(),
            })
            .setColor(0x00ff00);

        if (!data) {
            const newData = new youtube({
                user: videos.items[0].authorId,
                titulo: videos.items[0].title,
            });

            if (ultimoVideo.liveNow === true) {
                await client.channels.cache.get("1008006504244334722").send({
                    content: `<@209338137346834433> - **${videos.items[0].author}** esta en **directo**  \n  `,
                    embeds: [embed],
                });
                console.log("Esta en vivo");
            } else {
                await client.channels.cache.get("1008006504244334722").send({
                    content: `<@209338137346834433> - **${videos.items[0].author}** ha subido un **nuevo video**  \n  `,
                    embeds: [embed],
                });
                console.log("Subió nuevo video");
            }

            return await newData.save();
        }
        if (data.titulo === `${videos.items[0].title}`) {
            return;
        }

        if (ultimoVideo.liveNow === true) {
            await client.channels.cache.get("1008006504244334722").send({
                content: `<@209338137346834433> - **${videos.items[0].author}** esta en **directo**  \n  `,
                embeds: [embed],
            });
            console.log("Esta en vivo");
        } else {
            await client.channels.cache.get("1008006504244334722").send({
                content: `<@209338137346834433> - **${videos.items[0].author}** ha subido un **nuevo video**  \n  `,
                embeds: [embed],
            });
            console.log("Subió nuevo video");
        }

        await youtube.findOneAndUpdate(
            { user: videos.items[0].authorId },
            { titulo: videos.items[0].title }
        );
    }, 120000);
};

export default setIntervalYoutube;