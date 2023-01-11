import { getGames } from "epic-free-games";
import { EmbedBuilder } from "discord.js";
import dayjs from "dayjs";
import * as dotenv from "dotenv";
dotenv.config();

// Descomment for test in local
// import config from "../config.js";
// const { nameBot } = config;
const { NAME_BOT } = process.env;

const epicGamesFree = async (client) => {
    console.log(
        `epicGamesFree() se ejecuta (${new Date().toLocaleTimeString("es-ES", {
            timeZone: "Europe/Madrid",
        })})`
    );
    const now = new Date();
    const hour = new Date().toLocaleTimeString("es-ES", {
        timeZone: "Europe/Madrid",
    });
    // console.log(hour[0] + hour[1] == "21" && hour[3] + hour[4] == "40");
    // console.log("dia:", now.getDay());
    // console.log("hora:", now.getHours());
    // console.log("minutos: ", now.getMinutes());

    if (
        now.getDay() == 4
        // &&
        // hour[0] + hour[1] == "14" &&
        // hour[3] + hour[4] == "02"
    ) {
        console.log(
            `entra a la condicion y envia embeds (${new Date().toLocaleTimeString(
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

                    client?.channels.cache.get("1018578696627568701").send({
                        embeds: [embedError],
                    });
                }

                //JUEGOS GRATIS ESTA SEMANA
                const embedFree = new EmbedBuilder()
                    .setTitle(
                        `¡ Juegos Gratis La Semana del (**${dayjs().format(
                            "DD/MM/YY"
                        )}**) a (**${dayjs()
                            .add(7, "day")
                            .format("DD/MM/YY")}**) !`
                    )
                    .setDescription(
                        `\n ⠀⠀⠀⠀⠀ ⬇️ ⠀⠀⠀⠀ ⬇️ ⠀⠀⠀⠀ ⬇️  ⠀⠀⠀⠀ ⬇️ ⠀⠀⠀⠀ ⬇️ ⠀⠀⠀⠀ `
                    )
                    .setColor("#C28F2C");

                const embed = new EmbedBuilder()
                    .setTitle(`${res?.currentGames[0]?.title}`)
                    .setDescription(
                        `${
                            res?.currentGames[0]?.description
                        }\n\nhttps://store.epicgames.com/es-ES/p/${
                            res.currentGames[0].urlSlug.includes("-")
                                ? res?.currentGames[0]?.urlSlug
                                : res?.currentGames[0]?.offerMappings[0]
                                      ?.pageSlug
                        }`
                    )
                    .setThumbnail(
                        "https://peralstudio.com/images/epic-games.png"
                    )
                    .setImage(res?.currentGames[0]?.keyImages[0]?.url)
                    .addFields(
                        {
                            name: "Precio Normal",
                            value: `${formatPrice(
                                res?.currentGames[0]?.price?.totalPrice
                                    ?.originalPrice
                            )}€`,
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
                    .setTitle(`${res?.currentGames[1]?.title}`)
                    .setDescription(
                        `${
                            res?.currentGames[1]?.description
                        }\n\nhttps://store.epicgames.com/es-ES/p/${
                            res.currentGames[1]?.urlSlug.includes("-")
                                ? res?.currentGames[1]?.urlSlug
                                : res?.currentGames[1]?.offerMappings[0]
                                      ?.pageSlug
                        }`
                    )
                    .setThumbnail(
                        "https://peralstudio.com/images/epic-games.png"
                    )
                    .setImage(res?.currentGames[1]?.keyImages[0]?.url)
                    .addFields(
                        {
                            name: "Precio Normal",
                            value: `${formatPrice(
                                res?.currentGames[1]?.price?.totalPrice
                                    ?.originalPrice
                            )}€`,
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

                //JUEGOS GRATIS ¡SEMANA QUE VIENE!
                const embedFree2 = new EmbedBuilder()
                    .setTitle(
                        `¡ Juegos Gratis La Semana del (**${dayjs()
                            .add(7, "day")
                            .format("DD/MM/YY")}**) a (**${dayjs()
                            .add(14, "day")
                            .format("DD/MM/YY")}**) !`
                    )
                    .setDescription(
                        `\n ⠀⠀⠀⠀⠀ ⬇️ ⠀⠀⠀⠀ ⬇️ ⠀⠀⠀⠀ ⬇️  ⠀⠀⠀⠀ ⬇️ ⠀⠀⠀⠀ ⬇️ ⠀⠀⠀⠀`
                    )
                    .setColor("#C28F2C");

                const embed3 = new EmbedBuilder()
                    .setTitle(`${res?.nextGames[0]?.title}`)
                    .setDescription(
                        `${
                            res.nextGames[0].description
                        }\n\nhttps://store.epicgames.com/es-ES/p/${
                            res?.nextGames[0]?.urlSlug.includes("-")
                                ? res?.nextGames[0]?.urlSlug
                                : res?.nextGames[0]?.offerMappings[0]?.pageSlug
                        }`
                    )
                    .setThumbnail(
                        "https://peralstudio.com/images/epic-games.png"
                    )
                    .setImage(res?.nextGames[0]?.keyImages[0]?.url)
                    .addFields(
                        {
                            name: "Precio Normal",
                            value: `${formatPrice(
                                res?.nextGames[0].price?.totalPrice
                                    ?.originalPrice
                            )}€`,
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

                const embed4 = new EmbedBuilder()
                    .setTitle(`${res?.nextGames[1]?.title}`)
                    .setDescription(
                        `${
                            res?.nextGames[1]?.description
                        }\n\nhttps://store.epicgames.com/es-ES/p/${
                            res?.nextGames[1]?.urlSlug.includes("-")
                                ? res?.nextGames[1]?.urlSlug
                                : res?.nextGames[1]?.offerMappings[0]?.pageSlug
                        }`
                    )
                    .setThumbnail(
                        "https://peralstudio.com/images/epic-games.png"
                    )
                    .setImage(res?.nextGames[1]?.keyImages[0]?.url)
                    .addFields(
                        {
                            name: "Precio Normal",
                            value: `${formatPrice(
                                res?.nextGames[1]?.price?.totalPrice
                                    ?.originalPrice
                            )}€`,
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

                const embeds = [];
                res.currentGames[0] && (await embeds.push(embedFree, embed));
                res.currentGames[1] && (await embeds.push(embed2));
                res.nextGames[0] && (await embeds.push(embedFree2, embed3));
                res.nextGames[2] && (await embeds.push(embed4));

                await client?.channels.cache.get("1018578696627568701").send({
                    embeds,
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    setTimeout(epicGamesFree, 21600000); //43200000 12Hours //21600000 6Hours
};

export default epicGamesFree;
