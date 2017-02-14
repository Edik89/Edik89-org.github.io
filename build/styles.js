import gulp, { $ } from './glconf';
import * as combine from 'stream-combiner2';

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

export default gulp.task('styles', function() {

  return gulp.src('frontend/styles/index.scss')
    .pipe($.plumber({
      errorHandler: $.notify.onError(err => ({
        title:   'Styles',
        message: err
      }))
    }))
    .pipe($.if(isDevelopment, $.sourcemaps.init()))
    .pipe($.sass( { errLogToConsole: true, outputStyle: 'expanded' } ).on('error', $.sass.logError))
    .pipe($.if(isDevelopment, $.sourcemaps.write()))
    .pipe($.if(!isDevelopment, combine.obj($.cssnano(), $.rev())))
    .pipe(gulp.dest('public/styles'))
    .pipe($.if(!isDevelopment, combine.obj($.rev.manifest('css.json'), gulp.dest('manifest'))))

});
