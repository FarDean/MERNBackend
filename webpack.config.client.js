const path = require('path');
const webpack = require('webpack');
const CURRENT_WORKING_DIRECTORY = process.cwd()

const config = {
    name: "browser",
    mode: "development",
    devtool: 'cheap-module-source-map',
    entry: [
        'webpack-hot-middleware/client?reload=true', 
        path.join(CURRENT_WORKING_DIRECTORY, 'client/index.js')
    ],
    output: {
        path: path.resolve(CURRENT_WORKING_DIRECTORY , 'dist'),
        filename: 'bundle.js',
        publicPath: '/dist/'
    },
    module: {
        rules: [
          {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use: ['babel-loader'],
            },
            {
                test:/\.(ttf|eot|svg|gif|jpg|png)(\?[\s\S]+)?$/,
                use:'file-loader'
            }     
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ]
}

module.exports = config;