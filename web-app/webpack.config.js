const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const path = require('path')

module.exports = () => {
  const dotenv = require('dotenv').config({path: path.resolve(__dirname, 'src/.env')})
  console.log('looking: ', path.resolve(__dirname, './src/.env'), 'parsed: ', dotenv)

  new webpack.DefinePlugin({
    "process.env": dotenv.parsed
  })

  console.log('path: ', process.env.PRODUCTION_PATH, '\nenvSetProduction: ', process.env.NODE_ENV === 'production')

  return {
    mode: process.env.NODE_ENV,
    entry: path.resolve(__dirname, 'src/app.js'),
    output: {
      filename: 'bundle.js',
      chunkFilename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
      publicPath: process.env.NODE_ENV === 'production' ? process.env.PRODUCTION_PATH : '/',
    },
    watch: process.env.NODE_ENV === 'development',
    devServer: {
      contentBase: path.join(__dirname, 'dist'),
      compress: true,
      port: 5000,
    },
    devtool: process.env.NODE_ENV === 'development'
      ? 'inline-source-map' : 'source-map',
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
                  if (process.env.NODE_ENV === 'development') {
                    return '[path][name].[ext]';
                  }
                  return '[hash].[ext]';
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
        components: 'src/components',
        controllers: 'src/controllers',
        atoms: 'src/components/atoms',
        molecules: 'src/components/molecules',
      }
    },
    plugins: [
      new HtmlWebpackPlugin({
        inject: false,
        template: 'src/index.html',
        appMountId: 'app',
      }),
      ...(process.env.NODE_ENV === 'production'
        ? [
          new CleanWebpackPlugin(),
        ] : []
      ),
      new webpack.DefinePlugin({
        "process.env": dotenv.parsed
      }),
    ],
    ...(process.env.NODE_ENV === 'production'
      ? {
          optimization: {
            minimizer: [process.env.NODE_ENV === 'production'
              ? new UglifyJsPlugin({
                uglifyOptions: {
                  mangle: true,
                },
              }) : null
            ],
          },
        } : {}
    ),
  }
}
