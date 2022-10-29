import { EmbedBuilder } from "discord.js";
import ytch from "yt-channel-info";
import playListYoutubeSchema from "../Schemas/playListYoutubeSchema.js";

const youtubePlayList = async (client, idChannel, interaction) => {
    const versionbot = "PerBot v2.0 Peralstudio.com";
    const idChannelLower = idChannel.toLowerCase();
    let error = false;

    const { getChannelPlaylistInfo /* , getChannelInfo */ } = ytch;

    // setInterval(async () => {
    const payload = {
        channelId: idChannelLower,
    };

    const playList = await getChannelPlaylistInfo(payload, 0)
        .then((response) => {
            console.log("res", response);
            return response.items[0];
        })
        .catch((err) => {
            console.log("err", err);
            error = true;
        });

    if (error) {
        interaction.reply({
            content:
                "❌ No se encuentra este usuario o no tiene ninguna playlist pública.",
            ephemeral: true,
        });
        return;
    }

    let data = await playListYoutubeSchema.findOne({
        playListAuthorID: playList.authorId,
    });

    if (data === null) {
        const newData = new playListYoutubeSchema({
            playListAuthor: playList.author,
            playListTitle: playList.title,
            playListAuthorID: playList.authorId,
            playListCount: playList.videoCount,
            playlistUrl: playList.playlistUrl,
        });

        await newData.save();
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

        // await client.channels.cache.get("1009141517044166757").send({
        //     embeds: [embed],
        // });
        interaction.reply({ embeds: [embed], ephemeral: true });
        return;
    } else {
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

        // await client.channels.cache.get("1009141517044166757").send({
        //     embeds: [embed],
        // });
        interaction.reply({ embeds: [embed], ephemeral: true });

        await playListYoutubeSchema.findOneAndUpdate(
            {
                playListAuthorID: playList.authorId,
            },
            {
                playListAuthor: playList.author,
                playListTitle: playList.title,
                playListCount: playList.videoCount,
                playlistUrl: playList.playlistUrl,
            }
        );
        return;
    }
    // }, 240000);
};

export default youtubePlayList;