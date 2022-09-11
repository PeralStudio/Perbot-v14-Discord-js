import { getGames } from "epic-free-games";
import { EmbedBuilder } from "discord.js";

const epicGamesFree = async (client) => {
    const versionbot = "PerBot v2.0 Peralstudio.com";
    const now = new Date();
    if (
        now.getDay() == 4 &&
        now.getHours().toLocaleString() == 17 &&
        now.getMinutes().toLocaleString().toString() === "30"
    ) {
        getGames("ES", true)
            .then(async (res) => {
                console.log(res.currentGames[0]);
                const formatPrice = (num) => {
                    let str = num.toString().split(".");
                    str[0] = str[0].replace(/\B(?=(\d{2})+(?!\d))/g, ",");
                    return str.join(".");
                };

                //JUEGOS GRATIS ¡AHORA!
                const embedFree = new EmbedBuilder()
                    .setTitle(
                        `¡Juegos Gratis Ahora!\n⬇️     ⬇️     ⬇️     ⬇️     ⬇️`
                    )
                    .setColor("#ffffff");

                const embed = new EmbedBuilder()
                    .setTitle(`${res.currentGames[0].title}`)
                    .setDescription(
                        `${
                            res.currentGames[0].description
                        }\n\nhttps://store.epicgames.com/es-ES/p/${
                            res.currentGames[0].urlSlug.includes("-")
                                ? res.currentGames[0].urlSlug
                                : res.currentGames[0].offerMappings[0]?.pageSlug
                        }`
                    )
                    .setImage(res.currentGames[0]?.keyImages[0]?.url)
                    .addFields({
                        name: "Precio Normal",
                        value: `${formatPrice(
                            res.currentGames[0].price.totalPrice.originalPrice
                        )}€`,
                    })
                    .setTimestamp()
                    .setFooter({
                        text: versionbot,
                        iconURL: client?.user.displayAvatarURL(),
                    })
                    .setColor("#180830");

                const embed2 = new EmbedBuilder()
                    .setTitle(`${res.currentGames[1].title}`)
                    .setDescription(
                        `${
                            res.currentGames[1].description
                        }\n\nhttps://store.epicgames.com/es-ES/p/${
                            res.currentGames[1].urlSlug.includes("-")
                                ? res.currentGames[1].urlSlug
                                : res.currentGames[1].offerMappings[0]?.pageSlug
                        }`
                    )
                    .setImage(res.currentGames[1]?.keyImages[1]?.url)
                    .addFields({
                        name: "Precio Normal",
                        value: `${formatPrice(
                            res.currentGames[1].price?.totalPrice?.originalPrice
                        )}€`,
                    })
                    .setTimestamp()
                    .setFooter({
                        text: versionbot,
                        iconURL: client?.user.displayAvatarURL(),
                    })
                    .setColor("#180830");

                //JUEGOS GRATIS ¡SEMANA QUE VIENE!
                const embedFree2 = new EmbedBuilder()
                    .setTitle(
                        `¡Juegos Gratis La Semana Que Viene! \n        ⬇️     ⬇️     ⬇️     ⬇️     ⬇️     ⬇️`
                    )
                    .setColor("#ffffff");

                const embed3 = new EmbedBuilder()
                    .setTitle(`${res.nextGames[0].title}`)
                    .setDescription(
                        `${
                            res.nextGames[0].description
                        }\n\nhttps://store.epicgames.com/es-ES/p/${
                            res.nextGames[0].urlSlug.includes("-")
                                ? res.nextGames[0].urlSlug
                                : res.nextGames[0].offerMappings[0]?.pageSlug
                        }`
                    )
                    .setImage(res.nextGames[0]?.keyImages[0]?.url)
                    .addFields({
                        name: "Precio Normal",
                        value: `${formatPrice(
                            res.nextGames[0].price?.totalPrice?.originalPrice
                        )}€`,
                    })
                    .setTimestamp()
                    .setFooter({
                        text: versionbot,
                        iconURL: client?.user.displayAvatarURL(),
                    })
                    .setColor("#180830");

                const embed4 = new EmbedBuilder()
                    .setTitle(`${res.nextGames[1].title}`)
                    .setDescription(
                        `${
                            res.nextGames[1].description
                        }\n\nhttps://store.epicgames.com/es-ES/p/${
                            res.nextGames[1].urlSlug.includes("-")
                                ? res.nextGames[1].urlSlug
                                : res.nextGames[1].offerMappings[0]?.pageSlug
                        }`
                    )
                    .setImage(res.nextGames[1]?.keyImages[1]?.url)
                    .addFields({
                        name: "Precio Normal",
                        value: `${formatPrice(
                            res.nextGames[1].price?.totalPrice?.originalPrice
                        )}€`,
                    })
                    .setTimestamp()
                    .setFooter({
                        text: versionbot,
                        iconURL: client?.user.displayAvatarURL(),
                    })
                    .setColor("#180830");

                await client?.channels.cache.get("1018578696627568701").send({
                    embeds: [
                        embedFree,
                        embed,
                        embed2,
                        embedFree2,
                        embed3,
                        embed4,
                    ],
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    setTimeout(epicGamesFree, 60000);
};

export default epicGamesFree;
