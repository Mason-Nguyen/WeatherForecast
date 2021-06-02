/* 
    It is expected and it is breaking change in Webpack 4
    For example: /img/slider-arrow-left.png can mean: 
        - Server relative URLs
        - Absolute URLs
    Try to open this in browser and you will got same problem.
    You need refactor your code, if you can't do it (vendor code), you can use resolve.alias
    https://webpack.js.org/configuration/resolve/#resolvealias
*/
const path = require('path');

module.exports = {
    "images/layers.png": path.resolve(
        __dirname,
        "./node_modules/leaflet/dist/images/layers.png"
    ),
    "images/layers-2x.png": path.resolve(
        __dirname,
        "./node_modules/leaflet/dist/images/layers-2x.png"
    ),
    "images/marker-icon.png": path.resolve(
        __dirname,
        "./node_modules/leaflet/dist/images/marker-icon.png"
    ),
    "images/marker-icon-2x.png": path.resolve(
        __dirname,
        "./node_modules/leaflet/dist/images/marker-icon-2x.png"
    ),
    "images/marker-shadow.png": path.resolve(
        __dirname,
        "./node_modules/leaflet/dist/images/marker-shadow.png"
    )
}