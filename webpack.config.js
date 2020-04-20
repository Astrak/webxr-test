module.exports = {
    entry: "./src/index.ts",
    output: { filename: "app.min.js" },
    resolve: {
        extensions: [".ts", ".js"],
    },
    mode: "development",
    devtool: "source-map",
    devServer: { publicPath: "/dist/" },
    module: {
        rules: [{ test: /\.ts$/, loader: "ts-loader" }],
    },
};
