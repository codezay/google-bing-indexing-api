const fs = require("fs");
const path = require("path");
const { google } = require("googleapis");
const Bottleneck = require("bottleneck");

const logger = require("./app/custom_logger");

const limiter = new Bottleneck({
    minTime: 500, //time in milliseconds
});

// credentials
const googleCredentials = require("./credentials/google.json");
const bingCredentials = require("./credentials/bing.json");
const registeredURL = require("./credentials/registeredURL.json");

// controllers
const FileController = require("./controllers/FileController");
const GoogleController = require("./controllers/GoogleController");
const BingController = require("./controllers/BingController");

const jwtClient = new google.auth.JWT(
    googleCredentials.client_email,
    null,
    googleCredentials.private_key,
    ["https://www.googleapis.com/auth/indexing"],
    null
);

const excelFilePathForGoogle = path.join(
    __dirname,
    "/excel-files/google",
    "google.xlsx"
);

const excelFilePathForBing = path.join(
    __dirname,
    "/excel-files/bing",
    "bing.xlsx"
);

// indexing links with google Api
const indexURLsWithGoogle = async () => {
    logger.info("Running Google Api.");
    // authenticating the app
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
    // access token from google api
    const accessToken = tokens.access_token;
    // formated data from excell file
    const links = await FileController.formatXlFile(excelFilePathForGoogle);

    // index all the links
    await GoogleController.indexLinks(accessToken, links)
        .then((resp) => {
            logger.info("Process completed.");
            logger.info(resp);
        })
        .catch((err) => {
            logger.error("Error while indexing");
            logger.error(err);
        });

    logger.info("Finished running Google Api.");
    return;
};

// indexing links with Bing Api
const indexURLsWithBing = async () => {
    logger.info("Running Bing Api.");
    // registered website domain
    const regURL = registeredURL.siteUrl;
    // bing API Key
    const APIkey = bingCredentials.APIkey;
    // formated data from excell file
    const links = await FileController.formatXlFile(excelFilePathForBing);

    // index all the links
    await BingController.indexLinks(regURL, APIkey, links)
        .then((resp) => {
            logger.info("Process Completed");
            logger.info(resp);
        })
        .catch((err) => {
            logger.error("Error while indexing");
            logger.error(err);
        });

    logger.info("Finished running Bing Api");
    return;
};

module.exports = {
    indexURLsWithGoogle,
    indexURLsWithBing,
};
