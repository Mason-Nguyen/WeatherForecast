const path = require('path');
const { webpack } = require('webpack');
//const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    /* -inline-source-map: souce map will be written in bundle.js
       - source-map: souce map will be written in bundle.js.map
    */
    devtool: "source-map",
    mode: "development",
    entry: "./scripts/index.js",
    output: {
        path: path.join(__dirname, "dist", "assets"),
        filename: "bundle.js"
    },

    //watch: true, // No need using watch: true, it automatically, and configured in package.json
    watchOptions: {
        ignored: /node_modules/ // No watch file .js in node_modules
        // aggregateTimeout: 200 (ms) // - Add a delay before rebuilding once the first file changed. This allows webpack to aggregate any other changes made during this time period into one rebuild
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ["@babel/preset-react", {
                                // automatic: auto imports the functions that JSX transpiles to. 
                                // classic: does not automatic import anything.
                                "runtime": "automatic"
                            }],
                            ["@babel/preset-env", {
                                //usage: no need to import anything manually. All polyfills are added automatically based on their code usage in a file
                                //entry: Add these import entries once (!) in your app - akin to @babel/polyfill:
                                "useBuiltIns": "usage", // alternative mode: "entry"
                                "corejs": 3, // default would be 2
                                // set your own target environment here (see Browserslist)
                                "targets": "> 0.25%, not dead"
                            }]

                        ]
                    }
                }
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    "style-loader",
                    // Translates CSS into CommonJS
                    "css-loader",
                    // Compiles Sass to CSS
                    "sass-loader",
                ],
            },
        ]
    },

    //optimization: {
    //minimize: true,
    //minimize: false, // <---- disables uglify.
    //minimizer: [new UglifyJsPlugin()] //<----- if you want to customize it.
    //}
}