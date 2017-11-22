const gulp = require('gulp');
const del = require('del');

const editorSrcDir = "editorSrc";

gulp.task('clean:editorSrc', function () {
    return del([
        editorSrcDir
    ]);
});

gulp.task('swagger-editor', ['clean:editorSrc'], function () {
    // swagger-editor-dist doesn't resolve as the package.json main points to swagger-editor.js in the non-existent dist folder
    // Hard code location for now
//    const swaggerEditorDistDir = require.resolve('swagger-editor-dist');
    const swaggerEditorDistDir = 'node_modules/swagger-editor-dist';

    return gulp.src(swaggerEditorDistDir + "/**/*")
        .pipe(gulp.dest(editorSrcDir));
});

gulp.task('clean', ['clean:editorSrc']);

gulp.task('postinstall', ['swagger-editor'], function () {
    console.log("postinstall");
});