module.exports = {
    entry: __dirname + '/public/js/app.js',
    output: {
        filename: __dirname + '/public/js/build/bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js/,
                loader: 'babel',
                exclude: /node_modules/
            }
        ]
    },
    devtool: 'source-map'
};