const checkRepeatMsgs = async (client, channelID) => {
    client.channels.fetch(channelID).then((channel) => {
        channel.messages
            .fetch({ limit: 24 })
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
                    if (message.deleted) return;

                    try {
                        await message.delete({
                            timeout: 2000,
                            reason: "deleting repeat messages",
                        });
                    } catch (err) {
                        null;
                    }
                });
            })
            .catch(console.error);
    });
};

export default checkRepeatMsgs;
