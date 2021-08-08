// Fetch data from google apps script api

require("dotenv/config");
const { get } = require("httpie");
const { writeFileSync } = require("fs");
const GAS_API_URL = process.env.GAS_API_URL;

console.log(`Processing URL ${GAS_API_URL}`);

get(GAS_API_URL)
  .then((r) => {
    const context = `const data = ${JSON.stringify(r.data)};\n\nmodule.exports = data;`;
    writeFileSync(__dirname + "/../src/data.js", context, {
      encoding: "utf8",
    });

    console.log("Done writing");
  })
  .catch(e => {
    throw new Error(e);
  });