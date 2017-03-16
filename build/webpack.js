import gulp, { $ } from './glconf';
import gulplog from 'gulplog';
import notifier from 'node-notifier';
import AssetsPlugin from 'assets-webpack-plugin';


const slicePath = __dirname.slice(0, -6);

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

  let options = {
      context: path.resolve(slicePath, './frontend/js/'),
      entry:   {
        app: [
          'webpack-hot-middleware/client?http://localhost:3000/__webpack_hmr&reload=true',
          './app.jsx'
        ]
      },
      output:  {
        filename: isDevelopment ? '[name].js' : '[name]-[hash:10].js',
        path: slicePath + '/docs/js',
        publicPath: '/js/'
      },

      watch:   isDevelopment,
      devtool: isDevelopment ? 'cheap-module-source-map' : false,
      module:  {
        rules: [
          {
            test: /\.(js|jsx)$/,
            include: [
              path.resolve(slicePath, "frontend/js"),
            ],
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
          path.resolve(slicePath, './frontend/js'),
          path.resolve(slicePath, 'node_modules')
        ]
      },

      plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
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
            beautify: false,
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

export default  isDevelopment ? webpack(options)
: gulp.task('webpack', function(callback) {
    webpack(options, function(err, stats) {
      if (!err) { // no hard error
        // try to get a soft error from stats
        err = stats.toJson().errors[0];
      }

      if (err) {
        notifier.notify({
          title: 'Webpack',
          message: err
        });

        gulplog.error(err);
      } else {
        gulplog.info(stats.toString({
          colors: true
        }));
      }

      if (!options.watch && err) {
        callback(err);
      } else {
        callback();
      }

    });

  });

/*export default  gulp.task('webpack', function(callback) {

    webpack(options, function(err, stats) {
      if (!err) { // no hard error
        // try to get a soft error from stats
        err = stats.toJson().errors[0];
      }

      if (err) {
        notifier.notify({
          title: 'Webpack',
          message: err
        });

        gulplog.error(err);
      } else {
        gulplog.info(stats.toString({
          colors: true
        }));
      }

      if (!options.watch && err) {
        callback(err);
      } else {
        callback();
      }

    });

});*/
