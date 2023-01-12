import * as dotenv from "dotenv";
dotenv.config();

const {
    ELRELLANO_CHANNEL_ID,
    YOUTUBE_CHANNEL_ID,
    TWITCH_CHANNEL_ID,
    EPICGAMES_CHANNEL_ID,
} = process.env;

export const deleteOldMsg = (client, channelID, elrellano) => {
    let channelName;
    let time;
    if (channelID === ELRELLANO_CHANNEL_ID) {
        channelName = "🎦-elrellano";
        time = 1440 * 60 * 1000;
    } else if (channelID === YOUTUBE_CHANNEL_ID) {
        channelName = "🔴-alertas-youtube";
        time = 3 * 1440 * 60 * 1000;
    } else if (channelID === TWITCH_CHANNEL_ID) {
        channelName = "🟣-alertas-twitch";
        time = 2 * 1440 * 60 * 1000;
    } else if (channelID === EPICGAMES_CHANNEL_ID) {
        channelName = "🎮-free-epic-games";
        time = 7 * 1440 * 60 * 1000;
    }

    client.channels
        .fetch(channelID)
        .then((channel) => {
            channel.messages
                .fetch({ limit: 36 })
                .then(async (messages) => {
                    const oldMessages = messages.filter((m) => {
                        return m.createdTimestamp < Date.now() - time;
                    });

                    if (oldMessages.size > 0) {
                        //Delete messages channel Discord
                        await channel.bulkDelete(oldMessages);

                        let text1;
                        let text2;
                        let text3;
                        if (oldMessages.size >= 2) {
                            text1 = "Mensajes";
                            text2 = "antiguos";
                            text3 = "borrados";
                        } else {
                            text1 = "Mensaje";
                            text2 = "antiguo";
                            text3 = "borrado";
                        }

                        console.log(
                            `${
                                oldMessages.size
                            } ${text1} ${text2} ${text3} de el canal: ${channelName} (${new Date().toLocaleTimeString(
                                "es-ES",
                                {
                                    timeZone: "Europe/Madrid",
                                }
                            )})`
                        );

                        if (channelID === ELRELLANO_CHANNEL_ID) {
                            //Delete document MongoDB
                            const oldestDocuments = await elrellano
                                .find({})
                                .sort({ _id: 1 })
                                .limit(oldMessages.size);

                            for (let oldest of oldestDocuments) {
                                await elrellano.deleteOne({ _id: oldest._id });
                            }
                        }
                    }
                })
                .catch(console.error);
        })
        .catch(console.error);
};
