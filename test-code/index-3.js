const fs = require("fs");
const fetch = require("node-fetch");
const { google } = require("googleapis");

const credentials = require("./service_account.json");
const logger = require("./app/custom_logger");

const jwtClient = new google.auth.JWT(
    credentials.client_email,
    null,
    credentials.private_key,
    ["https://www.googleapis.com/auth/indexing"],
    null
);

const links = fs.readFileSync("../urls.txt").toString().split("\n");

const indexURLs = async () => {
    const tokens = await jwtClient
        .authorize()
        .then((res) => {
            logger.info("Authorization gained");
            return res;
        })
        .catch((err) => {
            logger.error("Authorization rejected");
            logger.error(err);
            process.exit(1);
            // return;
        });

    for (const link of links) {
        const body = { url: link, type: "URL_UPDATED" };

        await fetch(
            "https://indexing.googleapis.com/v3/urlNotifications:publish",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${tokens.access_token}`,
                },
                body: JSON.stringify(body),
            }
        )
            .then((res) => {
                if (res.status === 200) {
                    logger.info(`url indexed successfully.
                        url: ${link}
                        status: ${res.status}
                        statusText: ${res.statusText}`);
                } else {
                    logger.error(`failed to index url.
                        url: ${link}
                        status: ${res.status}
                        statusText: ${res.statusText}`);
                }
            })
            .catch((err) => {
                logger.error("failed to run fetch");
                logger.error(err);
            });
    }
};

indexURLs();
