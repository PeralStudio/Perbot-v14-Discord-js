import { getGames } from "epic-free-games";
import { EmbedBuilder } from "discord.js";
import dayjs from "dayjs";
import { deleteOldMsg } from "./deleteOldMsg.js";
import * as dotenv from "dotenv";
dotenv.config();

const { NAME_BOT, EPICGAMES_CHANNEL_ID } = process.env;

const epicGamesFree = async (client) => {
    //Delete old messages
    deleteOldMsg(client, EPICGAMES_CHANNEL_ID);

    const date = new Date();
    const hour = date.getHours();
    const day = date.getDay();

    console.log(
        `Comprobando si hay nuevos juegos gratuitos Epic Games - 🎮-free-epic-games (${date.toLocaleTimeString(
            "es-ES",
            {
                timeZone: "Europe/Madrid",
            }
        )})`
    );

    if (day === 4 && hour >= 17 && hour < 23) {
        console.log(
            `(Es miercoles entre las 17:00 y 23:00) Envia embeds al canal: 🎮-free-epic-games (${date.toLocaleTimeString(
                "es-ES",
                {
                    timeZone: "Europe/Madrid",
                }
            )})`
        );

        getGames("ES", true)
            .then(async (res) => {
                const formatPrice = (num) => {
                    if (!num) return;
                    let str = num.toString().split(".");
                    str[0] = str[0].replace(/\B(?=(\d{2})+(?!\d))/g, ",");
                    return str.join(".");
                };

                if (!res) {
                    const embedError = new EmbedBuilder()
                        .setTitle(`Ha ocurrido un error.`)
                        .setTimestamp()
                        .setFooter({
                            text: NAME_BOT,
                            iconURL: client?.user.displayAvatarURL(),
                        })
                        .setColor("#ff0000");

                    client?.channels.cache.get(EPICGAMES_CHANNEL_ID).send({
                        embeds: [embedError],
                    });
                }

                //JUEGOS GRATIS ESTA SEMANA
                const embed = new EmbedBuilder()
                    .setTitle(
                        `Gratis hasta el **${dayjs()
                            .add(7, "day")
                            .format("DD/MM")} a las 17:00**\n\n${res?.currentGames[0]?.title}`
                    )
                    .setDescription(
                        `${
                            res?.currentGames[0]?.description
                        }\n\nhttps://store.epicgames.com/es-ES/p/${
                            res.currentGames[0].urlSlug.includes("-")
                                ? res?.currentGames[0]?.urlSlug
                                : res?.currentGames[0]?.offerMappings[0]?.pageSlug
                        }`
                    )
                    .setThumbnail("https://peralstudio.com/images/epic-games.png")
                    .setImage(res?.currentGames[0]?.keyImages[0]?.url)
                    .addFields(
                        {
                            name: "Precio Normal",
                            value: `${
                                res?.currentGames[0]?.price?.totalPrice?.originalPrice === 0
                                    ? "Gratis"
                                    : `${formatPrice(
                                          res?.currentGames[0]?.price?.totalPrice?.originalPrice
                                      )}€`
                            }`,
                            inline: true,
                        },
                        {
                            name: "Desarroladora",
                            value: `${res?.currentGames[0]?.seller?.name}`,
                            inline: true,
                        }
                    )
                    .setTimestamp()
                    .setFooter({
                        text: NAME_BOT,
                        iconURL: client?.user.displayAvatarURL(),
                    })
                    .setColor("#27963f");

                const embed2 = new EmbedBuilder()
                    .setTitle(
                        `Gratis hasta el **${dayjs()
                            .add(7, "day")
                            .format("DD/MM")} a las 17:00**\n\n${res?.currentGames[1]?.title}`
                    )
                    .setDescription(
                        `${
                            res?.currentGames[1]?.description
                        }\n\nhttps://store.epicgames.com/es-ES/p/${
                            res.currentGames[1]?.urlSlug.includes("-")
                                ? res?.currentGames[1]?.urlSlug
                                : res?.currentGames[1]?.offerMappings[0]?.pageSlug
                        }`
                    )
                    .setThumbnail("https://peralstudio.com/images/epic-games.png")
                    .setImage(res?.currentGames[1]?.keyImages[0]?.url)
                    .addFields(
                        {
                            name: "Precio Normal",
                            value: `${
                                res?.currentGames[1]?.price?.totalPrice?.originalPrice === 0
                                    ? "Gratis"
                                    : `${formatPrice(
                                          res?.currentGames[1]?.price?.totalPrice?.originalPrice
                                      )}€`
                            }`,
                            inline: true,
                        },
                        {
                            name: "Desarroladora",
                            value: `${res?.currentGames[1]?.seller?.name}`,
                            inline: true,
                        }
                    )
                    .setTimestamp()
                    .setFooter({
                        text: NAME_BOT,
                        iconURL: client?.user.displayAvatarURL(),
                    })
                    .setColor("#27963f");

                const embed3 = new EmbedBuilder()
                    .setTitle(
                        `Gratis hasta el **${dayjs()
                            .add(7, "day")
                            .format("DD/MM")} a las 17:00**\n\n${res?.currentGames[2]?.title}`
                    )
                    .setDescription(
                        `${
                            res?.currentGames[2]?.description
                        }\n\nhttps://store.epicgames.com/es-ES/p/${
                            res.currentGames[2].urlSlug.includes("-")
                                ? res?.currentGames[2]?.urlSlug
                                : res?.currentGames[2]?.offerMappings[2]?.pageSlug
                        }`
                    )
                    .setThumbnail("https://peralstudio.com/images/epic-games.png")
                    .setImage(res?.currentGames[2]?.keyImages[2]?.url)
                    .addFields(
                        {
                            name: "Precio Normal",
                            value: `${
                                res?.currentGames[2]?.price?.totalPrice?.originalPrice === 0
                                    ? "Gratis"
                                    : `${formatPrice(
                                          res?.currentGames[2]?.price?.totalPrice?.originalPrice
                                      )}€`
                            }`,
                            inline: true,
                        },
                        {
                            name: "Desarroladora",
                            value: `${res?.currentGames[2]?.seller?.name}`,
                            inline: true,
                        }
                    )
                    .setTimestamp()
                    .setFooter({
                        text: NAME_BOT,
                        iconURL: client?.user.displayAvatarURL(),
                    })
                    .setColor("#27963f");

                //JUEGOS GRATIS ¡SEMANA QUE VIENE!
                const embed4 = new EmbedBuilder()
                    .setTitle(
                        `Gratis del **${dayjs().add(7, "day").format("DD/MM")}** al **${dayjs()
                            .add(14, "day")
                            .format("DD/MM")}**\n\n${res?.nextGames[0]?.title}`
                    )
                    .setDescription(
                        `${res.nextGames[0].description}\n\nhttps://store.epicgames.com/es-ES/p/${
                            res?.nextGames[0]?.urlSlug.includes("-")
                                ? res?.nextGames[0]?.urlSlug
                                : res?.nextGames[0]?.offerMappings[0]?.pageSlug
                        }`
                    )
                    .setThumbnail("https://peralstudio.com/images/epic-games.png")
                    .setImage(res?.nextGames[0]?.keyImages[0]?.url)
                    .addFields(
                        {
                            name: "Precio Normal",
                            value: `${
                                res?.nextGames[0]?.price?.totalPrice?.originalPrice === 0
                                    ? "Gratis"
                                    : `${formatPrice(
                                          res?.nextGames[0]?.price?.totalPrice?.originalPrice
                                      )}€`
                            }`,
                            inline: true,
                        },
                        {
                            name: "Desarroladora",
                            value: `${res?.nextGames[0]?.seller?.name}`,
                            inline: true,
                        }
                    )
                    .setTimestamp()
                    .setFooter({
                        text: NAME_BOT,
                        iconURL: client?.user.displayAvatarURL(),
                    })
                    .setColor("#ba3f3f");

                const embed5 = new EmbedBuilder()
                    .setTitle(
                        `Gratis del **${dayjs().add(7, "day").format("DD/MM")}** al **${dayjs()
                            .add(14, "day")
                            .format("DD/MM")}**\n\n${res?.nextGames[1]?.title}`
                    )
                    .setDescription(
                        `${res?.nextGames[1]?.description}\n\nhttps://store.epicgames.com/es-ES/p/${
                            res?.nextGames[1]?.urlSlug.includes("-")
                                ? res?.nextGames[1]?.urlSlug
                                : res?.nextGames[1]?.offerMappings[0]?.pageSlug
                        }`
                    )
                    .setThumbnail("https://peralstudio.com/images/epic-games.png")
                    .setImage(res?.nextGames[1]?.keyImages[0]?.url)
                    .addFields(
                        {
                            name: "Precio Normal",
                            value: `${
                                res?.nextGames[1]?.price?.totalPrice?.originalPrice === 0
                                    ? "Gratis"
                                    : `${formatPrice(
                                          res?.nextGames[1]?.price?.totalPrice?.originalPrice
                                      )}€`
                            }`,
                            inline: true,
                        },
                        {
                            name: "Desarroladora",
                            value: `${res?.nextGames[1]?.seller?.name}`,
                            inline: true,
                        }
                    )
                    .setTimestamp()
                    .setFooter({
                        text: NAME_BOT,
                        iconURL: client?.user.displayAvatarURL(),
                    })
                    .setColor("#ba3f3f");

                const embed6 = new EmbedBuilder()
                    .setTitle(
                        `Gratis del **${dayjs().add(7, "day").format("DD/MM")}** al **${dayjs()
                            .add(14, "day")
                            .format("DD/MM")}**\n\n${res?.nextGames[2]?.title}`
                    )
                    .setDescription(
                        `${res?.nextGames[2]?.description}\n\nhttps://store.epicgames.com/es-ES/p/${
                            res?.nextGames[2]?.urlSlug.includes("-")
                                ? res?.nextGames[2]?.urlSlug
                                : res?.nextGames[2]?.offerMappings[0]?.pageSlug
                        }`
                    )
                    .setThumbnail("https://peralstudio.com/images/epic-games.png")
                    .setImage(res?.nextGames[2]?.keyImages[0]?.url)
                    .addFields(
                        {
                            name: "Precio Normal",
                            value: `${
                                res?.nextGames[2]?.price?.totalPrice?.originalPrice === 0
                                    ? "Gratis"
                                    : `${formatPrice(
                                          res?.nextGames[2]?.price?.totalPrice?.originalPrice
                                      )}€`
                            }`,
                            inline: true,
                        },
                        {
                            name: "Desarroladora",
                            value: `${res?.nextGames[2]?.seller?.name}`,
                            inline: true,
                        }
                    )
                    .setTimestamp()
                    .setFooter({
                        text: NAME_BOT,
                        iconURL: client?.user.displayAvatarURL(),
                    })
                    .setColor("#ba3f3f");

                const embeds = [];
                res.currentGames[0] && (await embeds.push(embed));
                res.currentGames[1] && (await embeds.push(embed2));
                res.currentGames[2] && (await embeds.push(embed3));
                res.nextGames[0] && (await embeds.push(embed4));
                res.nextGames[1] && (await embeds.push(embed5));
                res.nextGames[2] && (await embeds.push(embed6));

                await client?.channels.cache.get(EPICGAMES_CHANNEL_ID).send({
                    embeds,
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    setTimeout(epicGamesFree, 14400000); //43200000 12Hours //21600000 6Hours //14400000 4Hours
};

export default epicGamesFree;
