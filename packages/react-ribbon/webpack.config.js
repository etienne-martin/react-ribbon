/* eslint-disable @typescript-eslint/no-var-requires */
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = () => {
  return {
    target: "web",
    entry: ["./src/index.ts"],
    output: {
      filename: "index.js",
      path: __dirname + "/dist",
      library: "reactCarousel",
      libraryTarget: "umd",
      globalObject: "this",
      umdNamedDefine: true,
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".json"],
    },
    module: {
      rules: [
        {
          test: /\.(ts|js)x?$/,
          exclude: [/node_modules/],
          use: [
            {
              loader: "babel-loader",
            },
          ],
        },
        {
          test: /\.scss$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
            },
            {
              loader: "css-loader",
              options: {
                importLoaders: 1,
                modules: true,
              },
            },
            {
              loader: "sass-loader",
            },
            {
              loader: "postcss-loader",
              options: {
                postcssOptions: {
                  plugins: [["postcss-preset-env"]],
                },
              },
            },
          ],
        },
      ],
    },
    externals: {
      react: "react",
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: "style.css",
      }),
      new ForkTsCheckerWebpackPlugin({
        formatter: "codeframe",
      }),
    ],
    optimization: {
      minimizer: [new CssMinimizerPlugin()],
    },
  };
};
