let WriteFilePlugin = require("write-file-webpack-plugin")
const path = require("path")

var config = {
  entry: {
    path: "./client/main.js"
  },
  output: {
    path: path.join(__dirname, "../../../target/classes/static"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: "url-loader"
      }
    ]
  },
  plugins: [new WriteFilePlugin()],
  devtool: "eval-source-map"
}

module.exports = config
