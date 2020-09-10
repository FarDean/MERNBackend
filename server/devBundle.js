import webpack from 'webpack'
import webpackMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpackConfig from './../webpack.config.client'
import config from './../config/config'

function compile(app) {
    if(config.env  === "development"){
        const compiler = webpack(webpackConfig)
        const middleware = webpackMiddleware(compiler,{
            publicPath:webpackConfig.output.publicPath
        })
        app.use(middleware)
        app.use(webpackHotMiddleware(compiler))
    }
}

export default {
    compile
}