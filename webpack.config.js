const path = require('path');
const { argv } = require('yargs');
const webpack = require('webpack');
const isDevelopment = argv.mode === 'development';

const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const autoprefixer = require('autoprefixer');
const postcssPresetEnv = require('postcss-preset-env');
const postcssImport = require('postcss-import');
const cssNano = require('cssnano');
const { DEV_PORT } = require('./src/etc/config');

const publicPath = `http://localhost:${DEV_PORT}/`;
const cssName = 'styles.css';
const jsName = 'bundle.js';
const plugins = [
  new MiniCssExtractPlugin({
    filename: cssName
  }),
  new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery',
    'window.jQuery': 'jquery'
  })
];

if (!isDevelopment) {
  plugins.push(
    new CleanWebpackPlugin([ 'public/assets/' ], {
      root: __dirname,
      verbose: true,
      dry: false
    })
  );
}

const config = {
  entry: ['babel-polyfill', './src/client/index.js'],
  resolve: {
    extensions: ['.js', '.jsx']
  },
  plugins,
  output: {
    path: path.join(__dirname, '/public/assets/'),
    filename: jsName,
    publicPath
  },
  devServer: {
    headers: { 'Access-Control-Allow-Origin': '*' },
    watchContentBase: true,
    overlay: true,
    port: DEV_PORT
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              sourceMap: true,
              convertToAbsoluteUrls: true
            }
          },
          MiniCssExtractPlugin.loader,

          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              importLoaders: 1
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [
                !isDevelopment ? postcssImport : () => {},
                !isDevelopment ? cssNano : () => {},
                autoprefixer({
                  browsers: [ 'last 2 versions' ]
                }),
                postcssPresetEnv({
                  stage: 3,
                  browsers: ['last 5 versions', '> 5%'],
                  features: {
                    'custom-media-queries': true
                  }
                })
              ]
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              sourceMap: true,
              convertToAbsoluteUrls: true
            }
          },
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              importLoaders: 1
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [
                !isDevelopment ? postcssImport : () => {},
                !isDevelopment ? cssNano : () => {},
                autoprefixer({
                  browsers: [ 'last 2 versions' ]
                }),
                postcssPresetEnv({
                  stage: 3,
                  browsers: ['last 5 versions', '> 5%'],
                  features: {
                    'custom-media-queries': true
                  }
                })
              ]
            }
          },
          'sass-loader'
        ]
      },
      {
        test: /\.gif$/,
        loader: 'url-loader?limit=10000&mimetype=image/gif'
      },
      {
        test: /\.jpg$/,
        loader: 'url-loader?limit=10000&mimetype=image/jpg'
      },
      {
        test: /\.png$/,
        loader: 'url-loader?limit=10000&mimetype=image/png'
      },
      {
        test: /\.svg/,
        loader: 'url-loader?limit=26000&mimetype=image/svg+xml'
      },
      {
        test: /\.(woff|woff2|ttf|eot)/,
        loader: 'url-loader?limit=1'
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          cacheDirectory: true,
          presets: ['react', 'es2015']
        }
      }
    ]
  },
  performance: {
    hints: false
  },
  devtool: isDevelopment ? 'source-map' : false
};

module.exports = config;
