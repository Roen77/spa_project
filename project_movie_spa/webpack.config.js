// path 모듈 불러오기
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// 플러그인을 불러온다
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const dotenv = require("dotenv");
const webpack = require("webpack");
dotenv.config();
module.exports = {
  entry: "./src/index.js",
  output: {
    // 최종 번들링된 자바스크립트
    filename: "main.js",
    // dist를 배포용 폴더로 사용
    path: path.resolve(__dirname, "dist"),
  },
  // 여기에 설정
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html", // index.html을 기본 템플릿으로 반영할 수 있도록 설정
    }),
    // 플러그인 추가
    new MiniCssExtractPlugin({
      filename: "main.css",
    }),
    new webpack.DefinePlugin({
      API_KEY: JSON.stringify(process.env.API_KEY),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        // 다시 설정한다.
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      // file-loader 세팅
      {
        test: /\.(png|jpe?g|gif|svg|webp)$/i,
        use: ["file-loader"],
      },
    ],
  },
  devServer: {
    // 개발 서버가 dist 폴더를 제공할 수 있도록 설정
    static: {
      directory: path.resolve(__dirname, "dist"),
    },
    port: 8080,
    historyApiFallback: true,
  },
};
