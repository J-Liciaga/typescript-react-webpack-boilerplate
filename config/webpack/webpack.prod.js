const { merge } = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CSSMinimizerPlugin = require("css-minimizer-webpack-plugin");
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
                            modules: true,
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
    ],
    optimization: {
        minimize: true,
        minimizer: [ 
            new CSSMinimizerPlugin(),
            "..."
        ],
        runtimeChunk: {
            name: "runtime",
        },
    },
    performance: {
        hints: true,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000,
    },
});
