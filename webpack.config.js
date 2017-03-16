const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const sourcePath = path.resolve(__dirname,'./frontend');
const staticsPath = path.resolve(__dirname, './docs');

module.exports = function (env) {

  const nodeEnv = env && env.prod ? 'production' : 'development';
  const isProd = nodeEnv === 'production';

  let entry = {
    index: ['babel-regenerator-runtime', './js/index'],
    modalShopCart:'./js/components/Card/ModalShopCart',
    vendor: ['react', 'react-dom', 'react-redux', 'react-router-dom', 'redux-thunk', 'react-router-redux', 'redux',
    'reactstrap']
  };

  const plugins = [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
      filename: 'js/vendor.bundle.js'
    }),
    new webpack.EnvironmentPlugin({
      NODE_ENV: nodeEnv,
    }),
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({
      template: __dirname + '/frontend/assets/index.html',
      filename: 'index.html',
      excludeChunks:['modalShopCart'],
      inject: 'body'
    })
  ];

  let AddStyle = ExtractTextPlugin.extract({
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
  });


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
      new ExtractTextPlugin({
        filename: "styles/[name].[contenthash:10].css",
        allChunks: true
      }),
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
      new CleanWebpackPlugin('docs/js', {
        root: __dirname,
        verbose: true,
        dry: false
      })
    );
  } else {
    entry = {
      index: [
        'babel-regenerator-runtime',
        'webpack-dev-server/client?http://localhost:3000',
        'webpack/hot/only-dev-server',
        'react-hot-loader/patch',
        './js/index'
      ],
      modalShopCart:'./js/components/Card/ModalShopCart',
      vendor: ['react', 'react-dom', 'react-redux', 'react-router-dom', 'redux-thunk', 'react-router-redux', 'redux', 'reactstrap']
    },
    plugins.push(
      new webpack.HotModuleReplacementPlugin()
    );
    AddStyle = [
      'style-loader',
      'css-loader',
      'sass-loader',
      {
        loader: 'sass-resources-loader',
        options: {
          resources: [
            sourcePath + '/js/components/common/style/mixin/*.scss',
          ]
        }
      }
    ];
  }

  return {

    devtool: isProd ? 'cheap-module-source-map' : 'eval',
    context: sourcePath,
    entry,
    output: {
      filename: 'js/[name].bundle.js',
      path: staticsPath,
      publicPath: '/'
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
          use: AddStyle
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
            'file-loader?name=image/[name][hash:7].[ext]',
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
