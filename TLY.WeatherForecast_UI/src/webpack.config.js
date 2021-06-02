const path = require('path');
const { webpack } = require('webpack');
const alias = require("../src/alias")
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

    /*
    To fix error: Can't resolve 'images/layers.png' in C:\Source\WeatherForecast\TLY.WeatherForecast_UI\src\scss
    This error is caused when css-loader resolve Map.scss file with Leaflet.css is imported.
    In webpack 4 and css-loader, it can not resolve path in css file (in Leaflet.css). 
    So, need to define alias for those paths.
    Aliases are define separately in alias.js file, then import in to webpack.config.js
    For this issue: https://github.com/webpack-contrib/css-loader/issues/1136
    For alias definition: https://webpack.js.org/configuration/resolve/#resolvealias
    For sample config webpack for Leaflet.css : https://ganeshkokku.wordpress.com/2020/02/10/webpack-leaflet-configuration/
    */
    resolve: { alias: alias },

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
                                // Using to avoid window.React = React in index.js
                                // automatic: auto imports the functions that JSX transpiles to. 
                                // classic: does not automatic import anything.
                                "runtime": "classic"
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
            // using load images whose path in Leaflet.css is resolved by alias.
            {
                test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        //https://github.com/webpack-contrib/file-loader#publicpath
                        // publicPath: Specifies a custom public path for the target file(s).
                        outputPath: 'images', // Specify a filesystem path where the target file(s) will be placed.
                        name: '[name].[ext]' // loader file with original name and extension. If not exists, use hashcode as filename
                    }
                }
            },
            {
                test: /\.(sa|sc|c)ss$/,
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