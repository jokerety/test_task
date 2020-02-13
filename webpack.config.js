const path = require('path');
const webpack = require('webpack');

const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ImageMinPlugin = require('imagemin-webpack-plugin').default;
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
    context: path.resolve(__dirname, 'src'),

    entry: {
        app: ['./index.ts'],
    },

    output: {
        filename: 'js/[name].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '../',
    },

    resolve: {
        extensions: ['.ts', '.js', '.json', '.css', '.scss'],
    },

    devServer: {
        index: 'index.html',
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        hot: true,
        port: 9000,
        writeToDisk: true,
        open: 'chrome',
    },

    devtool: isProduction ? '' : 'inline-source-map',

    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-modules-typescript-loader',
                    },
                    {
                        loader: 'css-loader',
                        options: { sourceMap: true, modules: true },
                    },
                    {
                        loader: 'sass-loader',
                        options: { sourceMap: true },
                    },
                ],
            },
            {
                test: /\.svg$/,
                loader: 'svg-url-loader',
            },

            { test: /\.ts$/, loader: 'babel-loader' },
            { test: /\.ts$/, loader: 'ts-loader' },

            { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: './css/[name].css',
        }),

        new HtmlWebpackPlugin({
            template: '../public/index.html',
        }),

        new CopyWebpackPlugin([{ from: './app', to: 'app' }], {
            ignore: [{ glob: '*.svg' }, { glob: '*.ts' }, { glob: '*.scss' }, { glob: '*.ttf' }],
        }),
    ],
};

if (isProduction) {
    module.exports.plugins.push(
        new UglifyJSPlugin({
            sourceMap: true,
        }),
    );
    module.exports.plugins.push(
        new ImageMinPlugin({
            test: /\.(png|jpe?g|gif|svg)$/i,
        }),
    );
    module.exports.plugins.push(
        new webpack.LoaderOptionsPlugin({
            minimize: true,
        }),
    );
}
