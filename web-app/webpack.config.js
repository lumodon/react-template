const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const path = require('path')
const Dotenv = require('dotenv-webpack')
require('dotenv').config({
  encoding: 'utf8',
  path: path.resolve(__dirname, 'src/.env'),
  debug: true,
})

module.exports = () => {
  console.log('looking: ', path.resolve(__dirname, './src/.env'))
  const isProduction = process.env.NODE_ENV === 'production'

  console.log(
    'path: ', process.env.PRODUCTION_PATH,
    '\nenvSetProduction: ', isProduction
  )

  return {
    mode: process.env.NODE_ENV,
    entry: path.resolve(__dirname, 'src/app.js'),
    output: {
      filename: 'bundle.js',
      chunkFilename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
      publicPath: isProduction ? process.env.PRODUCTION_PATH : '/',
    },
    watch: process.env.NODE_ENV !== 'production',
    devServer: {
      contentBase: path.join(__dirname, 'dist'),
      compress: true,
      port: 5000,
      historyApiFallback: true,
    },
    devtool: isProduction ? 'source-map' : 'inline-source-map',
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
          exclude: /node_modules/,
        },
        {
          test: /\.(js|jsx)$/,
          use: 'babel-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.jpe?g$|\.mpg$|\.mp4$|\.ico$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$|\.zip$|\.wav$|\.mp3$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name(file) {
                  if (isProduction) {
                    return '[hash].[ext]'
                  }
                  return '[path][name].[ext]'
                },
              },
            },
          ],
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      extensions: ['.js', '.jsx'],
      modules: [__dirname, 'node_modules'],
      alias: {
        public: path.resolve(__dirname, 'public'),
        components: 'src/components',
        controllers: 'src/controllers',
        atoms: 'src/components/atoms',
        molecules: 'src/components/molecules',
        themes: 'src/themes',
      }
    },
    plugins: [
      new Dotenv({
        path: path.resolve(__dirname, 'src/.env'),
        safe: path.resolve(__dirname, 'src/.env.template'),
        systemvars: true, // load all the predefined 'process.env' variables
        // which will trump anything local per dotenv specs.
        silent: isProduction, // hide any errors
        defaults: false // load '.env.defaults' as the default values if empty.
      }),
      new webpack.LoaderOptionsPlugin({
        debug: !isProduction
      }),
      new HtmlWebpackPlugin({
        inject: false,
        template: 'src/index.html',
        appMountId: 'app',
      }),
      ...(isProduction
        ? [
          new CleanWebpackPlugin(),
        ] : []
      ),
    ],
    ...(isProduction
      ? {
          optimization: {
            minimize: true,
            minimizer: [new TerserPlugin({
              terserOptions: {
                mangle: true,
                keep_classnames: false,
                keep_fnames: false,
                extractComments: true,
              }
            })],
          },
        } : {}
    ),
  }
}
