const bingCredentials = require("../bing.json");
const siteCredentials = require("../registeredSite.json");
const pingBing = require("ping_bing"),
    apiKey = [bingCredentials.APIkey],
    siteUrl = [siteCredentials.siteUrl];

// console.log(siteCredentials.siteUrl);
// console.log(apiKey);
// console.log(siteUrl);

// process.exit();

const singleUrl = {
    apiKey: bingCredentials.APIkey,
    siteUrl: siteCredentials.siteUrl,
    url: "https://gameonplus.live/en-gb/football/match/norwich-vs-tottenham-2022/710935",
};

// console.log(singleUrl);
// process.exit();

pingBing
    .pingBing(singleUrl)
    .then((res) => {
        console.log("then block");
        console.log(res.headers);
        console.log(res);
    })
    .catch((err) => {
        console.log("error block");
        console.log(err);
    });
