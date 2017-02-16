import gulp from './glconf';
import browserSync from 'browser-sync';
import bundler from './webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import path from 'path';

const slicePath = __dirname.slice(0, -6);

export default gulp.task('serve', function() {
  browserSync.init({
    server: 'public'
  });

  browserSync.watch('public/**/*.*').on('change', browserSync.reload);
  /*browserSync({
    server: {
      baseDir: path.resolve(slicePath, './public'),
      middleware: [
        webpackDevMiddleware(bundler, {
          publicPath: '/js',
          stats: {
            colors: true
          }
        }),
        webpackHotMiddleware(bundler)
      ]
    },*/

    //files: ['public/**/*.html', 'public/**/*.css' ]

 //});

});
