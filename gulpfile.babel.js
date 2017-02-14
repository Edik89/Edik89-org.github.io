import gulp from './build/glconf';
import styles from './build/styles';
import clean from './build/clean';
import assets from './build/assets';
import serve from './build/serve';
import stylesAssets from './build/stylesAssets';

gulp.task('build', gulp.series('clean', gulp.parallel('stylesAssets', 'styles'), 'assets'));

gulp.task('dev',
    gulp.series(
        'build',
        gulp.parallel(
            'serve',
            function() {
              gulp.watch('frontend/**/*.scss', gulp.series('styles'));
              gulp.watch('frontend/assets/**/*.*', gulp.series('assets'));
              gulp.watch('frontend/**/*.{svg,png,jpg}', gulp.series('stylesAssets'));
            }
        )
    )
);
