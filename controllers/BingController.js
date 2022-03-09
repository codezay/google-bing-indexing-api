const bingApi = require("../models/bing");

module.exports.indexLinks = async (regURL, APIkey, links) => {
    for (const link of links) {
        const body = { siteUrl: regURL, url: link.URL };
        await bingApi.indexLink(APIkey, body);
    }

    const message = `All Urls sent to the APi.
                    Please check if they were Indexed.`;

    return message;
};
