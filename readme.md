## Steps to run the app.

If the app is running for the first time in your local machine, you need to install the npm modules that are
needed for this app.

If you have installed ndoejs in your machine then open the current project directory in your terminal and
type this command "npm install", then press enter. It will install all the necessary packages for the current project.
Once it's finished follow the below steps.
You only need to run the above command once in your local machine.

## google
Steps to run google indexing api.
1. Place the dowloaded json file from google and place it in 'credentials/' directory.
2. Rename it to google.json
3. put all the urls you want to index in an excel file and place it in 'excel-files/google/' directory.
4. Rename the excel file to 'google.xlsx'.
5. google indexing Api has a daily limit of 200 requests so make sure the urls in the file does not exceed that limit.
6. In the excel file make sure the urls are in a coloumn named 'URL'.
7. If all the above steps are completed and correct open the terminal in the current project directory
and type "npm run google" and press enter to run the google indexing api.

## bing
Steps to run bing indexing api.
1. Place the api key in a file named 'bing.json' and place it in the 'credentials/' directory.
2. Place the registered site url in a file named 'registeredURL.json' and place it in the 'credentials/' directory.
3. Put all the urls you want to index in an excel file and place it in 'excel-files/bing/' directory.
4. Rename the excel file to 'bing.xlsx'.
5. The daily limit of the requests that can be sent can ge found in Bing Webmaster tools, so the number urls in the excel file should not exceed that limit.
6. In the excel file make sure the urls are in a coloumn named 'URL'.
7. If all the above steps are completed and correct open the terminal in the current project directory
and type "npm run bing" and press enter to run the bing indexing api.