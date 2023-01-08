export const deleteOldMessages = (client, channelID) => {
    client.channels
        .fetch(channelID)
        .then((channel) => {
            channel.messages
                .fetch({ limit: 60 })
                .then(async (messages) => {
                    const oldMessages = messages.filter((m) => {
                        return (
                            m.createdTimestamp <
                            Date.now() - 2 * 1440 * 60 * 1000 //24Horas - 1440 * 60 * 1000 //48Horas - 2 * 1440 * 60 * 1000
                        );
                    });

                    if (oldMessages.size <= 0) {
                        console.log(
                            `${
                                oldMessages.size
                            } Mensajes antiguos borrados de el canal: 🎮-free-epic-games (${new Date().toLocaleTimeString(
                                "es-ES",
                                {
                                    timeZone: "Europe/Madrid",
                                }
                            )})`
                        );
                        return;
                    } else {
                        await channel.bulkDelete(oldMessages);
                        console.log(
                            `${
                                oldMessages.size
                            } Mensajes antiguos borrados de el canal: 🎮-free-epic-games (${new Date().toLocaleTimeString(
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
