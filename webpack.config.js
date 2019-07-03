//webpack.config.js
//This file is needed to bundle React render script with React and node libraries and send it to the user browser in one bundle.js file
var path = require('path');
var webpack = require('webpack');
module.exports = {
    entry: './public/react_frontend/src/index.js',
    output: {
        path: path.join(__dirname, '/public/react_frontend/public/'),
        filename: 'bundle.js'
    },
    module: {
        rules: [{
            test: /.jsx?$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            query: {
                presets: ['@babel/preset-env', '@babel/preset-react','mobx']
            }
        }]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
}
