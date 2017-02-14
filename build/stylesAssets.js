import gulp from './glconf';

export default gulp.task('stylesAssets', function() {
  return gulp.src('frontend/styles/**/*.{svg,png}', {since: gulp.lastRun('stylesAssets')})
      .pipe(gulp.dest('public/styles'));
});
