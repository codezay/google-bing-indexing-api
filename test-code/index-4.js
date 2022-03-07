const fs = require("fs");
const path = require("path");
const fetch = require("node-fetch");
const { google } = require("googleapis");
const XLSX = require("xlsx");
const Bottleneck = require("bottleneck");

const limiter = new Bottleneck({
    minTime: 500, //time in milliseconds
});

const credentials = require("../service_account.json");
const logger = require("../app/custom_logger");

const jwtClient = new google.auth.JWT(
    credentials.client_email,
    null,
    credentials.private_key,
    ["https://www.googleapis.com/auth/indexing"],
    null
);

const excelFilePath = path.join(
    __dirname,
    "/excel-file",
    "upcoming matches.xlsx"
);
const xlFile = XLSX.readFile(excelFilePath);
const workBook = xlFile.SheetNames;

const links = [];

for (let i = 0; i < workBook.length; i++) {
    const tempData = XLSX.utils.sheet_to_json(
        xlFile.Sheets[xlFile.SheetNames[i]]
    );

    for (const key in tempData) {
        if (tempData.hasOwnProperty.call(tempData, key)) {
            const element = tempData[key];
            links.push(element);
        }
    }
}

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
        const body = { url: link.URL, type: "URL_UPDATED" };

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
                        url: ${link.URL}
                        status: ${res.status}
                        statusText: ${res.statusText}`);
                } else {
                    logger.error(`failed to index url.
                        url: ${link.URL}
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

// indexURLs();
limiter.schedule(() => indexURLs());
