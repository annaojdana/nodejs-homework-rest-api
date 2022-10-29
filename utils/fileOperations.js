const { writeFile, readFile } = require("fs").promises;

const readJsonFile = async (filePath) => {
  const file = await readFile(filePath);
  return JSON.parse(file);
};

const writeJsonFile = async (filePath, data) => {
  const jsonData = JSON.stringify(data, null, 2);
  await writeFile(filePath, jsonData);
};

module.exports = {
  readJsonFile,
  writeJsonFile,
};
