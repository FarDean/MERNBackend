const path = require('path');
const webpack = require('webpack');
const webpackNodeExternals = require('webpack-node-externals');
const CURRENT_WORKING_DIRECTORY = process.cwd()

const config = {
    name: "server",
    entry: [path.join(CURRENT_WORKING_DIRECTORY, './server/server.js')],
    target: "node",
    output: {
        path: path.join(CURRENT_WORKING_DIRECTORY , '/dist/'),
        filename: "server.generated.js",
        publicPath: '/dist/',
        libraryTarget: "commonjs2"
    },
    externals: [webpackNodeExternals()],
    module: {
        rules: [
            {
                test:  /\.js$/,
                exclude: /node_modules/,
                use: [ 'babel-loader' ]
            }
        ]
    }
}

module.exports = config;