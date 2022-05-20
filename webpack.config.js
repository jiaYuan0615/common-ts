const path = require("path");

module.exports = {
  mode: "production",
  entry: "./build/index.js",
  output: {
    path: path.resolve("lib"),
    filename: "index.js",
    libraryTarget: "commonjs2",
  },
  module: {
    rules: [
      {
        test: /\ts?$/i,
        exclude: /(node_modules)/,
        use: "ts-loader"
      },
    ],
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, "./src"),
      lodash: path.resolve(__dirname, "./node_modules/lodash"),
      uuid: path.resolve(__dirname, "./node_modules/uuid")
    },
  },
};