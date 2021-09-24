"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../../utils");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var postcssNormalize = require('postcss-normalize');
var ProgressPlugin = require('webpack').ProgressPlugin;
exports.default = (function (_a) {
    var _b = _a === void 0 ? { mode: 'production', entry: (0, utils_1.getCwdPath)('src/index.tsx'), output: { path: (0, utils_1.getCwdPath)('dist'), filename: 'build.js' }, template: (0, utils_1.getCwdPath)('tpl/index.html') } : _a, mode = _b.mode, entry = _b.entry, output = _b.output, template = _b.template;
    console.log(mode, entry, output, template);
    return {
        mode: mode,
        entry: entry,
        target: 'web',
        output: output,
        module: {
            rules: [{
                    test: /\.(js|jsx|ts|tsx)$/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                '@babel/preset-env'
                                // getCwdPath('@babel/preset-env'),
                                // [
                                //     getCwdPath('@babel/preset-react'),
                                //     {
                                //         runtime: "automatic"
                                //     }
                                // ]
                            ]
                        }
                    },
                    exclude: [
                        (0, utils_1.getCwdPath)('node_modules') // 由于 node_modules 都是编译过的文件，这里做过滤处理
                    ]
                },
                {
                    test: /\.css$/,
                    use: [
                        'style-loader',
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 1
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                postcssOptions: {
                                    plugins: [
                                        [
                                            'postcss-preset-env',
                                            {
                                                ident: 'postcss'
                                            }
                                        ]
                                    ]
                                }
                            }
                        }
                    ]
                },
                {
                    test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
                    type: 'asset/inline'
                },
                {
                    test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        name: 'static/media/[name].[hash:8].[ext]'
                    }
                }
            ]
        },
        plugins: [
            new ProgressPlugin(),
            new HtmlWebpackPlugin({
                template: template,
                filename: 'index.html'
            })
        ],
        // resolveLoader: {
        //     modules: [path.resolve(__dirname, 'node_modules')]
        // },
        resolve: {
            extensions: [
                '',
                '.js',
                '.ts',
                '.tsx',
                '.json',
                '.sass'
            ],
            //   modules: [path.resolve(__dirname, 'node_modules')]
        }
    };
});
