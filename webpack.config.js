module.exports = {
    entry: "./main-with-styles.js",
    output: {
        path: __dirname + "/dist",
        library: ["ajuroUI"],
        libraryTarget: "umd",
        filename: "ajuro-ui.js"
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style-loader!css-loader" }
        ]
    }
};