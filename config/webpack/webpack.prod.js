const { merge } = require("webpack-merge");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CSSMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');
const paths = require("./paths");
const common = require("./webpack.common");

module.exports = merge(common, {
    mode: "production",
    devtool: false,
    output: {
        path: paths.build,
        publicPath: "/",
        filename: "js/[name].[contentHash].bundle.js",
    },
    module: {
        rules: [
            {
                test: /\.(scss|css)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: false,
                            importLoaders: 2,
                        },
                    },
                    "postcss-loader",
                    "sass-loader",
                ],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "styles/[name].[contentHash].css",
            chunkFilename: "[id].css",
        }),
        new webpack.ids.DeterministicModuleIdsPlugin({
            maxLength: 5,
          }),
    ],
    optimization: {
        minimize: true,
        flagIncludedChunks: true,
        minimizer: [ 
            new TerserPlugin({
                parallel: true,
                // terserOptions: {
                //     https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
                // }
            }),
            new CSSMinimizerPlugin(),
            "..."
        ],
        runtimeChunk: {
            name: (entrypoint) => `runtime~${entrypoint.name}`,
        },
        moduleIds: "deterministic",
        splitChunks: {
            cacheGroups: {
                /**
                 * Code split vendors means that we split up the bundle into two: 
                 * one bundle contains the code you write, and the other contains
                 * all your dependencies. The reasoning behind this is that the 
                 * code in the dependencies don't change as often as the code you 
                 * write. That makes it possible to cache the dependencies longer 
                 * than if everything were in one bundle.
                 */
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendors",
                    chunks: "all",
                }
            }
        }
    },
    performance: {
        hints: "warning",
        maxEntrypointSize: 512000,
        maxAssetSize: 512000,
    },
});
