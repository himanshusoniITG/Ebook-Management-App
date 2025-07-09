const { createRequestHandler } = require("@remix-run/vercel");
const build = require("./build/server/index.js"); 

module.exports = createRequestHandler({ build });
