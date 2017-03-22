const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ChunkManifestPlugin = require("chunk-manifest-webpack-plugin");
const WebpackChunkHash = require("webpack-chunk-hash");

const sourcePath = path.resolve(__dirname,'./frontend');
const staticsPath = path.resolve(__dirname, './build');

module.exports = function (env) {

  const nodeEnv = env && env.prod ? 'production' : 'development';
  const isProd = nodeEnv === 'production';

  const plugins = [
    new webpack.optimize.CommonsChunkPlugin({
      name: ['vendor', 'manifest'],
      minChunks: Infinity
    }),
    new webpack.EnvironmentPlugin({
      NODE_ENV: nodeEnv,
    }),
    new WebpackChunkHash(),
    new ChunkManifestPlugin({
      filename: "manifest.json",
      manifestVariable: "webpackManifest"
    }),
    new HtmlWebpackPlugin({
      template: __dirname + '/frontend/assets/index.html.js',
      filename: 'index.html',
      inject: 'body'
    }),
    new ExtractTextPlugin({
      filename: isProd ? 'styles/[name].[contenthash].css' : 'styles/[name].css',
      allChunks: true,
      disable: !isProd
    }),

  ];


  if (isProd) {
    plugins.push(
      new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false
      }),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production')
        }
      }),
      new webpack.HashedModuleIdsPlugin(),
      //new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false,
          screw_ie8: true,
          conditionals: true,
          unused: true,
          comparisons: true,
          sequences: true,
          dead_code: true,
          evaluate: true,
          if_return: true,
          join_vars: true,
        },
        output: {
          comments: false,
        },
        sourceMap: false
      }),
      new CleanWebpackPlugin('build', {
        root: __dirname,
        verbose: true,
        dry: false
      })
    );

  } else {

    plugins.push(
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin()
    );
  }

  return {
    devtool: isProd ? 'cheap-module-source-map' : 'eval',
    context: sourcePath,
    entry: {
      index: isProd ? './js/index' : [
          'webpack-dev-server/client?http://localhost:3000',
          'webpack/hot/only-dev-server',
          'react-hot-loader/patch',
          './js/index'
      ],
      vendor: ['react', 'react-dom', 'react-redux', 'react-router-dom', 'redux-thunk', 'react-router-redux', 'redux',
      'reactstrap']
    },
    output: {
      path: staticsPath,
      publicPath: '/',
      filename: isProd ? 'js/[name].[chunkhash].js' : 'js/[name].js',
      chunkFilename: isProd ? 'js/[name].[chunkhash].js' : 'js/[name].js',
    },
    module: {
      rules: [
        {
          test: /\.html$/,
          exclude: /node_modules/,
          use: {
            loader: 'html-loader'
          }
        },
        {
          test: /\.scss$/,
          exclude: /node_modules/,
          use: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: [
              {
                loader: "css-loader",
              },
              {
                loader:'sass-loader',
                query: {
                  outputStyle: 'compressed'
                }
              },
              {
                loader: 'sass-resources-loader',
                options: {
                  resources: [
                    sourcePath + '/js/components/common/style/mixin/*.scss',
                  ]
                }
              }
            ]
          })
        },
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: [
            'babel-loader'
          ],
        },
        {
          test: /\.(jpg|png|gif|svg)$/i,
          use: [
           'file-loader?name=image/[name].[hash:7].[ext]',
            {
              loader: 'image-webpack-loader',
              query: {
                mozjpeg: {
                  progressive: true
                }
              },
            }
          ]
        }
      ],
    },
    resolve: {
      extensions: ['.js', '.jsx', '.scss'],
      modules: [
        path.resolve(__dirname, 'node_modules'),
        sourcePath
      ]
    },

    plugins,

    performance: isProd && {
      maxAssetSize: 100,
      maxEntrypointSize: 300
    },

    stats: {
      colors: {
        green: '\u001b[32m',
      }
    },

    devServer: {
      contentBase: staticsPath,
      hot: !isProd,
      publicPath: '/',
      port: 3000,
      historyApiFallback: true,
      compress: isProd,
      inline: false,
      stats: {
        assets: true,
        children: false,
        chunks: false,
        hash: false,
        modules: false,
        publicPath: false,
        timings: true,
        version: false,
        warnings: true,
        colors: {
          green: '\u001b[32m',
        }
      },
    }
  };

};
