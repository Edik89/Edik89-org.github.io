import gulp from './glconf';
import browserSync from 'browser-sync';
import bundler from './webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

export default gulp.task('serve', function() {
  browserSync({
    server: {
      baseDir: 'public',
      middleware: [
        webpackDevMiddleware(bundler, {
          publicPath: '/js/',
          stats: {
            colors: true
          },
        }),
        webpackHotMiddleware(bundler)
      ]
    },

    files: ['public/**/*.html', 'public/**/*.css' ]

 });

});
