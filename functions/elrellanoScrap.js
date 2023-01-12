import axios from "axios";
import cheerio from "cherio";
import elrellano from "../Schemas/elrellanoSchema.js";
import * as dotenv from "dotenv";
import { deleteOldMsg } from "./deleteOldMsg.js";
dotenv.config();

const elrellanoScrap = async (client) => {
    const { ELRELLANO_CHANNEL_ID } = process.env;

    setInterval(async () => {
        //Delete old messages
        deleteOldMsg(client, ELRELLANO_CHANNEL_ID, elrellano);

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

            // Push to videos(array) the videos of Youtube
            $(".inside-article").each(async (i, element) => {
                const title = $(element).find(".entry-header h2 > a").text();
                const summary = $(element).find(".entry-content p").text();
                const videoUrl = $(element).find(".wp-block-video video").attr("src");
                const videoUrlYT = $(element)
                    .find(".entry-content .wp-block-embed iframe")
                    .attr("src");

                videos.push({
                    title: title ? title : "",
                    summary: summary ? summary : "",
                    url: !videoUrlYT ? videoUrl : videoUrl && videoUrlYT ? videoUrl : videoUrlYT,
                    date: new Date().toLocaleString("es-ES", {
                        timeZone: "Europe/Madrid",
                    }),
                });
            });

            videos.forEach(async (video, i) => {
                if (video.url) {
                    const data = await elrellano.findOne({
                        title: video?.title,
                        videoUrl: video?.url,
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

                        await client.channels.cache.get(ELRELLANO_CHANNEL_ID).send({
                            content:
                                "`Título:` " +
                                video.title +
                                (video.summary && "\n" + "`Descripción:`" + video.summary) +
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
                }
            });
        } catch (error) {
            console.error(error);
        }
    }, 1800000); //2-Hours 7200000 //30-Minutes 1800000
};

export default elrellanoScrap;
