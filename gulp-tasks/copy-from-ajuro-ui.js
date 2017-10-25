var gulp = require('gulp');

gulp.task('copy-from-ajuro-ui', copyFromAjuroUI);

function copyFromAjuroUI() {
    return gulp.src(['../ajuro-ui/*', '../ajuro-ui/dist/**/*'], {base: '../ajuro-ui'})
        .pipe(gulp.dest('./node_modules/@profimedica/ajuro-ui'));
}
