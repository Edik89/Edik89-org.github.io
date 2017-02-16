import gulp, { $ } from './glconf';
import del from 'del';

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

export default gulp.task('assets', function() {
  return gulp.src(['frontend/assets/*.html', 'frontend/js/**/*.{svg,png,jpg}'],
      {
        since: gulp.lastRun('assets')
      })
      .pipe($.if(!isDevelopment, $.revReplace({
        manifest: gulp.src('manifest/css.json', {allowEmpty: true})
      })))
      .pipe($.if(!isDevelopment, $.revReplace({
        manifest: gulp.src('manifest/webpack.json', {allowEmpty: true})
      })))
      .pipe(gulp.dest('docs'));
});
