const fetch = require("node-fetch");
const logger = require("../app/custom_logger");

module.exports.indexLink = async (APIkey, body) => {
    await fetch(
        `https://ssl.bing.com/webmaster/api.svc/json/SubmitUrl?apikey=${APIkey}`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json; charset=utf-8" },
            body: JSON.stringify(body),
        }
    )
        .then((res) => {
            if (res.status === 200) {
                logger.info(`URL indexed successfully.
                    url: ${body.url}
                    status: ${res.status}
                    statusText: ${res.statusText}`);
            } else {
                logger.info(`Failed to index URL.
                    url: ${body.url}
                    status: ${res.status}
                    statusText: ${res.statusText}`);
            }
            console.log(res);
        })
        .catch((err) => logger.error(err));

    return;
};
