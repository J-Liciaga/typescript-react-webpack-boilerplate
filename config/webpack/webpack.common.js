const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const PrettierPlugin = require("prettier-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const paths = require("./paths");

module.exports = {
    entry: [
        "react-hot-loader/patch",
        `${paths.src}/index.jsx`
    ],
    output: {
        path: paths.build,
        filename: "[name].bundle.js",
        publicPath: "/",
    },
    resolve: {
        extensions: [
            ".js", 
            ".jsx",
            ".ts",
            ".tsx",
            ".json",
        ],
        alias: {
            "react-dom": "@hot-loader/react-dom",
        }
    },
    plugins: [
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: paths.public,
                    to: "assets",
                    globOptions: {
                        ignore: ["*.DS_Store"],
                    },
                    noErrorOnMissing: true,
                },
            ],
        }),
        new HtmlWebpackPlugin({
            title: "TypeScript-React-Webpack Boilerplate",
            favicon: `${paths.static}/favicon.png`,
            template: `${paths.public}/template.html`,
            filename: "index.html"
        }),
        new ESLintPlugin({
            files: [".", "src", "config"],
            formatter: "table",
        }),
        new PrettierPlugin(),
        new BundleAnalyzerPlugin({
            analyzerMode: "static",
            openAnalyzer: false,
        }),
    ],
    module: {
        rules: [
            {
                test: /\.js(x)$/,
                use: ["babel-loader"],
                exclude: /node_modules/,
            },
            {
                test: /\.ts(x)?$/,
                loader: "ts-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
                type: "asset/resource",
            },
            {
                test: /\.(woff(2)|eot|ttf|otf|svg)$/,
                type: "asset/inline",
            },
        ],
    },
};

// module.exports = (env, argv) => {
//     if (argv.hot) {
//         // Cannot use "contentHash when hot reloading is enabled."
//         config.output.filename = "[name].[hash].js";
//     };
//     return config;
// };
