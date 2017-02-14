import gulp from './glconf';
import del from 'del';

export default gulp.task('clean', function() {
  return del(['public', 'manifest']);
});
