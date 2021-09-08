// NOTE: To use this example standalone (e.g. outside of deck.gl repo)
// delete the local development overrides at the bottom of this file

const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 生成html模板
const openBrowser = require('react-dev-utils/openBrowser')
const Dotenv = require('dotenv-webpack')

const CONFIG = {
    mode: 'development',
    devtool: 'source-map',
    entry: {
        app: './src/index.js'
    },
    output: {
        filename: 'bundle.js',
        path: resolve(__dirname, 'dist'),
        publicPath: '/'
    },
    devServer: {
        host: '0.0.0.0',
        historyApiFallback: true,
        after: () => {
            openBrowser && openBrowser('http://localhost:8080');
        },
        proxy: {
            '/api': {
                target: 'http://wmts.cn.uniseas.com.cn/',
                pathRewrite: { '^/api': '' },
                changeOrigin: true,
                secure: false
            },
            '/self': {
                target: 'http://10.100.0.122/api/',
                pathRewrite: { '^/self': '' }
            }
        }
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                loader: "html-loader",
                options: {
                    attributes: {
                        list: [
                            { tag: 'link', attribute: 'href', type: 'srcset' }
                        ]
                    }
                }
            },
            //图片加载器，雷同file-loader，更适合图片，可以将较小的图片转成base64，减少http请求
            {
                test: /\.(ico)$/,
                loader: 'url-loader',
                options: {
                    limit: 50,
                    name: 'config/images/[name].[ext]'//相对于path的路径
                }
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                    },
                ],
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader'] // compiles Less to CSS
            },
            { test: /\.css$/, use: ['style-loader', 'css-loader'] },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    "style-loader",
                    // Translates CSS into CommonJS
                    "css-loader",
                    // Compiles Sass to CSS
                    {
                        loader: 'sass-loader',
                        options: {
                            implementation: require('sass'),
                            sassOptions: {
                                fiber: false,
                            },
                        },
                    },
                ],
            },
            {
                test: /\.svg$/,
                use: [
                    {
                        loader: 'svg-url-loader',
                        options: {
                            limit: 10000,
                        },
                    },
                ],
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: resolve(__dirname, 'dist/index.html'), // 生成的html文件存放的地址和文件名
            template: resolve(__dirname, 'public/index.html'), // 基于index.html模板进行生成html文件
        }),
        new Dotenv()
    ],
    resolve: {
        alias: {
            // From mapbox-gl-js README. Required for non-browserify bundlers (e.g. webpack):
            'mapbox-gl$': resolve('./node_modules/mapbox-gl/dist/mapbox-gl.js'),
            '@': resolve(__dirname, 'src/'),
            'Components': resolve(__dirname, 'src/components/'),
            'Images': resolve(__dirname, 'src/assets/images/'),
        }
    }
};

// This line enables bundling against src in this repo rather than installed module
module.exports = env => (env ? require('../../../webpack.config.local')(CONFIG)(env) : CONFIG);