// This is the base Webpack configuration file
const path = require('path');

const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BrotliPlugin = require('brotli-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');

const mode =
    process.env.NODE_ENV === 'production' ? 'production' : 'development';

const configuration = {
    context: process.cwd(),

    mode,

    entry: ['./src/core/entry.js'],

    performance: {
        hints: false
    },

    devServer: {
        port: 3000,
        hotOnly: true,
        overlay: true,
        liveReload: false,
        historyApiFallback: {
            index: '/'
        }
    },

    output: {
        // file name pattern for entry scripts
        filename: '[name].[hash].js',

        // file name pattern for chunk scripts
        chunkFilename: '[name].[hash].js',

        path: path.resolve(__dirname, './webroot/build')
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader',
                        query: {compact: false}
                    }
                ],
                exclude: [/node_modules/, /languages/]
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    'css-loader'
                ]
            },
            {
                test: /\.(jpg|png|webp)$/,
                use: [
                    'file-loader',
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            disable: true,
                            webp: {
                                enabled: true
                            }
                        }
                    }
                ]
            },
            {
                test: /\.svg$/,
                loader: 'svg-react-loader',
                exclude: /node_modules/
            },
            ...[
                /\.woff(\?v=\d+\.\d+\.\d+)?$/,
                /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
                /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/
            ].map(font => ({
                test: font,
                include: [/fonts/],
                loader: 'file-loader'
            }))
        ]
    },
    resolve: {
        modules: ['node_modules', path.resolve(__dirname, './src')],
        alias: {
            'react-dom': '@hot-loader/react-dom'
        }
    },

    plugins: [
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: '[name].css',
            chunkFilename: '[id].css'
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(mode),
            'process.env.BABEL_ENV': JSON.stringify(mode),

            __PRODUCTION__: mode === 'production',
            __DEVELOPMENT__: mode === 'development'
        }),
        new HtmlWebPackPlugin({
            template: './src/core/html/index.html',
            filename: mode === 'production' ? '../index.html' : './index.html'
        })
    ]
};

if (mode === 'production') {
    configuration.optimization = {
        minimizer: [new UglifyJsPlugin()]
    };

    configuration.plugins.push(new CompressionPlugin(), new BrotliPlugin());
} else {
    // configuration.entry.unshift('react-hot-loader/patch');
}

if (process.env.PROFILE === '1') {
    configuration.plugins.push(new BundleAnalyzerPlugin());
}

module.exports = configuration;
