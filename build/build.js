import gulp, { $ } from './glconf';
import webpack from './webpack';

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

let par = !isDevelopment ?
  gulp.parallel('stylesAssets', 'styles', 'webpack') : gulp.parallel('stylesAssets', 'styles');

export default gulp.task('build', gulp.series('clean',
    gulp.parallel('stylesAssets', 'styles', par), 'assets' ));
