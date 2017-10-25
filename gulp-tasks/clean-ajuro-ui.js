var gulp = require('gulp');
var del = require('del');

gulp.task('clean-anjuro-ui', cleanAjuroUI);

function cleanAjuroUI() {
    del(['node_modules/@profimedca/ajuro-ui', '!node_modules']);
}
