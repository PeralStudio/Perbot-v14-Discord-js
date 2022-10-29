import { EmbedBuilder } from "discord.js";
import ytch from "yt-channel-info";
import playListYoutubeSchema from "../Schemas/playListYoutubeSchema.js";

const setIntervalYoutubePlayList = async (client) => {
    const versionbot = "PerBot v2.0 Peralstudio.com";

    const { getChannelPlaylistInfo /* , getChannelInfo */ } = ytch;

    setInterval(async () => {
        const payload = {
            channelId: "pejequiel",
        };

        // const playList = await ytch
        //     .getChannelPlaylistInfo(payload)
        //     .then((response) => {
        //         return response.items[0];
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //     });

        const playList = await getChannelPlaylistInfo(payload, 0)
            .then((response) => {
                return response.items[0];
            })
            .catch((err) => {
                console.log(err);
            });

        let data = await playListYoutubeSchema.findOne({
            playListAuthorID: playList.authorId,
        });

        console.log(playList);

        if (data === null) {
            const newData = new playListYoutubeSchema({
                playListAuthorID: playList.authorId,
                playListCount: playList.videoCount,
                playlistUrl: playList.playlistUrl,
            });

            await newData.save();
            await client.channels.cache.get("1009141517044166757").send({
                content:
                    `¡Playlist Actualizada! **(Total Videos: ${playList.videoCount})** \n` +
                    playList.playlistUrl,
            });
            return;
        } else if (data.playListCount !== playList.videoCount) {
            const embed = new EmbedBuilder()
                .setAuthor({
                    name: `¡Playlist Actualizada!`,
                    iconURL: `${client.user.displayAvatarURL()}`,
                })
                .setTitle(`:link: Ver Playlist: ${playList.title}`)
                .setThumbnail(
                    "https://www.thesun.co.uk/wp-content/uploads/2017/10/nc-logo-youtube-mobile.jpg?strip=all&w=750&h=352&crop=1"
                )
                .setURL(playList.playlistUrl)
                .addFields(
                    {
                        name: "Autor",
                        value: `${playList.author}`,
                        inline: true,
                    },
                    {
                        name: "Videos",
                        value: `${playList.videoCount}`,
                        inline: true,
                    }
                )
                .setImage(playList.playlistThumbnail)
                .setTimestamp()
                .setFooter({
                    text: versionbot,
                    iconURL: client.user.displayAvatarURL(),
                })
                .setColor("#AA70F8");

            await client.channels.cache.get("1009141517044166757").send({
                embeds: [embed],
            });

            await playListYoutubeSchema.findOneAndUpdate(
                {
                    playListAuthorID: playList.authorId,
                },
                {
                    playListCount: playList.videoCount,
                    playlistUrl: playList.playlistUrl,
                }
            );
            return;
        } else {
            return;
        }
    }, 240000);
};

export default setIntervalYoutubePlayList;
