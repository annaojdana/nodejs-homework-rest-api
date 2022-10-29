const { normalize, resolve } = require("path");

const safeJoin = (base, target) => {
  const targetPath = "." + normalize("/" + target);
  return resolve(base, targetPath);
};

module.exports = {
  safeJoin
};