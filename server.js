const { createRequestHandler } = require("@remix-run/vercel");
const build = require("./build/server"); // Not ./build

module.exports = createRequestHandler({ build });
