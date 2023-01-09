import axios from "axios";
import cheerio from "cherio";
import elrellano from "../Schemas/elrellanoSchema.js";
import { deleteOldMessages } from "./deleteOldMessages.js";

const elrellanoScrap = async (client) => {
    const channelID = "1061440737843105803";

    setInterval(async () => {
        deleteOldMessages(client, channelID, elrellano);

        console.log(
            `Comprobando si hay videos nuevos de 🎦 Elrellano.com ${new Date().toLocaleTimeString(
                "es-ES",
                {
                    timeZone: "Europe/Madrid",
                }
            )}`
        );
        try {
            const response = await axios.get("https://elrellano.com/videos/");
            const $ = cheerio.load(response.data);
            const videos = [];
            let data;

            // Push to videos(array) the videos non Youtube
            $(".inside-article").each(async (i, element) => {
                const title = $(element).find(".entry-header h2 > a").text();
                const summary = $(element).find(".entry-content p").text();
                const videoUrl = $(element)
                    .find(".wp-block-video video")
                    .attr("src");

                if (!videoUrl) {
                    return;
                } else {
                    videos.push({
                        title,
                        summary: summary ? summary : "",
                        url: videoUrl,
                        date: new Date().toLocaleString("es-ES", {
                            timeZone: "Europe/Madrid",
                        }),
                    });
                }
            });

            // Push to videos(array) the videos of Youtube
            $(".inside-article").each(async (i, element) => {
                const title = $(element).find(".entry-header h2 > a").text();
                const summary = $(element).find(".entry-content p").text();
                const videoUrlYT = $(element)
                    .find(".entry-content .wp-block-embed iframe")
                    .attr("src");

                if (!videoUrlYT) {
                    return;
                } else {
                    videos.push({
                        title,
                        summary: summary ? summary : "",
                        url: videoUrlYT,
                        date: new Date().toLocaleString("es-ES", {
                            timeZone: "Europe/Madrid",
                        }),
                    });
                }
            });

            videos.forEach(async (video, i) => {
                data = await elrellano.findOne({
                    title: video?.title,
                });

                if (!data) {
                    const newData = new elrellano({
                        title: video.title,
                        summary: video.summary,
                        videoUrl: video.url,
                        date: new Date().toLocaleString("es-ES", {
                            timeZone: "Europe/Madrid",
                        }),
                    });

                    await client.channels.cache
                        .get("1061440737843105803")
                        .send({
                            content:
                                "<<--------------------------------------->> \n" +
                                "`Título:` " +
                                video.title +
                                (video.summary &&
                                    "\n" + "`Descripción:`" + video.summary) +
                                "\n" +
                                "`Fecha:`" +
                                video.date +
                                "\n" +
                                video.url,
                        });

                    await newData.save();

                    console.log(
                        `¡Nuevos videos encontrados! 🎦-elrellano ${new Date().toLocaleTimeString(
                            "es-ES",
                            {
                                timeZone: "Europe/Madrid",
                            }
                        )}`
                    );
                }
            });
        } catch (error) {
            console.error(error);
        }
    }, 1800000); //2-Hours 7200000 //30-Minutes 1800000
};

export default elrellanoScrap;
