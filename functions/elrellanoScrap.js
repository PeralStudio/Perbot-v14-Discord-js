import axios from "axios";
import cheerio from "cherio";
import elrellano from "../Schemas/elrellanoSchema.js";

const elrellanoScrap = async (client) => {
    setInterval(async () => {
        console.log(
            `Comprobando si hay videos nuevos de Elrellano.com ${new Date().toLocaleTimeString(
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
            let imageUrl;
            let index;

            $(".inside-article").each(async (i, element) => {
                const title = $(element).find(".entry-header h2 > a").text();
                const summary = $(element).find(".entry-content p").text();
                const videoUrl = $(element)
                    .find(".wp-block-video video")
                    .attr("src");
                imageUrl = $(element)
                    .find(".wp-block-video video")
                    .attr("poster");

                if (!videoUrl) {
                    return;
                } else {
                    videos.push({
                        title,
                        summary: summary ? summary : "",
                        url: videoUrl,
                        imageUrl,
                    });
                }
            });

            videos.forEach(async (video, i) => {
                index = i;
                data = await elrellano.findOne({
                    title: video?.title,
                });

                if (!data) {
                    const newData = new elrellano({
                        title: video.title,
                        summary: video.summary,
                        videoUrl: video.url,
                        imageUrl,
                        date: new Date().toLocaleString("es-ES", {
                            timeZone: "Europe/Madrid",
                        }),
                    });
                    // const channel = client?.channels.cache.get(
                    //     "1008006504244334722"
                    // );
                    // channel?.send(`${video.title}\n${video.url}`);

                    await client.channels.cache
                        .get("1008006504244334722")
                        .send({
                            content: `${video.title}\n${video.url}`,
                        });

                    await newData.save();

                    let textNew;
                    let textVideo;
                    let textFound;

                    if (data?.length > 1) {
                        textNew = "Nuevos";
                        textVideo = "videos";
                        textFound = "encontrados";
                    } else {
                        textNew = "Nuevo";
                        textVideo = "video";
                        textFound = "encontrado";
                    }

                    console.log(
                        `¡${textNew} ${textVideo} ${textFound}! ${new Date().toLocaleTimeString(
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
    }, 7200000);
};

export default elrellanoScrap;
