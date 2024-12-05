const XLSX = require("xlsx");

module.exports.formatXlFile = async (excelFilePath) => {
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

    return links;
};
