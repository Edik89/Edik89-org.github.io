import gulp, { $ } from './glconf';
import path from 'path';
import webpack from 'webpack';
import gulplog from 'gulplog';
import notifier from 'node-notifier';
import AssetsPlugin from 'assets-webpack-plugin';

const slicePath = __dirname.slice(0, -6);

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

  let options = {
    entry:   {
      app: [
        'webpack-hot-middleware/client?http://localhost:3000/__webpack_hmr&reload=true',
        slicePath + '/frontend/js/app.jsx'
      ]
    },
    output:  {
      path: '/public/js',
      publicPath: '/js/',
      filename: isDevelopment ? '[name].js' : '[name]-[hash:10].js'
    },
    watch:   isDevelopment,
    devtool: isDevelopment ? 'cheap-module-inline-source-map' : 'eval',
    module:  {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: [
            'babel-loader'
          ]
        }
      ]
    },

    resolve: {
      extensions: ['.js', '.jsx'],
      modules: [
        path.resolve(slicePath, 'node_modules')
      ]
    },

    plugins: [
      new webpack.NoEmitOnErrorsPlugin(), // otherwise error still gives a file
      new webpack.HotModuleReplacementPlugin()
    ]
  };

  if (!isDevelopment) {
    options.plugins.push(
        new webpack.LoaderOptionsPlugin({
          minimize: true,
          debug: false
        }),
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
        }),
        new AssetsPlugin({
          filename: 'webpack.json',
          path: slicePath + '/manifest',
          processOutput(assets) {
            for (let key in assets) {
              assets[key + '.js'] = assets[key].js.slice(options.output.publicPath.length);
              delete assets[key];
            }
            return JSON.stringify(assets);
          }
        })
    );

  }

export default  webpack(options);


