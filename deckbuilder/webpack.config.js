module.exports = {
    entry: __dirname + '/src/index.js',
    output: {
        filename: __dirname + '/build/bundle.js'
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