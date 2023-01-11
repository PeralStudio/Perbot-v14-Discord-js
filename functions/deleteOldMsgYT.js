export const deleteOldMsgYT = (client, channelID) => {
    client.channels
        .fetch(channelID)
        .then((channel) => {
            channel.messages
                .fetch({ limit: 40 })
                .then(async (messages) => {
                    const oldMessages = messages.filter((m) => {
                        return (
                            m.createdTimestamp <
                            Date.now() - 3 * 1440 * 60 * 1000 //24Horas - 1440 * 60 * 1000 //48Horas - 2 * 1440 * 60 * 1000
                        );
                    });

                    if (oldMessages.size <= 0) {
                        console.log(
                            `No hay mensajes para borrar de el canal: 🔴-alertas-youtube (${new Date().toLocaleTimeString(
                                "es-ES",
                                {
                                    timeZone: "Europe/Madrid",
                                }
                            )})`
                        );
                        return;
                    } else {
                        //Delete messages channel Discord
                        await channel.bulkDelete(oldMessages);

                        console.log(
                            `${
                                oldMessages.size
                            } Mensajes antiguos borrados de el canal: 🔴-alertas-youtube (${new Date().toLocaleTimeString(
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
