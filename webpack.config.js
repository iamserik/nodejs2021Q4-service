const path = require("path");

module.exports = {
    mode: "production",
    target: "node",
    devtool: "inline-source-map",
    entry: "./src/server.ts",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, 'dist'),
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.[tj]s$/,
                use: "ts-loader",
                include: [path.resolve(__dirname, "src")]
            }
        ]
    }
}
