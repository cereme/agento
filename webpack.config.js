const ChromeExtensionReloader  = require('webpack-chrome-extension-reloader');
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');

let config = {
    entry: {
        'content-script': './src/inject.js',
        background: './src/background.js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: 'babel-loader'
            }
        ]
    },
    output: {
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: 'src/index.html', to: 'index.html'}
            ]
        })
    ],
};

module.exports = (env, args) => {
    if(args.mode === "development"){
        config.watch = true;
        config.plugins.push(
            new ChromeExtensionReloader({
                port: 9039,
                reloadPage: true,
                entries: {
                    contentScript: 'content-script',
                    background: 'background'
                }
            })
        );

    }

    if(args.mode === "production"){
        //TODO: build dist for prod
    }

    return config;
}