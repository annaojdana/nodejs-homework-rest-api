const { writeFile, readFile } = require("fs").promises;

const readJsonFile = async (filePath) => {
  try {
    const file = await readFile(filePath, "utf-8");
    return JSON.parse(file);
  } catch (error) {
    console.log(error);
  }
};

const writeJsonFile = async (filePath, data) => {
  try {
    const jsonData = JSON.stringify(data, null, 2);
    await writeFile(filePath, jsonData);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  readJsonFile,
  writeJsonFile,
};
