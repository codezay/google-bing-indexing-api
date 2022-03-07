const googleApi = require("../models/google");

module.exports.indexLinks = async (accessToken, links) => {
    for (const link of links) {
        const body = { url: link.URL, type: "URL_UPDATED" };
        await googleApi.indexLink(link, body, accessToken);
    }

    const message = `All Urls sent to the APi.
                    Please check if they were Indexed.`;

    return message;
};
