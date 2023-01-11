export const deleteOldMsgElrellano = (client, channelID, elrellano) => {
    client.channels
        .fetch(channelID)
        .then((channel) => {
            channel.messages
                .fetch({ limit: 60 })
                .then(async (messages) => {
                    const oldMessages = messages.filter((m) => {
                        return (
                            m.createdTimestamp < Date.now() - 1440 * 60 * 1000 //24Horas - 1440 * 60 * 1000 //48Horas - 2 * 1440 * 60 * 1000
                        );
                    });

                    if (oldMessages.size > 0) {
                        //Delete messages channel Discord
                        await channel.bulkDelete(oldMessages);

                        //Delete document MongoDB
                        const oldestDocuments = await elrellano
                            .find({})
                            .sort({ _id: 1 })
                            .limit(oldMessages.size);

                        for (let oldest of oldestDocuments) {
                            await elrellano.deleteOne({ _id: oldest._id });
                        }

                        console.log(
                            `${
                                oldMessages.size
                            } Mensajes antiguos borrados de el canal: 🎦-elrellano (${new Date().toLocaleTimeString(
                                "es-ES",
                                {
                                    timeZone: "Europe/Madrid",
                                }
                            )})`
                        );
                    }
                })
                .catch(console.error);
        })
        .catch(console.error);
};
