const fs = require("fs");
const path = require("path");
const XLSX = require("xlsx");

const excelFile = path.join(__dirname, "/excel-file", "upcoming matches.xlsx");
const xlFile = XLSX.readFile(excelFile);
const workBook = xlFile.SheetNames;

const data = [];

for (let i = 0; i < workBook.length; i++) {
    const tempData = XLSX.utils.sheet_to_json(
        xlFile.Sheets[xlFile.SheetNames[i]]
    );
    console.log(typeof tempData);
    tempData.forEach((temp) => {
        data.push(temp);
    });
}

console.log(path.basename(excelFile));
// console.log(xlFile);
// console.log(data);
for (const value of data) {
    console.log(value.URL);
}

// const links = fs.readFileSync("urls.txt").toString().split("\n");
