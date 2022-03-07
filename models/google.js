const fetch = require("node-fetch");
const logger = require("../app/custom_logger");

module.exports.indexLink = async (link, body, accessToken) => {
    await fetch("https://indexing.googleapis.com/v3/urlNotifications:publish", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(body),
    })
        .then((res) => {
            if (res.status === 200) {
                logger.info(`URL indexed successfully.
                    url: ${link.URL}
                    status: ${res.status}
                    statusText: ${res.statusText}`);
            } else {
                logger.error(`Failed to index url.
                    url: ${link.URL}
                    status: ${res.status}
                    statusText: ${res.statusText}`);
            }
        })
        .catch((err) => {
            logger.error("Failed to fetch API request.");
            logger.error(err);
        });

    return;
};
