/* eslint-disable import/no-extraneous-dependencies */
import { DefinePlugin } from 'webpack'
import Config from 'webpack-config'
import Path from 'path'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import CleanWebpackPlugin from 'clean-webpack-plugin'
import Autoprefixer from 'autoprefixer'

const appPath = Path.resolve(__dirname, 'src')
const antd = Path.resolve(__dirname, 'node_modules/antd')

const extractAPP = new ExtractTextPlugin('css/app.css');
const extractANTD = new ExtractTextPlugin('css/antd.css');

export default new Config().extend('webpack.base.babel.js').merge({

  entry: appPath,

  output: {
    filename: 'js/app.js',
    path: Path.resolve(__dirname, 'build'),
    publicPath: '/',
  },

  module: {
    rules: [
      {
        test: /\.less$/,
        include: appPath,
        use: extractAPP.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                camelCase: true,
                localIdentName: '[folder]_[local]-[hash:base64:5]',
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => [Autoprefixer],
              },
            },
            {
              loader: 'less-loader',
            },
          ],
          publicPath: '/build',
        }),
      },
      {
        test: /\.less$/,
        include: antd,
        use: extractANTD.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'less-loader'],
          publicPath: '/build',
        }),
      },
    ],
  },

  plugins: [
    new DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),

    extractAPP,
    extractANTD,

    new CleanWebpackPlugin(['build'], {
      root: Path.resolve(__dirname),
      verbose: true,
      dry: false,
    }),
  ],
});
