import path from 'path'
import { getCwdPath, getDirPath } from '../../utils'

const HtmlWebpackPlugin = require('html-webpack-plugin')
const postcssNormalize = require('postcss-normalize')
const { ProgressPlugin } = require('webpack')

interface IWebpack {
  mode?: 'development' | 'production' | 'none';
  entry: any
  output: any
  template: string
}

export default ({
  mode,
  entry,
  output,
  template
}: IWebpack = { mode: 'production', entry: getCwdPath('src/index.tsx'), output: { path: getCwdPath('dist'), filename: 'build.js' }, template: getCwdPath('tpl/index.html') }) => {
    console.log(mode,
        entry,
        output,
        template)
  return {
    mode,
    entry,
    target: 'web',
    output,
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
            getCwdPath('node_modules') // 由于 node_modules 都是编译过的文件，这里做过滤处理
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
        template,
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
  }
}
