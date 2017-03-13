const webpack = require("webpack");
const { resolve } = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const dirRoot = resolve(__dirname);
const dirSource = resolve(dirRoot, "src");
const dirOutput = resolve(dirRoot, "dist");

const libraries = [
  "@cycle/dom",
  "@cycle/http",
  "@cycle/isolate",
  "@cycle/run",
  "xstream"
];

module.exports = () => ({
  context: dirSource,
  entry: {
    client: resolve(dirSource, "index.js"),
    vendor: libraries
  },
  output: {
    path: dirOutput,
    filename: "[name].js",
    chunkFilename: "[chunkhash].js"
  },
  module: {
    rules: [
      {
        test: /\.styl$/,
        use: ExtractTextPlugin.extract({
          use: [
            { loader: "css-loader" },
            { loader: "postcss-loader" },
            { loader: "stylus-loader" }
          ]
        })
      }
    ]
  },
  resolve: {
    modules: [dirRoot, "node_modules"],
    mainFiles: ["index"],
    extensions: [".js", ".json", ".styl"]
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new ExtractTextPlugin({
      filename: "[name].css",
      allChunks: true
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ["vendor"]
    })
  ],
  devtool: "source-map"
});
