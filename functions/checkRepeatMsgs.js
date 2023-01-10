const checkRepeatMsgs = async (client, channelID) => {
    client.channels.fetch(channelID).then((channel) => {
        channel.messages
            .fetch({ limit: 99 })
            .then((messages) => {
                const uniqueMessageSet = new Set();
                const uniqueMessages = messages.filter((message) => {
                    if (!uniqueMessageSet.has(message.content)) {
                        uniqueMessageSet.add(message.content);
                        return false;
                    }
                    return true;
                });

                uniqueMessages.forEach(async (message) => {
                    await message.delete({
                        timeout: 2000,
                        reason: "deleting repeat messages",
                    });
                    console.log(
                        `Mensajes repetidos borrados en el canal: ${channelID}`
                    );
                });
            })
            .catch(console.error);
    });
};

export default checkRepeatMsgs;
