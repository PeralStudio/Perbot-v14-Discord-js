export const deleteOldMsgElrellano = (client, channelID, elrellano) => {
    client.channels
        .fetch(channelID)
        .then((channel) => {
            channel.messages
                .fetch({ limit: 60 })
                .then(async (messages) => {
                    const oldMessages = messages.filter((m) => {
                        return (
                            m.createdTimestamp < Date.now() - 1440 * 60 * 1000 //24Hours - 1440 * 60 * 1000 //48Hours - 2 * 1440 * 60 * 1000
                        );
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
                            } ${text1} ${text2} ${text3} de el canal: 🎦-elrellano (${new Date().toLocaleTimeString(
                                "es-ES",
                                {
                                    timeZone: "Europe/Madrid",
                                }
                            )})`
                        );

                        //Delete document MongoDB
                        const oldestDocuments = await elrellano
                            .find({})
                            .sort({ _id: 1 })
                            .limit(oldMessages.size);

                        for (let oldest of oldestDocuments) {
                            await elrellano.deleteOne({ _id: oldest._id });
                        }
                    }
                })
                .catch(console.error);
        })
        .catch(console.error);
};