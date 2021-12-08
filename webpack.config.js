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
        publicPath: '/',
        clean: true
    },
    devServer: {
        static: [
            {
                directory: resolve(__dirname, 'src/assets'),
                publicPath: '/assets'
            },
            {
                directory: resolve(__dirname, 'public'),
                publicPath: '/public'
            },
        ],
        host: '0.0.0.0',
        historyApiFallback: true,
        onAfterSetupMiddleware: () => {
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
                target: `http://10.100.0.122/api/`,
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
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                type: 'asset/resource',
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
            title: 'Development',
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

module.exports = CONFIG
