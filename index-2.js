const fs = require("fs");
const fetch = require("node-fetch");
const { google } = require("googleapis");

var credentials = require("./service_account.json");

const jwtClient = new google.auth.JWT(
    credentials.client_email,
    null,
    credentials.private_key,
    ["https://www.googleapis.com/auth/indexing"],
    null
);

const links = fs.readFileSync("urls.txt").toString().split("\n");

const urls = links.map((link) => {
    return {
        "Content-Type": "application/http",
        "Content-ID": "",
        body:
            "POST /v3/urlNotifications:publish HTTP/1.1\n" +
            "Content-Type: application/json\n\n" +
            JSON.stringify({
                url: link,
                type: "URL_UPDATED",
            }),
    };
});

console.log(links);
// process.exitCode(1);

const indexURLs = async () => {
    // async function indexURLs() {
    await jwtClient
        .authorize()
        .then(async (res) => {
            const response = await fetch(
                "https://indexing.googleapis.com/batch",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "multipart/mixed",
                    },
                    auth: { bearer: res.access_token },
                    multipart: urls,
                }
            );
            console.log(response);
            return;
        })
        .catch((err) => {
            console.log(err);
            return;
        });
};

indexURLs();

// jwtClient.authorize(function (err, tokens) {
//     if (err) {
//         console.log(err);
//         return;
//     }
//     const urls = links.map((link) => {
//         return {
//             "Content-Type": "application/http",
//             "Content-ID": "",
//             body:
//                 "POST /v3/urlNotifications:publish HTTP/1.1\n" +
//                 "Content-Type: application/json\n\n" +
//                 JSON.stringify({
//                     url: link,
//                     type: "URL_UPDATED",
//                 }),
//         };
//     });

//     const response = fetch("https://indexing.googleapis.com/batch", {
//         method: "POST",
//         headers: {
//             "Content-Type": "multipart/mixed",
//         },
//         auth: { bearer: tokens.access_token },
//         multipart: urls,
//     });

//     // const data = response.JSON();
//     // console.log(data);
//     // console.log(JSON.stringify(response));
// });
