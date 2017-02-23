import gulp from './glconf';
import browserSync from 'browser-sync';
import bundler from './webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import path from 'path';

const slicePath = __dirname.slice(0, -6);

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

let arr = [];

isDevelopment ? arr.push(webpackDevMiddleware(bundler,
  {
    publicPath: '/js/', stats: { colors: true }
  }), webpackHotMiddleware(bundler))
: null;


export default gulp.task('serve', function() {

  browserSync({
    server: {
      baseDir: path.resolve(slicePath, './docs'),
      middleware: [ ...arr ]
    },

     files: ['docs/**/*.html', 'docs/**/*.css' ]

   });

});
