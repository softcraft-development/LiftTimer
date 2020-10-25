/* global module, require, __dirname */
/* eslint-disable @typescript-eslint/no-var-requires */

const MiniCssExtractPlugin = require("mini-css-extract-plugin")
var path = require("path")

module.exports = {
  devtool: "source-map",
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: false,
    port: 9000
  },
  entry: {
    index: "./src/index.tsx",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
            },
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
            },
          },
        ],
      },
    ],
  },
  performance: {
    hints: false
  },
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name].css",
      chunkFilename: "[id].css",
    }),
  ],
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
}
