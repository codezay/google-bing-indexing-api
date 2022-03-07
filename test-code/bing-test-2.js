const fetch = require("node-fetch");

const bingCredentials = require("./bing.json");
const siteCredentials = require("./registeredURL.json");

const testUrl =
    "https://gameonplus.live/en-gb/football/match/norwich-vs-tottenham-2022/710935";

async function indexBing() {
    console.log(siteCredentials.siteUrl);
    console.log(bingCredentials.APIkey);
    const body = { siteUrl: siteCredentials.siteUrl, url: testUrl };
    await fetch(
        `https://ssl.bing.com/webmaster/api.svc/json/SubmitUrl?apikey=${bingCredentials.APIkey}`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json; charset=utf-8" },
            body: JSON.stringify(body),
        }
    )
        .then((res) => {
            if (res.status === 200) {
                console.log(`link: ${body.url}
                    status: ${res.status}
                    statusText: ${res.statusText}`);
            } else {
                console.log(`link: ${body.url}
                    status: ${res.status}
                    statusText: ${res.statusText}`);
            }
            // console.log(res);
        })
        .catch((err) => console.log(err));
}

indexBing();
