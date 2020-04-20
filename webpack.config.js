module.exports = {
    entry: "./index.ts",
    output: { filename: "app.min.js" },
    resolve: {
        extensions: [".ts", ".js"],
    },
    devtool: "source-map",
    module: {
        rules: [{ test: /\.ts$/, loader: "ts-loader" }],
    },
};
